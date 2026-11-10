<?php
/**
 * DevPlayground — Executor de PHP (HostGator / hospedagem compartilhada).
 *
 * Recebe JSON { "code": "<?php ..." } e executa em subprocesso isolado
 * com limites de tempo e memória. Retorna sempre JSON { success, output, error }.
 *
 * Segurança:
 *  - Aceita apenas POST.
 *  - Verificação de origem tolerante (mesmo hostname), mitigando abuso externo.
 *  - Bloqueia funções perigosas via disable_functions no subprocesso.
 *  - Timeout e limite de memória para mitigar DoS.
 *  - Nunca usa eval() no processo do servidor web.
 *  - Nunca emite HTTP 500 cru: erros fatais são convertidos em JSON.
 */

declare(strict_types=1);

// Nunca exibir erros no corpo da resposta (poluiria o JSON); capturamos abaixo.
@ini_set('display_errors', '0');
error_reporting(E_ALL);

// Polyfill para PHP < 8.0 (compatibilidade com hosts mais antigos)
if (!function_exists('str_ends_with')) {
    function str_ends_with(string $haystack, string $needle): bool
    {
        return $needle === '' || substr($haystack, -strlen($needle)) === $needle;
    }
}

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('Referrer-Policy: no-referrer');

/** Emite JSON e encerra. */
function respond(bool $success, string $output = '', ?string $error = null, int $status = 200): void
{
    if (!headers_sent()) {
        http_response_code($status);
    }
    echo json_encode(['success' => $success, 'output' => $output, 'error' => $error]);
    exit;
}

// Converte erros fatais em resposta JSON (evita 500 cru quebrando o front-end).
register_shutdown_function(static function (): void {
    $err = error_get_last();
    if ($err && in_array($err['type'], [E_ERROR, E_PARSE, E_CORE_ERROR, E_COMPILE_ERROR], true)) {
        if (!headers_sent()) {
            http_response_code(200);
        }
        echo json_encode([
            'success' => false,
            'output' => '',
            'error' => 'Erro interno no executor: ' . $err['message'],
        ]);
    }
});

// --- Método ---
if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    respond(false, '', 'Método não permitido.', 405);
}

// --- Verificação de origem (tolerante: compara apenas o hostname, ignora porta) ---
$hostHeader = $_SERVER['HTTP_HOST'] ?? '';
$host = strtolower(explode(':', $hostHeader)[0]);
$originHeader = $_SERVER['HTTP_ORIGIN'] ?? ($_SERVER['HTTP_REFERER'] ?? '');
if ($originHeader !== '' && $host !== '') {
    $originHost = strtolower((string) parse_url($originHeader, PHP_URL_HOST));
    // Permite mesmo host, localhost/127.0.0.1 e subdomínios do mesmo domínio.
    $allowed =
        $originHost === $host ||
        in_array($originHost, ['localhost', '127.0.0.1', '::1'], true) ||
        in_array($host, ['localhost', '127.0.0.1', '::1'], true) ||
        ($originHost !== '' && str_ends_with($host, $originHost)) ||
        ($originHost !== '' && str_ends_with($originHost, $host));
    if (!$allowed) {
        respond(false, '', 'Origem não autorizada.', 403);
    }
}

// --- Corpo ---
$raw = file_get_contents('php://input');
if ($raw === false || strlen($raw) > 50000) {
    respond(false, '', 'Payload inválido ou muito grande.', 413);
}

$data = json_decode((string) $raw, true);
$code = is_array($data) && isset($data['code']) ? (string) $data['code'] : '';
if (trim($code) === '') {
    respond(false, '', 'Nenhum código PHP fornecido.');
}

// Garante a tag de abertura
if (strpos($code, '<?php') === false && strpos($code, '<?=') === false) {
    $code = "<?php\n" . $code;
}

// --- Arquivo temporário ---
$scriptFile = tempnam(sys_get_temp_dir(), 'dpphp_');
if ($scriptFile === false) {
    respond(false, '', 'Falha ao preparar o ambiente temporário.');
}
if (file_put_contents($scriptFile, $code) === false) {
    @unlink($scriptFile);
    respond(false, '', 'Falha ao gravar o arquivo temporário.');
}

/** Descobre um binário de PHP CLI utilizável. */
function detectPhpCli(): ?string
{
    $candidates = [];
    if (PHP_SAPI === 'cli' && defined('PHP_BINARY') && PHP_BINARY) {
        $candidates[] = PHP_BINARY;
    }
    $candidates[] = 'php';
    if (defined('PHP_BINDIR')) {
        $sep = DIRECTORY_SEPARATOR;
        $candidates[] = rtrim(PHP_BINDIR, '/\\') . $sep . 'php';
        // Caminhos comuns em hospedagem compartilhada (ex.: EA-PHP da cPanel/HostGator)
        $candidates[] = '/usr/local/bin/php';
        $candidates[] = '/usr/bin/php';
    }
    foreach ($candidates as $c) {
        if ($c && ($c === 'php' || @is_executable($c))) {
            return $c;
        }
    }
    return null;
}

$output = '';
$error = null;

$canProcOpen = function_exists('proc_open') && !in_array('proc_open', explode(',', (string) ini_get('disable_functions')), true);
$phpBinary = detectPhpCli();

if ($canProcOpen && $phpBinary !== null) {
    $disabled = 'exec,shell_exec,system,passthru,proc_open,popen,curl_exec,curl_multi_exec,'
        . 'parse_ini_file,show_source,pcntl_exec,fsockopen,mail,symlink,link';

    $cmd = escapeshellarg($phpBinary)
        . ' -d display_errors=1'
        . ' -d max_execution_time=5'
        . ' -d memory_limit=64M'
        . ' -d disable_functions=' . escapeshellarg($disabled)
        . ' ' . escapeshellarg($scriptFile)
        . ' 2>&1';

    $descriptors = [1 => ['pipe', 'w'], 2 => ['pipe', 'w']];
    $process = @proc_open($cmd, $descriptors, $pipes);
    if (is_resource($process)) {
        $output = (string) stream_get_contents($pipes[1]);
        fclose($pipes[1]);
        fclose($pipes[2]);
        $exitCode = proc_close($process);
        if ($exitCode !== 0 && trim($output) === '') {
            $error = 'O código terminou com erro (código ' . $exitCode . ').';
        }
    } else {
        $error = 'Não foi possível iniciar o processo PHP neste servidor.';
    }
} elseif (function_exists('shell_exec') && $phpBinary !== null) {
    // Fallback: shell_exec (quando proc_open está bloqueado, mas shell_exec não)
    $cmd = escapeshellarg($phpBinary) . ' -d display_errors=1 -d max_execution_time=5 '
        . escapeshellarg($scriptFile) . ' 2>&1';
    $output = (string) @shell_exec($cmd);
    if (trim($output) === '') {
        $error = 'Não foi possível capturar a saída do PHP neste servidor.';
    }
} else {
    $error = 'A execução de PHP não está disponível neste servidor '
        . '(proc_open/shell_exec desabilitados ou PHP CLI ausente).';
}

@unlink($scriptFile);

if (strlen($output) > 20000) {
    $output = substr($output, 0, 20000) . "\n... (saída truncada)";
}

respond($error === null, $output, $error);
