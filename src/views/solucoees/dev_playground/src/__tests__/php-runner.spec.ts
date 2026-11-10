import { describe, it, expect, vi, afterEach } from 'vitest'
import { runPhp } from '@/lib/php-runner'

function mockFetch(impl: () => Partial<Response> | Promise<Partial<Response>>) {
  vi.stubGlobal('fetch', vi.fn().mockImplementation(async () => impl()))
}

describe('runPhp', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('retorna a saída em caso de sucesso', async () => {
    mockFetch(() => ({
      ok: true,
      status: 200,
      text: async () => JSON.stringify({ success: true, output: 'Olá', error: null }),
    }))
    const result = await runPhp('<?php echo "Olá";')
    expect(result.success).toBe(true)
    expect(result.output).toBe('Olá')
  })

  it('trata falha de rede sem lançar exceção', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('offline')))
    const result = await runPhp('<?php echo 1;')
    expect(result.success).toBe(false)
    expect(result.error).toContain('conectar')
  })

  it('trata resposta HTTP não-ok', async () => {
    mockFetch(() => ({ ok: false, status: 500, text: async () => '' }))
    const result = await runPhp('<?php echo 1;')
    expect(result.success).toBe(false)
    expect(result.error).toContain('500')
  })

  it('detecta quando o servidor devolve o código-fonte PHP (não executado)', async () => {
    mockFetch(() => ({
      ok: true,
      status: 200,
      text: async () => '<?php /** ... */ echo "x";',
    }))
    const result = await runPhp('<?php echo 1;')
    expect(result.success).toBe(false)
    expect(result.error).toContain('não executa PHP')
  })

  it('trata 404 (endpoint ausente) com mensagem clara', async () => {
    mockFetch(() => ({ ok: false, status: 404, text: async () => 'Not Found' }))
    const result = await runPhp('<?php echo 1;')
    expect(result.success).toBe(false)
    expect(result.error).toContain('PHP')
  })
})
