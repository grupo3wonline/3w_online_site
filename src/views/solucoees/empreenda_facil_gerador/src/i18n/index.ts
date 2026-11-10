import { createI18n } from "vue-i18n";
import ptBR from "./locales/pt-BR";

/**
 * i18n configurado com pt-BR como padrão.
 * Estrutura pronta para expansão futura (en, es).
 */
export const i18n = createI18n({
  legacy: false,
  locale: "pt-BR",
  fallbackLocale: "pt-BR",
  messages: {
    "pt-BR": ptBR,
  },
});
