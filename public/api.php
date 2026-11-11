<?php
/**
 * api.php — Proxy seguro para APIs externas.
 *
 * Camadas de segurança implementadas:
 *  1. CORS: só aceita origins configuradas em api-config.php
 *  2. Rate Limiting: por IP (file-based ou APCu)
 *  3. HMAC Token: integridade de requisição (time-based, 60s window)
 *  4. X-Requested-With: exige header customizado (força CORS preflight)
 *  5. Honeypot: parâmetro _hp deve ser vazio; bot preenchido = bloqueio
 *  6. reCAPTCHA v3: verificação de score (opcional, via api-config.php)
 *  7. Cloudflare Turnstile: verificação de desafio (opcional)
 *  8. Input sanitization: whitelist de serviços + validação de parâmetros
 *  9. Sem SQL / sem execução de comandos: sem superfície de injeção
 */
declare(strict_types=1);

/* ══════════════════════════════════════════════════════════════════════════
 * 1. Configuração
 * ══════════════════════════════════════════════════════════════════════════ */
$_cfgFile = __DIR__ . '/api-config.php';
if (file_exists($_cfgFile)) {
    require_once $_cfgFile;
}

// Defaults (caso api-config.php não exista)
defined('API_HMAC_SECRET')         || define('API_HMAC_SECRET', '');
defined('API_HMAC_WINDOW')         || define('API_HMAC_WINDOW', 60);
defined('API_RATE_LIMIT')          || define('API_RATE_LIMIT', 30);
defined('API_RATE_WINDOW')         || define('API_RATE_WINDOW', 60);
defined('API_RECAPTCHA_SECRET')    || define('API_RECAPTCHA_SECRET', '');
defined('API_RECAPTCHA_MIN_SCORE') || define('API_RECAPTCHA_MIN_SCORE', 0.5);
defined('API_TURNSTILE_SECRET')    || define('API_TURNSTILE_SECRET', '');
defined('API_ALLOWED_ORIGINS')     || define('API_ALLOWED_ORIGINS', [
    'https://www.3wonline.com.br',
    'https://3wonline.com.br',
]);
defined('API_DEV_MODE_BYPASS') || define('API_DEV_MODE_BYPASS', false);
defined('API_DEV_ORIGINS')     || define('API_DEV_ORIGINS', []);
defined('API_DATA_DIR')        || define('API_DATA_DIR',
    sys_get_temp_dir() . DIRECTORY_SEPARATOR . '3w_api_' . substr(md5(__FILE__), 0, 10)
);

/* ══════════════════════════════════════════════════════════════════════════
 * 2. Helpers de ambiente
 * ══════════════════════════════════════════════════════════════════════════ */
function getAllowedOrigins(): array
{
    $o = (array) API_ALLOWED_ORIGINS;
    if (API_DEV_MODE_BYPASS) {
        $o = array_merge($o, (array) API_DEV_ORIGINS);
    }
    return $o;
}

function isDevEnvironment(): bool
{
    if (!API_DEV_MODE_BYPASS) return false;
    $ip = $_SERVER['REMOTE_ADDR'] ?? '';
    return $ip === '127.0.0.1' || $ip === '::1';
}

/* ══════════════════════════════════════════════════════════════════════════
 * 3. CORS
 * ══════════════════════════════════════════════════════════════════════════ */
function sendCORSHeaders(string $origin): void
{
    header("Access-Control-Allow-Origin: {$origin}");
    header('Access-Control-Allow-Methods: GET, OPTIONS');
    header('Access-Control-Allow-Headers: X-Requested-With, X-3W-Token, X-3W-CSRF, X-3W-RC, X-3W-TS');
    header('Access-Control-Max-Age: 86400');
    header('Vary: Origin');
    header('Access-Control-Allow-Credentials: false');
}

function checkCORS(): void
{
    $origin  = $_SERVER['HTTP_ORIGIN'] ?? '';
    $allowed = getAllowedOrigins();

    // Preflight (OPTIONS)
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        if ($origin && in_array($origin, $allowed, true)) {
            sendCORSHeaders($origin);
        }
        http_response_code(204);
        exit;
    }

    // Origin presente → verificar
    if ($origin) {
        if (!in_array($origin, $allowed, true)) {
            http_response_code(403);
            header('Content-Type: application/json');
            exit(json_encode(['error' => 'Origin not allowed']));
        }
        sendCORSHeaders($origin);
        return;
    }

    // Sem Origin → verificar Referer
    $referer = $_SERVER['HTTP_REFERER'] ?? '';
    if ($referer && !isDevEnvironment()) {
        $ok = false;
        foreach ($allowed as $ao) {
            if (str_starts_with($referer, $ao)) { $ok = true; break; }
        }
        if (!$ok) {
            http_response_code(403);
            header('Content-Type: application/json');
            exit(json_encode(['error' => 'Referer not allowed']));
        }
    }
}

