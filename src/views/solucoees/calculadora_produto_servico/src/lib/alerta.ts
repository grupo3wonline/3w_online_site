import Swal, { type SweetAlertOptions } from 'sweetalert2'

function estaEscuro(): boolean {
  return document.documentElement.classList.contains('dark')
}

/** Retorna as cores base do SweetAlert2 conforme o tema ativo. */
function coresTema() {
  const escuro = estaEscuro()
  return {
    background: escuro ? '#111a2e' : '#ffffff',
    color: escuro ? '#f1f5f9' : '#0f172a',
  }
}

export function alerta(opcoes: SweetAlertOptions) {
  return Swal.fire({
    ...coresTema(),
    confirmButtonColor: '#6366f1',
    ...opcoes,
  })
}

export function alertaSucesso(titulo: string, html?: string) {
  return alerta({
    icon: 'success',
    title: titulo,
    html,
    confirmButtonColor: '#10b981',
    timer: 3000,
    timerProgressBar: true,
  })
}

export function alertaAtencao(texto: string, titulo = 'Atenção') {
  return alerta({ icon: 'warning', title: titulo, text: texto })
}

export { Swal }
