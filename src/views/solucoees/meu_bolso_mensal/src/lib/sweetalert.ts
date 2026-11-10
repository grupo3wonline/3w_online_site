import Swal from "sweetalert2";

// Configuração base para todos os alertas
const baseConfig = {
  confirmButtonColor: "hsl(221, 83%, 53%)",
  cancelButtonColor: "hsl(0, 84%, 60%)",
  customClass: {
    popup: "rounded-2xl shadow-floating",
    title: "font-display font-bold text-foreground",
    htmlContainer: "text-muted-foreground",
    confirmButton: "rounded-lg font-medium",
    cancelButton: "rounded-lg font-medium",
    input: "rounded-lg border-border focus:ring-primary",
  },
};

// Alerta de sucesso
export const showSuccess = (title: string, text?: string) => {
  return Swal.fire({
    ...baseConfig,
    icon: "success",
    title,
    text,
    confirmButtonText: "Entendido",
    timer: 3000,
    timerProgressBar: true,
  });
};

// Alerta de erro
export const showError = (title: string, text?: string) => {
  return Swal.fire({
    ...baseConfig,
    icon: "error",
    title,
    text,
    confirmButtonText: "Fechar",
  });
};

// Alerta de aviso
export const showWarning = (title: string, text?: string) => {
  return Swal.fire({
    ...baseConfig,
    icon: "warning",
    title,
    text,
    confirmButtonText: "Entendido",
  });
};

// Alerta informativo
export const showInfo = (title: string, text?: string) => {
  return Swal.fire({
    ...baseConfig,
    icon: "info",
    title,
    text,
    confirmButtonText: "OK",
  });
};

// Confirmação
export const showConfirm = (
  title: string,
  text?: string,
  confirmText = "Confirmar",
  cancelText = "Cancelar"
) => {
  return Swal.fire({
    ...baseConfig,
    icon: "question",
    title,
    text,
    showCancelButton: true,
    confirmButtonText: confirmText,
    cancelButtonText: cancelText,
    reverseButtons: true,
  });
};

// Loading
export const showLoading = (title = "Processando...") => {
  return Swal.fire({
    ...baseConfig,
    title,
    allowOutsideClick: false,
    allowEscapeKey: false,
    showConfirmButton: false,
    didOpen: () => {
      Swal.showLoading();
    },
  });
};

// Fechar loading
export const closeLoading = () => {
  Swal.close();
};

// Toast (notificação no canto)
export const showToast = (
  title: string,
  icon: "success" | "error" | "warning" | "info" = "success"
) => {
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    customClass: {
      popup: "rounded-xl shadow-elevated",
    },
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  return Toast.fire({
    icon,
    title,
  });
};

// Alerta com input
export const showInput = (
  title: string,
  inputPlaceholder?: string,
  inputValue?: string
) => {
  return Swal.fire({
    ...baseConfig,
    title,
    input: "text",
    inputPlaceholder,
    inputValue,
    showCancelButton: true,
    confirmButtonText: "Confirmar",
    cancelButtonText: "Cancelar",
    inputValidator: (value) => {
      if (!value) {
        return "Por favor, preencha o campo";
      }
    },
  });
};

// Alerta de cálculo concluído (específico para calculadoras)
export const showCalculationSuccess = (title: string, details?: string) => {
  return Swal.fire({
    ...baseConfig,
    icon: "success",
    title,
    html: details
      ? `<div class="text-left mt-4 p-4 bg-success-light rounded-lg">${details}</div>`
      : undefined,
    confirmButtonText: "Ótimo!",
    timer: 5000,
    timerProgressBar: true,
  });
};

export default Swal;