/* ══════════════════════════════════════════════════════════════════════════
 * 4. HMAC Token
 * ══════════════════════════════════════════════════════════════════════════ */
function getHmacSecret(): string
{
    $s = (string) API_HMAC_SECRET;
    if (!$s || $s === 'CHANGE-THIS-TO-A-RANDOM-64-CHAR-HEX-STRING') {
        // Fallback derivado do servidor (funcional, menos seguro)
        // → Configure API_HMAC_SECRET em api-config.php para máxima segurança
        return hash_hmac('sha256',
            'site3w-proxy-v1-' . ($_SERVER['SERVER_NAME'] ?? 'local'),
            'fallback-' . substr(md5(__FILE__), 0, 16)
        );
    }
    return $s;
}

function generateHmacToken(): array
{
    $window = (int) (time() / (int) API_HMAC_WINDOW);
    $token  = hash_hmac('sha256', (string) $window, getHmacSecret());
    $ttl    = (int) API_HMAC_WINDOW - (time() % (int) API_HMAC_WINDOW);
    return ['token' => $token, 'ttl' => max(5, $ttl)];
}

function verifyHmacToken(string $token): bool
{
    if ($token === '') return false;
    $secret  = getHmacSecret();
    $current = (int) (time() / (int) API_HMAC_WINDOW);
    for ($i = 0; $i <= 1; $i++) {
        $expected = hash_hmac('sha256', (string) ($current - $i), $secret);
        if (hash_equals($expected, $token)) return true;
    }
    return false;
}

/* ══════════════════════════════════════════════════════════════════════════
 * 5. Rate Limiting
 * ══════════════════════════════════════════════════════════════════════════ */
function checkRateLimit(string $ip): bool
{
    $limit  = (int) API_RATE_LIMIT;
    $window = (int) API_RATE_WINDOW;
    $key    = 'rl_' . md5($ip);

    // APCu (memória compartilhada — mais rápido)
    if (function_exists('apcu_fetch')) {
        $count = (int) (apcu_fetch($key) ?: 0);
        if ($count >= $limit) return false;
        apcu_add($key, 0, $window);
        apcu_inc($key);
        return true;
    }

    // Fallback: arquivo por IP
    $dir = rtrim((string) API_DATA_DIR, DIRECTORY_SEPARATOR)
         . DIRECTORY_SEPARATOR . 'rate' . DIRECTORY_SEPARATOR;

    if (!is_dir($dir) && !@mkdir($dir, 0750, true)) {
        return true; // Não bloquear se não conseguir criar o dir
    }

    $file = $dir . md5($ip) . '.json';
    $now  = time();
    $fh   = @fopen($file, 'c+');
    if (!$fh) return true;

    flock($fh, LOCK_EX);
    $content  = (string) (stream_get_contents($fh) ?: '[]');
    $requests = json_decode($content, true) ?? [];
    $requests = array_values(
        array_filter($requests, static fn($t) => is_int($t) && $t > $now - $window)
    );
    $allowed = count($requests) < $limit;
    if ($allowed) $requests[] = $now;
    rewind($fh);
    ftruncate($fh, 0);
    fwrite($fh, (string) json_encode($requests));
    flock($fh, LOCK_UN);
    fclose($fh);

    return $allowed;
}

/* ══════════════════════════════════════════════════════════════════════════
 * 6. reCAPTCHA v3
 * ══════════════════════════════════════════════════════════════════════════ */
function verifyRecaptcha(string $token): bool
{
    if (!API_RECAPTCHA_SECRET || $token === '') return true; // Pula se não configurado

    $ch = curl_init('https://www.google.com/recaptcha/api/siteverify');
    curl_setopt_array($ch, [
        CURLOPT_POST            => true,
        CURLOPT_POSTFIELDS      => http_build_query([
            'secret'   => API_RECAPTCHA_SECRET,
            'response' => $token,
            'remoteip' => $_SERVER['REMOTE_ADDR'] ?? '',
        ]),
        CURLOPT_RETURNTRANSFER  => true,
        CURLOPT_TIMEOUT         => 5,
        CURLOPT_SSL_VERIFYPEER  => true,
    ]);
    $result = json_decode((string) (curl_exec($ch) ?: '{}'), true) ?? [];
    curl_close($ch);

    return ($result['success'] ?? false) &&
           (float) ($result['score'] ?? 0.0) >= (float) API_RECAPTCHA_MIN_SCORE;
}

/* ══════════════════════════════════════════════════════════════════════════
 * 7. Cloudflare Turnstile
 * ══════════════════════════════════════════════════════════════════════════ */
