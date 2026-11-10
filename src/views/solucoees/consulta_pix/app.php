<?php
/**
 * ============================================
 * Pix Decode Pro - Backend Engine
 * Desenvolvido por HOTWYL | WILLFROMBRASIL
 * PHP 8+ | Segurança | LGPD Compliant
 * ============================================
 * 
 * - Processamento em memória (zero storage)
 * - Headers de segurança HTTP
 * - Validação EMVCo 2.0
 * - Sanitização de entrada
 */

declare(strict_types=1);

// ============================================
// HEADERS DE SEGURANÇA
// ============================================
header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: DENY');
header('X-XSS-Protection: 1; mode=block');
header('Referrer-Policy: no-referrer');
header('Permissions-Policy: camera=(), microphone=(), geolocation=()');
header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0');
header('Pragma: no-cache');

// CORS para desenvolvimento local
$allowedOrigins = ['http://localhost', 'https://localhost'];
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if (in_array($origin, $allowedOrigins, true) || str_starts_with($origin, 'http://localhost:') || str_starts_with($origin, 'http://127.0.0.1')) {
    header("Access-Control-Allow-Origin: {$origin}");
    header('Access-Control-Allow-Methods: POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Accept');
}

// Preflight CORS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

// ============================================
// CONSTANTES DE TAGS PIX (EMVCo)
// ============================================
const PIX_TAGS = [
    '00' => 'Indicador de Formato de Payload',
    '01' => 'Método de Iniciação',
    '02' => 'Arranjo de Pagamento (Visa)',
    '03' => 'Arranjo de Pagamento (Mastercard)',
    '04' => 'Arranjo de Pagamento (Elo)',
    '26' => 'Informações da Conta do Recebedor',
    '27' => 'Informações Adicionais da Conta',
    '28' => 'Informações de Negócios',
    '52' => 'Categoria do Comerciante (MCC)',
    '53' => 'Moeda da Transação',
    '54' => 'Valor da Transação',
    '55' => 'Percentual de Gorjeta',
    '56' => 'Valor da Gorjeta',
    '57' => 'Percentual Conveniência',
    '58' => 'Código do País',
    '59' => 'Nome do Recebedor / Estabelecimento',
    '60' => 'Cidade do Recebedor',
    '61' => 'CEP do Recebedor',
    '62' => 'Campo de Dados Adicionais (TxID)',
    '63' => 'Checksum (CRC16-CCITT)',
    '64' => 'Informação de Template Adicional',
    '80' => 'Dados do Emissor (Template 80)',
    '81' => 'Dados do Emissor (Template 81)',
];

// ============================================
// PROCESSAMENTO DA REQUISIÇÃO
// ============================================
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        'success' => false,
        'message' => 'Método não permitido. Use POST para enviar o payload Pix.'
    ]);
    exit;
}

try {
    $rawInput = file_get_contents('php://input');

    if (empty($rawInput)) {
        throw new InvalidArgumentException("Nenhum dado foi recebido no corpo da requisição.", 400);
    }

    $input = json_decode($rawInput, true);

    if (json_last_error() !== JSON_ERROR_NONE) {
        throw new InvalidArgumentException("Formato de dados inválido. JSON malformado.", 400);
    }

    $pixCode = trim($input['pixCode'] ?? '');

    // Sanitização: remover caracteres não-imprimíveis
    $pixCode = preg_replace('/[\x00-\x1F\x7F]/', '', $pixCode);

    if (empty($pixCode)) {
        throw new InvalidArgumentException("O payload Pix não pode estar vazio.", 400);
    }

    // Validação de tamanho (proteção contra payloads absurdos)
    if (strlen($pixCode) > 2048) {
        throw new InvalidArgumentException("O payload excede o tamanho máximo permitido (2048 caracteres).", 422);
    }

    if (strlen($pixCode) < 20) {
        throw new InvalidArgumentException("O payload é muito curto para ser um código Pix válido.", 422);
    }

    // Validação mínima de estrutura EMVCo (deve iniciar com '00')
    if (!str_starts_with($pixCode, '00')) {
        throw new InvalidArgumentException("Formato inválido. O código Pix (EMVCo) deve iniciar com '00'.", 422);
    }

    // Validação: apenas caracteres válidos
    if (!preg_match('/^[A-Za-z0-9@.\-_\/:*+ ]+$/', $pixCode)) {
        throw new InvalidArgumentException("O payload contém caracteres inválidos.", 422);
    }

    $engine = new PixDecoderEngine();
    $decoded = $engine->parse($pixCode);
    $crcValid = $engine->verifyCRC($pixCode);

    echo json_encode([
        'success'   => true,
        'crc_valid' => $crcValid,
        'data'      => $decoded,
        'meta'      => [
            'server_time'    => date('Y-m-d\TH:i:s\Z'),
            'engine_version' => '2.1.4',
            'php_version'    => PHP_MAJOR_VERSION . '.' . PHP_MINOR_VERSION,
        ]
    ], JSON_UNESCAPED_UNICODE);

} catch (InvalidArgumentException $e) {
    $code = $e->getCode();
    http_response_code($code >= 400 && $code < 600 ? $code : 400);
    echo json_encode([
        'success' => false,
        'message' => $e->getMessage()
    ], JSON_UNESCAPED_UNICODE);
} catch (Throwable $e) {
    error_log('[PixDecode Error] ' . $e->getMessage());
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Erro interno no processamento. Tente novamente.'
    ], JSON_UNESCAPED_UNICODE);
}
exit;

