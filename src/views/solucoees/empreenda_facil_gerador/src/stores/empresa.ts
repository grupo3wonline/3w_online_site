import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";
import { criarParte, type Parte } from "@/composables/useDocumentParties";

const empresaVazia = (): Parte => criarParte();

/**
 * Dados da empresa persistidos localmente (localStorage via VueUse).
 * Reaproveitados entre os três geradores — o usuário digita uma vez só.
 * O logo é armazenado como data URL (base64).
 */
export const useEmpresaStore = defineStore("empresa", () => {
  const dados = useStorage<Parte>("empreenda-facil-empresa", empresaVazia());
  const logo = useStorage<string>("empreenda-facil-logo", "");

  const limpar = () => {
    dados.value = empresaVazia();
    logo.value = "";
  };

  return { dados, logo, limpar };
});