function verifyTurnstile(string $token): bool
{
    if (!API_TURNSTILE_SECRET || $token === '') return true; // Pula se não configurado

    $ch = curl_init('https://challenges.cloudflare.com/turnstile/v0/siteverify');
    curl_setopt_array($ch, [
        CURLOPT_POST            => true,
        CURLOPT_POSTFIELDS      => http_build_query([
            'secret'   => API_TURNSTILE_SECRET,
            'response' => $token,
            'remoteip' => $_SERVER['REMOTE_ADDR'] ?? '',
        ]),
        CURLOPT_RETURNTRANSFER  => true,
        CURLOPT_TIMEOUT         => 5,
        CURLOPT_SSL_VERIFYPEER  => true,
    ]);
    $result = json_decode((string) (curl_exec($ch) ?: '{}'), true) ?? [];
    curl_close($ch);

    return $result['success'] ?? false;
}

/* ══════════════════════════════════════════════════════════════════════════
 * 8. Sanitizadores de entrada
 * ══════════════════════════════════════════════════════════════════════════ */
function cleanIp(string $ip): string
{
    return preg_replace('/[^0-9a-fA-F.:]+/', '', $ip) ?? '';
}

function cleanDomain(string $d): string
{
    return preg_replace('/[^a-zA-Z0-9.\-]+/', '', strtolower($d)) ?? '';
}

function cleanDigits(string $s): string
{
    return preg_replace('/\D/', '', $s) ?? '';
}

function cleanDnsType(string $s): string
{
    static $allowed = ['A', 'AAAA', 'MX', 'NS', 'TXT', 'CNAME', 'SOA', 'PTR', 'SRV', 'CAA'];
    $s = strtoupper(preg_replace('/[^A-Za-z]/', '', $s) ?? '');
    return in_array($s, $allowed, true) ? $s : 'A';
}

/* ══════════════════════════════════════════════════════════════════════════
 * 9. Whitelist de serviços (resolve URL alvo)
 *
 *  t=1  IPv4          api4.ipify.org
 *  t=2  IPv6          api6.ipify.org
 *  t=3  GeoIP         ipwho.is
 *  t=4  GeoIP fallbk  ipapi.co
 *  t=5  DNS lookup    dns.google
 *  t=6  WHOIS/RDAP    rdap.org
 *  t=7  CEP BrasilAPI brasilapi.com.br/api/cep/v2
 *  t=8  ViaCEP        viacep.com.br
 *  t=9  CNPJ          brasilapi.com.br/api/cnpj/v1
 * ══════════════════════════════════════════════════════════════════════════ */
function resolveUrl(int $t, string $v, string $q): ?string
{
    switch ($t) {
        case 1: return 'https://api4.ipify.org?format=json';
        case 2: return 'https://api6.ipify.org?format=json';
        case 3:
            $ip = cleanIp($v);
            return $ip ? "https://ipwho.is/{$ip}" : 'https://ipwho.is/';
        case 4:
            return 'https://ipapi.co/json/';
        case 5:
            $name = urlencode(cleanDomain($v));
            if ($name === '') return null;
            return 'https://dns.google/resolve?name=' . $name . '&type=' . cleanDnsType($q);
        case 6:
            $domain = cleanDomain($v);
            return $domain !== '' ? "https://rdap.org/domain/{$domain}" : null;
        case 7:
            $cep = cleanDigits($v);
            return strlen($cep) === 8
                ? "https://brasilapi.com.br/api/cep/v2/{$cep}" : null;
        case 8:
            $cep = cleanDigits($v);
            return strlen($cep) === 8
                ? "https://viacep.com.br/ws/{$cep}/json/" : null;
        case 9:
            $cnpj = cleanDigits($v);
            return strlen($cnpj) === 14
                ? "https://brasilapi.com.br/api/cnpj/v1/{$cnpj}" : null;
        default:
            return null;
    }
}

/* ══════════════════════════════════════════════════════════════════════════
 * INÍCIO DO FLUXO DE REQUISIÇÃO
 * ══════════════════════════════════════════════════════════════════════════ */

// Cabeçalhos de segurança da resposta
header('X-Content-Type-Options: nosniff');
header('Cache-Control: no-store, no-cache, must-revalidate');
header('Pragma: no-cache');
header('X-Robots-Tag: noindex, nofollow');

// CORS (trata preflight e verifica origin)
checkCORS();

// Apenas GET após o preflight
if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    exit;
}

// ── Endpoint: gerar token HMAC ─────────────────────────────────────────────
$action = trim($_GET['action'] ?? '');
if ($action === 'token') {
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode(generateHmacToken());
    exit;
}

