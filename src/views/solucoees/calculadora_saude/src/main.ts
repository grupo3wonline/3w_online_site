import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { MotionPlugin } from '@vueuse/motion';
import VueApexCharts from 'vue3-apexcharts';
import App from './App.vue';
import router from './router';
import { initConsent } from './utils/consent';
import './index.css';

// Inicializa consentimentos — carrega GA/GTM apenas se o usuário já aceitou (LGPD/GDPR).
initConsent();

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(MotionPlugin);
app.use(VueApexCharts);

// Aplica título de cada rota (SEO)
router.afterEach((to) => {
  const title = to.meta.title as string | undefined;
  if (title) document.title = title;
});

app.mount('#app');
