import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './style.css'

// Font Awesome
import '@fortawesome/fontawesome-free/css/all.min.css'

// SweetAlert2 CSS
import 'sweetalert2/dist/sweetalert2.min.css'

const app = createApp(App)

app.use(router)
app.mount('#app')