// ── Rate Limiting ──────────────────────────────────────────────────────────
$clientIp = $_SERVER['REMOTE_ADDR'] ?? '0.0.0.0';
if (!checkRateLimit($clientIp)) {
    http_response_code(429);
    header('Content-Type: application/json; charset=utf-8');
    header('Retry-After: ' . API_RATE_WINDOW);
    exit(json_encode([
        'error'       => 'Too many requests',
        'retry_after' => (int) API_RATE_WINDOW,
    ]));
}

// ── Verificações de segurança (desabilitadas em dev local) ─────────────────
if (!isDevEnvironment()) {

    // 1. X-Requested-With (força CORS preflight para headers customizados)
    $xrw = $_SERVER['HTTP_X_REQUESTED_WITH'] ?? '';
    if (strtolower($xrw) !== 'xmlhttprequest') {
        http_response_code(403);
        header('Content-Type: application/json; charset=utf-8');
        exit(json_encode(['error' => 'Invalid request']));
    }

    // 2. HMAC Token de integridade
    $hmacToken = $_SERVER['HTTP_X_3W_TOKEN'] ?? '';
    if (!verifyHmacToken($hmacToken)) {
        http_response_code(403);
        header('Content-Type: application/json; charset=utf-8');
        exit(json_encode(['error' => 'Invalid request token']));
    }

    // 3. Honeypot — parâmetro _hp deve estar presente e vazio
    //    (preenchido = comportamento de bot)
    if (isset($_GET['_hp']) && $_GET['_hp'] !== '') {
        // Rejeição silenciosa: retorna 200 sem dados úteis
        http_response_code(200);
        header('Content-Type: application/json; charset=utf-8');
        exit(json_encode(['proxy_blocked' => true]));
    }

    // 4. reCAPTCHA v3 (opcional — só verifica se a chave estiver configurada)
    $rcToken = $_SERVER['HTTP_X_3W_RC'] ?? '';
    if (API_RECAPTCHA_SECRET && !verifyRecaptcha($rcToken)) {
        http_response_code(403);
        header('Content-Type: application/json; charset=utf-8');
        exit(json_encode(['error' => 'Captcha verification failed']));
    }

    // 5. Cloudflare Turnstile (opcional — só verifica se configurado)
    $tsToken = $_SERVER['HTTP_X_3W_TS'] ?? '';
    if (API_TURNSTILE_SECRET && !verifyTurnstile($tsToken)) {
        http_response_code(403);
        header('Content-Type: application/json; charset=utf-8');
        exit(json_encode(['error' => 'Security verification failed']));
    }
}

// ── Roteamento para API externa ────────────────────────────────────────────
$t   = (int)    ($_GET['t'] ?? 0);
$v   = trim((string) ($_GET['v'] ?? ''));
$q   = trim((string) ($_GET['q'] ?? ''));
$url = resolveUrl($t, $v, $q);

if (!$url) {
    http_response_code(400);
    header('Content-Type: application/json; charset=utf-8');
    exit(json_encode(['error' => 'Invalid request parameters']));
}

// Cabeçalhos por tipo de serviço
$reqHeaders = ['User-Agent: Mozilla/5.0 (compatible; 3W-Proxy/2.0)'];
$reqHeaders[] = ($t === 6)
    ? 'Accept: application/rdap+json, application/json'
    : 'Accept: application/json';

// Executar via cURL
$ch = curl_init();
curl_setopt_array($ch, [
    CURLOPT_URL             => $url,
    CURLOPT_RETURNTRANSFER  => true,
    CURLOPT_TIMEOUT         => 15,
    CURLOPT_CONNECTTIMEOUT  => 8,
    CURLOPT_FOLLOWLOCATION  => true,
    CURLOPT_MAXREDIRS       => 3,
    CURLOPT_HTTPHEADER      => $reqHeaders,
    CURLOPT_SSL_VERIFYPEER  => true,
    CURLOPT_SSL_VERIFYHOST  => 2,
    CURLOPT_HEADER          => false,
    CURLOPT_ENCODING        => '', // aceita gzip/deflate automaticamente
]);

$body    = curl_exec($ch);
$status  = (int) curl_getinfo($ch, CURLINFO_HTTP_CODE);
$ct      = (string) curl_getinfo($ch, CURLINFO_CONTENT_TYPE);
$curlErr = curl_error($ch);
curl_close($ch);

if ($body === false || $curlErr) {
    http_response_code(502);
    header('Content-Type: application/json; charset=utf-8');
    exit(json_encode(['error' => 'Upstream unreachable']));
}

// Resposta
http_response_code($status);
$ctBase = $ct ? explode(';', $ct)[0] : 'application/json';
header("Content-Type: {$ctBase}; charset=utf-8");
echo $body;
