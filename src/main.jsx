import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import { ResumeProvider } from './context/ResumeContext'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <ResumeProvider>
        <App />
      </ResumeProvider>
    </HashRouter>
  </StrictMode>,
)
