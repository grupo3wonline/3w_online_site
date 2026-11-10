import Swal from 'sweetalert2'

const COR = 'hsl(217, 91%, 38%)'

/** Wrapper de alertas (SweetAlert2) com identidade visual da aplicação. */
export function useAlerta() {
  function erro(texto: string, titulo = 'Erro de Validação') {
    return Swal.fire({ icon: 'error', title: titulo, text: texto, confirmButtonColor: COR })
  }

  function sucesso(texto: string, titulo = 'Concluído!') {
    return Swal.fire({
      icon: 'success',
      title: titulo,
      text: texto,
      confirmButtonColor: COR,
      timer: 2000,
      timerProgressBar: true,
    })
  }

  return { erro, sucesso }
}
