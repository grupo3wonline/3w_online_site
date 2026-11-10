import Swal from "sweetalert2";

/**
 * Wrapper do SweetAlert2 com tema integrado ao dark mode.
 * Centraliza alertas para consistência visual e de UX.
 */
const swalBase = () =>
  Swal.mixin({
    buttonsStyling: false,
    customClass: {
      popup: "rounded-xl",
      confirmButton:
        "inline-flex items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary-hover focus-visible:ring-2 focus-visible:ring-ring",
      cancelButton:
        "inline-flex items-center justify-center rounded-lg border border-border bg-transparent px-5 py-2.5 text-sm font-semibold text-foreground hover:bg-muted ml-2",
    },
  });

export const notify = {
  success(title: string, text?: string) {
    return swalBase().fire({ icon: "success", title, text, timer: 2500, showConfirmButton: false });
  },
  error(title: string, text?: string) {
    return swalBase().fire({ icon: "error", title, text });
  },
  info(title: string, text?: string) {
    return swalBase().fire({ icon: "info", title, text });
  },
  async confirm(title: string, text?: string): Promise<boolean> {
    const res = await swalBase().fire({
      icon: "question",
      title,
      text,
      showCancelButton: true,
      confirmButtonText: "Confirmar",
      cancelButtonText: "Cancelar",
    });
    return res.isConfirmed;
  },
  toast(title: string, icon: "success" | "error" | "info" = "success") {
    return Swal.fire({
      toast: true,
      position: "top-end",
      icon,
      title,
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
    });
  },
};
