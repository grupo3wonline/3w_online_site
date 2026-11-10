import { createApp } from "vue";
import { createPinia } from "pinia";
import { MotionPlugin } from "@vueuse/motion";

import App from "./App.vue";
import router from "./router";
import i18n from "./i18n";
import { useThemeStore } from "./stores/theme";
import { registerIcons } from "./lib/icons";

import "./index.css";

// Registra as coleções de ícones offline antes de montar a aplicação.
registerIcons();

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);
app.use(i18n);
app.use(MotionPlugin);

// Inicializa o tema antes de montar para evitar flash de cor incorreta.
useThemeStore().init();

app.mount("#app");
