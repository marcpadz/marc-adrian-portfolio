import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

const rootElement = document.getElementById('root')!

if (rootElement.hasChildNodes()) {
  hydrateRoot(rootElement, <App />)
} else {
  createRoot(rootElement).render(<App />)
}
