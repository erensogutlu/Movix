import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { KimlikSaglayici } from './context/KimlikBaglami'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <KimlikSaglayici>
      <App />
    </KimlikSaglayici>
  </StrictMode>,
)
