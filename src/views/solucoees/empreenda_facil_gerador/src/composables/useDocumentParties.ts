/** Estrutura de uma parte do documento (empresa/emitente ou cliente/pagador). */
export interface Parte {
  nome: string;
  documento: string;
  endereco: string;
  telefone: string;
  email: string;
}

export const criarParte = (): Parte => ({
  nome: "",
  documento: "",
  endereco: "",
  telefone: "",
  email: "",
});
