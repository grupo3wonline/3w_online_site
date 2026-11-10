import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import 'sweetalert2/dist/sweetalert2.min.css'
import '@fortawesome/fontawesome-free/css/all.min.css'


createRoot(document.getElementById("root")!).render(<App />);
