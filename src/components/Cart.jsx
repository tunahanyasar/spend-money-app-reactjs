// Context ve gerekli hook'ları içe aktarıyoruz
import { useMoney } from '../context/MoneyContext';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { products } from '../data/products';

// Sepet bileşeni - Sepetteki ürünleri ve işlemleri yönetiyor
const Cart = () => {
  // Context'ten gerekli state ve fonksiyonları alıyoruz
  const { cart, formatMoney, clearCart, sellItem, buyItem, removeFromCart, balance } = useMoney();
  // Alım-satım durumlarını yöneten state'ler
  const [isBuying, setIsBuying] = useState({});
  const [isSelling, setIsSelling] = useState({});
  const navigate = useNavigate();
  // Toplam harcama hesaplaması
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const productsPerPage = 12;

  // Alım-satım işlemlerini yöneten effect
  useEffect(() => {
    const buyTimers = {};
    const sellTimers = {};

    // Alım işlemlerini kontrol ediyoruz
    Object.entries(isBuying).forEach(([itemId, isActive]) => {
      if (isActive) {
        const item = cart.find(i => i.id === parseInt(itemId));
        if (item && balance >= item.price) {
          buyItem(item);
          buyTimers[itemId] = setInterval(() => {
            if (balance >= item.price) {
              buyItem(item);
            } else {
              setIsBuying(prev => ({ ...prev, [itemId]: false }));
            }
          }, 300);
        }
      }
    });

    // Satım işlemlerini kontrol ediyoruz
    Object.entries(isSelling).forEach(([itemId, isActive]) => {
      if (isActive) {
        const item = cart.find(i => i.id === parseInt(itemId));
        if (item && item.quantity > 0) {
          sellItem(item.id);
          sellTimers[itemId] = setInterval(() => {
            if (item.quantity > 0) {
              sellItem(item.id);
            } else {
              setIsSelling(prev => ({ ...prev, [itemId]: false }));
            }
          }, 300);
        }
      }
    });

    // Cleanup: interval'ları temizliyoruz
    return () => {
      Object.values(buyTimers).forEach(timer => clearInterval(timer));
      Object.values(sellTimers).forEach(timer => clearInterval(timer));
    };
  }, [isBuying, isSelling, balance, cart, buyItem, sellItem]);

  // Ürün sayfasına yönlendirme fonksiyonu
  const handleProductClick = (productId) => {
    const sortedProducts = [...products].sort((a, b) => a.price - b.price);
    const productIndex = sortedProducts.findIndex(p => p.id === productId);
    
    const pageNumber = Math.floor(productIndex / productsPerPage) + 1;
    
    navigate(`/products/${pageNumber}`);

    // Ürünü sayfada vurgulama
    setTimeout(() => {
      const productElement = document.getElementById(`product-${productId}`);
      if (productElement) {
        productElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        productElement.classList.add('highlight');
        setTimeout(() => productElement.classList.remove('highlight'), 2000);
      }
    }, 100);
  };

  // Ürün ismini kısaltma fonksiyonu
  const truncateName = (name) => {
    if (name.length > 8) {
      return name.substring(0, 8) + '...';
    }
    return name;
  };

  return (
    <div className="cart-content">
      {/* Sepet başlığı ve bakiye */}
      <div className="cart-header">
        <h2>Your Cart</h2>
        <div className="cart-balance">{formatMoney(balance)}</div>
        <i className="fa-solid fa-cart-shopping" style={{cursor: 'pointer'}} onClick={() => navigate('/cart')}></i>
      </div>
      {/* Sepet içeriği - Boş veya dolu durumuna göre gösterim */}
      {cart.length === 0 ? (
        <div className="cart-item empty-cart-item">
          <span>Product</span>
          <span className="cart-item-quantity">x0</span>
          <span>$0</span>
        </div>
      ) : (
        cart.map((item) => {
          const product = products.find(p => p.id === item.id);
          return (
            <div key={item.id} className="cart-item-container">
              {/* Ürün bilgileri */}
              <div className="cart-item">
                <span 
                  className="product-name"
                  onClick={() => handleProductClick(item.id)}
                  style={{ cursor: 'pointer' }}
                >
                  {product ? product.name : 'Unknown Product'}
                </span>
                <span className="cart-item-quantity">x{item.quantity}</span>
                <span>${product ? formatMoney(product.price * item.quantity).replace('$', '') : '0'}</span>
              </div>
              {/* Alım-satım butonları */}
              <div className="cart-buttons">
                <button
                  className="sell-btn cart-remove-btn"
                  onMouseDown={() => setIsSelling(prev => ({ ...prev, [item.id]: true }))}
                  onMouseUp={() => setIsSelling(prev => ({ ...prev, [item.id]: false }))}
                  onMouseLeave={() => setIsSelling(prev => ({ ...prev, [item.id]: false }))}
                  disabled={item.quantity === 0}
                >
                  -
                </button>
                <button
                  className="sell-btn cart-action-btn"
                  onClick={() => sellItem(item.id)}
                  disabled={item.quantity === 0}
                  title="Remove one from cart"
                >
                  <i className="fa-solid fa-cart-arrow-down"></i>
                </button>
                <button
                  className="buy-btn cart-action-btn"
                  onClick={() => buyItem(item)}
                  disabled={balance < item.price}
                  title="Add one to cart"
                >
                  <i className="fa-solid fa-cart-plus"></i>
                </button>
                <button
                  onMouseDown={() => setIsBuying(prev => ({ ...prev, [item.id]: true }))}
                  onMouseUp={() => setIsBuying(prev => ({ ...prev, [item.id]: false }))}
                  onMouseLeave={() => setIsBuying(prev => ({ ...prev, [item.id]: false }))}
                  disabled={balance < item.price}
                  className="buy-btn"
                >
                  +
                </button>
                <button
                  className="delete-btn cart-delete-btn"
                  onClick={() => removeFromCart(item.id)}
                  title="Remove from cart"
                >
                  <i className="fa-solid fa-trash"></i>
                </button>
              </div>
            </div>
          );
        })
      )}
      {/* Sepet alt kısmı - Temizleme ve toplam */}
      <div className="cart-footer">
        <button 
          onClick={clearCart}
          className="clear-cart-btn"
          title="Clear Cart"
        >
          <i className="fa-solid fa-broom"></i>
        </button>
        <button 
          onClick={() => navigate('/cart')}
          className="route-cart-btn"
          title="Route Cart"
        >
          <i className="fa-solid fa-cart-shopping"></i>
        </button>
        <div className="cart-total">
          <strong>Total Spent:</strong> <span>{formatMoney(total)}</span>
        </div>
      </div>
    </div>
  );
};

export default Cart;