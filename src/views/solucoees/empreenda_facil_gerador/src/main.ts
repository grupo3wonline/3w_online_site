import { createApp } from "vue";
import { createPinia } from "pinia";
import { MotionPlugin } from "@vueuse/motion";
import { vMaska } from "maska/vue";
import App from "./App.vue";
import router from "./router";
import { i18n } from "./i18n";
import "./index.css";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(i18n);
app.use(MotionPlugin);
app.directive("maska", vMaska);

app.mount("#app");
