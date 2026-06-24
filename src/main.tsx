import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'

const tg = window.Telegram?.WebApp
if (tg) {
  tg.ready()
  tg.expand()

  if (tg.themeParams.bg_color) {
    document.documentElement.style.setProperty('--color-background', tg.themeParams.bg_color)
    document.documentElement.style.setProperty('--color-surface', tg.themeParams.bg_color)
    document.documentElement.style.setProperty('--color-on-surface', tg.themeParams.text_color || '#111c2d')
    document.documentElement.style.setProperty('--color-on-surface-variant', tg.themeParams.hint_color || '#404944')
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
