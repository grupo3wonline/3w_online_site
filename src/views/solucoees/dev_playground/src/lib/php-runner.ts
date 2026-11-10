/**
 * Cliente para execução de PHP.
 * Em produção (HostGator), chama o endpoint nativo `api/execute-php.php`.
 * O caminho respeita o base path da aplicação (import.meta.env.BASE_URL).
 */
export interface PhpResult {
  success: boolean
  output: string
  error: string | null
}

function endpoint(): string {
  const base = import.meta.env.BASE_URL || '/'
  return `${base.replace(/\/$/, '')}/api/execute-php.php`
}

const PHP_NOT_RUNNING =
  'O servidor atual não executa PHP (o dev server do Vite serve o arquivo como texto). ' +
  'Em desenvolvimento, rode "npm run dev:php" em outro terminal — as chamadas de PHP serão ' +
  'encaminhadas ao servidor PHP embutido via proxy. Em produção (HostGator/Apache) o PHP roda nativamente.'

export async function runPhp(code: string): Promise<PhpResult> {
  let res: Response
  try {
    res = await fetch(endpoint(), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code }),
    })
  } catch {
    return {
      success: false,
      output: '',
      error:
        'Não foi possível conectar ao executor PHP. Verifique se o servidor com PHP está ativo.',
    }
  }

  if (!res.ok) {
    // 404: o arquivo não existe no servidor atual (ex.: dev server do Vite)
    if (res.status === 404) {
      return { success: false, output: '', error: PHP_NOT_RUNNING }
    }
    return { success: false, output: '', error: `Falha na requisição (HTTP ${res.status}).` }
  }

  // Lê como texto para conseguir detectar quando o PHP não foi executado.
  const text = await res.text()
  const trimmed = text.trimStart()

  // Se a resposta começa com "<?php" ou "<", o servidor devolveu o código-fonte
  // (PHP não interpretado) ou um HTML de erro — não é JSON válido.
  if (trimmed.startsWith('<?php') || trimmed.startsWith('<')) {
    return { success: false, output: '', error: PHP_NOT_RUNNING }
  }

  try {
    const data = JSON.parse(text) as Partial<PhpResult>
    return {
      success: Boolean(data.success),
      output: data.output ?? '',
      error: data.error ?? null,
    }
  } catch {
    return {
      success: false,
      output: '',
      error: 'Resposta inesperada do servidor ao executar o PHP.',
    }
  }
}
