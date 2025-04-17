// React ve ReactDOM kütüphanelerini içe aktarıyoruz
import React from 'react'
import ReactDOM from 'react-dom/client'
// Ana uygulama bileşenini ve stil dosyasını içe aktarıyoruz
import App from './App.jsx'
import './index.css'

// React uygulamasını başlatıyoruz
// createRoot ile React 18'in yeni root API'sini kullanıyoruz
// StrictMode ile geliştirme sırasında potansiyel sorunları yakalıyoruz
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