// ============================================
// MOTOR DE DECODIFICAÇÃO TLV
// ============================================
class PixDecoderEngine
{
    /**
     * Analisa a string Pix recursivamente (Tags compostas)
     */
    public function parse(string $payload): array
    {
        $data = [];
        $i = 0;
        $len = strlen($payload);

        while ($i < $len) {
            if ($i + 4 > $len) break;

            $id     = substr($payload, $i, 2);
            $length = (int) substr($payload, $i + 2, 2);
            $i += 4;

            if ($length < 0 || $i + $length > $len) break;

            $value = substr($payload, $i, $length);
            $i += $length;

            // Tratamento de Subtags (26, 27, 62, 64, 80, 81)
            if (in_array($id, ['26', '27', '62', '64', '80', '81'], true)) {
                $subData = $this->parseSubTags($value);

                if ($id === '26') {
                    if (isset($subData['00'])) {
                        $data['gui'] = [
                            'label' => 'Interface Organizacional (GUI)',
                            'value' => $subData['00'],
                            'id'    => '26.00'
                        ];
                    }
                    if (isset($subData['01'])) {
                        $data['pixKey'] = [
                            'label' => 'Chave Pix (Identificador)',
                            'value' => $subData['01'],
                            'id'    => '26.01'
                        ];
                    }
                    if (isset($subData['02'])) {
                        $data['description'] = [
                            'label' => 'Descrição / Info Adicional',
                            'value' => $subData['02'],
                            'id'    => '26.02'
                        ];
                    }
                    if (isset($subData['03'])) {
                        $data['fss'] = [
                            'label' => 'Facilitador de Serviço (FSS)',
                            'value' => $subData['03'],
                            'id'    => '26.03'
                        ];
                    }
                } elseif ($id === '62') {
                    if (isset($subData['05'])) {
                        $data['txid'] = [
                            'label' => 'Identificador da Transação (TxID)',
                            'value' => $subData['05'],
                            'id'    => '62.05'
                        ];
                    }
                    if (isset($subData['07'])) {
                        $data['additional_data'] = [
                            'label' => 'Dados Adicionais do Pagamento',
                            'value' => $subData['07'],
                            'id'    => '62.07'
                        ];
                    }
                }
            } else {
                $label = PIX_TAGS[$id] ?? "Campo Personalizado ($id)";

                // Formatação Humana
                $displayValue = $value;
                if ($id === '54') {
                    $displayValue = "R$ " . number_format((float) $value, 2, ',', '.');
                }
                if ($id === '53') {
                    $currencies = ['986' => 'Real (BRL)', '840' => 'Dólar (USD)', '978' => 'Euro (EUR)'];
                    $displayValue = $currencies[$value] ?? $value;
                }
                if ($id === '01') {
                    $methods = ['11' => 'Estático (Reutilizável)', '12' => 'Dinâmico (Uso Único)'];
                    $displayValue = $methods[$value] ?? "Versão {$value}";
                }

                $data[$id] = [
                    'id'    => $id,
                    'label' => $label,
                    'value' => $displayValue
                ];
            }
        }
        return $data;
    }

    /**
     * Parser recursivo para subtags
     */
    private function parseSubTags(string $payload): array
    {
        $sub = [];
        $i = 0;
        $len = strlen($payload);

        while ($i < $len) {
            if ($i + 4 > $len) break;

            $id = substr($payload, $i, 2);
            $l  = (int) substr($payload, $i + 2, 2);
            $i += 4;

            if ($l < 0 || $i + $l > $len) break;

            $v = substr($payload, $i, $l);
            $i += $l;
            $sub[$id] = $v;
        }
        return $sub;
    }

    /**
     * Validação de Checksum CRC16-CCITT Padrão BR Code
     */
    public function verifyCRC(string $payload): bool
    {
        if (strlen($payload) < 8) return false;

        $givenCrc = strtoupper(substr($payload, -4));

        // Verificar se os últimos 4 chars são hexadecimais válidos
        if (!preg_match('/^[0-9A-F]{4}$/', $givenCrc)) {
            return false;
        }

        $body = substr($payload, 0, -4);
        $calculatedCrc = $this->crc16ccitt($body);

        return $givenCrc === $calculatedCrc;
    }

    /**
     * CRC16-CCITT (0xFFFF) conforme especificação EMVCo
     */
    private function crc16ccitt(string $data): string
    {
        $crc = 0xFFFF;
        $len = strlen($data);

        for ($i = 0; $i < $len; $i++) {
            $crc ^= (ord($data[$i]) << 8);
            for ($j = 0; $j < 8; $j++) {
                if ($crc & 0x8000) {
                    $crc = (($crc << 1) ^ 0x1021) & 0xFFFF;
                } else {
                    $crc = ($crc << 1) & 0xFFFF;
                }
            }
        }

        return strtoupper(sprintf('%04X', $crc & 0xFFFF));
    }
}