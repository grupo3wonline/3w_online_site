import Swal from 'sweetalert2';

// Configuração padrão do SweetAlert2 com design system
export const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer);
    toast.addEventListener('mouseleave', Swal.resumeTimer);
  }
});

export const showSuccessAlert = (title: string, text?: string) => {
  return Swal.fire({
    icon: 'success',
    title,
    text,
    confirmButtonColor: 'hsl(210, 85%, 45%)',
    confirmButtonText: 'Ok'
  });
};

export const showErrorAlert = (title: string, text?: string) => {
  return Swal.fire({
    icon: 'error',
    title,
    text,
    confirmButtonColor: 'hsl(0, 84%, 60%)',
    confirmButtonText: 'Entendi'
  });
};

export const showConfirmAlert = async (title: string, text?: string) => {
  return Swal.fire({
    icon: 'warning',
    title,
    text,
    showCancelButton: true,
    confirmButtonColor: 'hsl(210, 85%, 45%)',
    cancelButtonColor: 'hsl(220, 13%, 91%)',
    confirmButtonText: 'Sim, confirmar',
    cancelButtonText: 'Cancelar'
  });
};

export const showInfoAlert = (title: string, text?: string) => {
  return Swal.fire({
    icon: 'info',
    title,
    text,
    confirmButtonColor: 'hsl(210, 85%, 45%)',
    confirmButtonText: 'Entendi'
  });
};
