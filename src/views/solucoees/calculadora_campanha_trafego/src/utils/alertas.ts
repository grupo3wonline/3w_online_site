import Swal from 'sweetalert2'

export function alertaSucesso(titulo: string, texto?: string) {
  return Swal.fire({
    icon: 'success',
    title: titulo,
    text: texto,
    confirmButtonColor: '#4f46e5',
    confirmButtonText: 'Entendido',
    customClass: { popup: 'rounded-2xl' },
  })
}

export function alertaErro(titulo: string, texto?: string) {
  return Swal.fire({
    icon: 'error',
    title: titulo,
    text: texto,
    confirmButtonColor: '#dc2626',
    confirmButtonText: 'Fechar',
    customClass: { popup: 'rounded-2xl' },
  })
}

export function alertaInfo(titulo: string, texto?: string) {
  return Swal.fire({
    icon: 'info',
    title: titulo,
    text: texto,
    confirmButtonColor: '#4f46e5',
    confirmButtonText: 'Entendido',
    customClass: { popup: 'rounded-2xl' },
  })
}

export function alertaConfirmacao(titulo: string, texto: string): Promise<boolean> {
  return Swal.fire({
    icon: 'question',
    title: titulo,
    text: texto,
    showCancelButton: true,
    confirmButtonColor: '#4f46e5',
    cancelButtonColor: '#6b7280',
    confirmButtonText: 'Sim, confirmar',
    cancelButtonText: 'Cancelar',
    customClass: { popup: 'rounded-2xl' },
  }).then((result) => result.isConfirmed)
}
