/**
 * Testes do composable useAlert — SweetAlert2
 *
 * Verifica que as funções de alerta retornam Promises e têm a assinatura
 * correta, sem depender do DOM real do SweetAlert2.
 */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

// Mock do SweetAlert2 para evitar erros de DOM no ambiente de testes
vi.mock('sweetalert2', () => {
  const mockSwal = {
    fire: vi.fn().mockResolvedValue({ isConfirmed: true, isDismissed: false, value: undefined }),
    close: vi.fn(),
    showLoading: vi.fn(),
  }
  return { default: mockSwal }
})

import { useAlert } from '@/composables/useAlert'
import Swal from 'sweetalert2'

describe('useAlert — showSuccess', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('chama Swal.fire com icon: success', async () => {
    const { showSuccess } = useAlert()
    await showSuccess('Enviado com sucesso!', 'Aguarde nosso contato.')
    expect(Swal.fire).toHaveBeenCalledWith(
      expect.objectContaining({ icon: 'success', title: 'Enviado com sucesso!' })
    )
  })

  it('retorna uma Promise', () => {
    const { showSuccess } = useAlert()
    const result = showSuccess('OK')
    expect(result).toBeInstanceOf(Promise)
  })
})

describe('useAlert — showError', () => {
  beforeEach(() => vi.clearAllMocks())

  it('chama Swal.fire com icon: error', async () => {
    const { showError } = useAlert()
    await showError('Erro ao enviar formulário')
    expect(Swal.fire).toHaveBeenCalledWith(
      expect.objectContaining({ icon: 'error', title: 'Erro ao enviar formulário' })
    )
  })
})

describe('useAlert — showWarning', () => {
  beforeEach(() => vi.clearAllMocks())

  it('chama Swal.fire com icon: warning', async () => {
    const { showWarning } = useAlert()
    await showWarning('Atenção', 'Verifique os dados antes de continuar.')
    expect(Swal.fire).toHaveBeenCalledWith(
      expect.objectContaining({ icon: 'warning', title: 'Atenção' })
    )
  })
})

describe('useAlert — showInfo', () => {
  beforeEach(() => vi.clearAllMocks())

  it('chama Swal.fire com icon: info', async () => {
    const { showInfo } = useAlert()
    await showInfo('Informação importante')
    expect(Swal.fire).toHaveBeenCalledWith(
      expect.objectContaining({ icon: 'info', title: 'Informação importante' })
    )
  })
})

describe('useAlert — showConfirm', () => {
  beforeEach(() => vi.clearAllMocks())

  it('chama Swal.fire com showCancelButton: true', async () => {
    const { showConfirm } = useAlert()
    await showConfirm('Confirma a exclusão?', 'Essa ação não pode ser desfeita.')
    expect(Swal.fire).toHaveBeenCalledWith(
      expect.objectContaining({ showCancelButton: true, icon: 'question' })
    )
  })
})

describe('useAlert — showToast', () => {
  beforeEach(() => vi.clearAllMocks())

  it('chama Swal.fire com toast: true e position: bottom-end', async () => {
    const { showToast } = useAlert()
    await showToast('Link copiado!', 'success')
    expect(Swal.fire).toHaveBeenCalledWith(
      expect.objectContaining({
        toast: true,
        position: 'bottom-end',
        icon: 'success',
        title: 'Link copiado!',
      })
    )
  })

  it('usa icon default "success" quando não especificado', async () => {
    const { showToast } = useAlert()
    await showToast('Copiado!')
    expect(Swal.fire).toHaveBeenCalledWith(
      expect.objectContaining({ icon: 'success' })
    )
  })
})

describe('useAlert — showLoading / closeLoading', () => {
  beforeEach(() => vi.clearAllMocks())

  it('showLoading chama Swal.fire com showConfirmButton: false', () => {
    const { showLoading } = useAlert()
    showLoading('Processando...')
    expect(Swal.fire).toHaveBeenCalledWith(
      expect.objectContaining({ showConfirmButton: false })
    )
  })

  it('closeLoading chama Swal.close()', () => {
    const { closeLoading } = useAlert()
    closeLoading()
    expect(Swal.close).toHaveBeenCalled()
  })
})

describe('useAlert — títulos e textos em português', () => {
  beforeEach(() => vi.clearAllMocks())

  it('usa "OK" como botão de confirmação padrão em showSuccess', async () => {
    const { showSuccess } = useAlert()
    await showSuccess('Teste')
    expect(Swal.fire).toHaveBeenCalledWith(
      expect.objectContaining({ confirmButtonText: 'OK' })
    )
  })

  it('usa "Fechar" como botão em showError', async () => {
    const { showError } = useAlert()
    await showError('Erro')
    expect(Swal.fire).toHaveBeenCalledWith(
      expect.objectContaining({ confirmButtonText: 'Fechar' })
    )
  })

  it('usa "Sim" / "Não" em showConfirm', async () => {
    const { showConfirm } = useAlert()
    await showConfirm('Confirmar?')
    expect(Swal.fire).toHaveBeenCalledWith(
      expect.objectContaining({ confirmButtonText: 'Sim', cancelButtonText: 'Não' })
    )
  })
})
