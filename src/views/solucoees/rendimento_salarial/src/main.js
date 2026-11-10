
import { createApp } from 'vue';
import App from './App.vue';
import './assets/styles/main.css';
import router from './router';

// Font Awesome
import '@fortawesome/fontawesome-free/css/all.min.css';

// SweetAlert2 - disponível globalmente via window.Swal
import Swal from 'sweetalert2';
window.Swal = Swal;

const app = createApp(App);
app.use(router);
app.mount('#app');
