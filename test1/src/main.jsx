import { createRoot } from 'react-dom/client'
import './index.css'
import AppRouter from './routes/AppRouter.jsx'

createRoot(document.getElementById('root')).render(
  //<StrictMode>
  <AppRouter />
  //</StrictMode>,
)
