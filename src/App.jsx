import './App.css'
import ProductList from './components/ProductList'
import { MoneyProvider, useMoney } from './context/MoneyContext'
import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import Cart from './components/Cart'
import CartPage from './pages/CartPage'

// Para miktarını gösteren bileşen
// MoneyContext'ten balance ve formatMoney fonksiyonlarını kullanıyor
function MoneyDisplay() {
  const { balance, formatMoney } = useMoney();
  
  return (
    <div className="money-section">
      {formatMoney(balance)}
    </div>
  );
}

// Ürünler sayfası için wrapper bileşen
// URL'den sayfa numarasını alıp ProductList'e iletiyor
function ProductsPageWrapper() {
  const { page } = useParams();
  return (
    <div className="layout-container">
      <div className="products-container">
        <ProductList pageParam={page} />
      </div>
      <div className="cart-container">
        <Cart />
      </div>
    </div>
  );
}

// Ana uygulama bileşeni
function App() {
  // Font Awesome ikonlarını dinamik olarak yüklüyoruz
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://kit.fontawesome.com/d2389ef020.js';
    script.crossOrigin = 'anonymous';
    document.head.appendChild(script);

    // Cleanup: script elementini kaldırıyoruz
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    // MoneyProvider ile para yönetimi context'ini sağlıyoruz
    <MoneyProvider>
      {/* Router ile sayfa yönlendirmelerini yapıyoruz */}
      <Router>
        <div className="app">
          <Header />
          <div className="layout-container">
            <Routes>
              {/* Ana sayfa route'u */}
              <Route path="/" element={<Home />} />
              {/* Ürünler sayfası route'u - sayfalama parametresi ile */}
              <Route path="/products/:page" element={
                <>
                  <div className="products-container">
                    <ProductList />
                  </div>
                  <div className="cart-container">
                    <Cart />
                  </div>
                </>
              } />
              {/* Sepet sayfası route'u */}
              <Route path="/cart" element={<CartPage />} />
            </Routes>
          </div>
        </div>
      </Router>
    </MoneyProvider>
  );
}

export default App; 