import { useMoney } from '../context/MoneyContext';
import { useState, useEffect } from 'react';

// Ürün kartı bileşeni - Her bir ürünü gösteriyor ve alım-satım işlemlerini yönetiyor
const ProductCard = ({ product }) => {
  // Context'ten gerekli state ve fonksiyonları alıyoruz
  const { balance, cart, buyItem, sellItem, formatMoney } = useMoney();
  const cartItem = cart.find(item => item.id === product.id);
  // Input ve alım-satım durumlarını yöneten state'ler
  const [inputValue, setInputValue] = useState('0');
  const [isBuying, setIsBuying] = useState(false);
  const [isSelling, setIsSelling] = useState(false);

  // Alım-satım işlemlerini yöneten effect
  useEffect(() => {
    let buyTimer;
    let sellTimer;

    // Alım işlemi kontrolü
    if (isBuying && balance >= product.price) {
      buyItem(product); // İlk alım
      buyTimer = setInterval(() => {
        if (balance >= product.price) {
          buyItem(product);
        } else {
          setIsBuying(false);
        }
      }, 300); // Daha yavaş interval - her 300ms'de bir ürün alınacak
    }

    // Satım işlemi kontrolü
    if (isSelling && cartItem && cartItem.quantity > 0) {
      sellItem(product.id); // İlk satış
      sellTimer = setInterval(() => {
        if (cartItem && cartItem.quantity > 0) {
          sellItem(product.id);
        } else {
          setIsSelling(false);
        }
      }, 300); // Daha yavaş interval - her 300ms'de bir ürün satılacak
    }

    // Cleanup: interval'ları temizliyoruz
    return () => {
      if (buyTimer) clearInterval(buyTimer);
      if (sellTimer) clearInterval(sellTimer);
    };
  }, [isBuying, isSelling, balance, cartItem, product, buyItem, sellItem]);

  // Miktar değişikliğini yöneten fonksiyon
  const handleQuantityChange = (e) => {
    const value = e.target.value;
    // Sadece sayı girişine izin veriyoruz
    if (value === '' || /^\d+$/.test(value)) {
      setInputValue(value);
      const newQuantity = parseInt(value) || 0;
      const currentQuantity = cartItem ? cartItem.quantity : 0;
      
      // Yeni miktar mevcut miktardan fazlaysa alım yapıyoruz
      if (newQuantity > currentQuantity) {
        const toBuy = newQuantity - currentQuantity;
        const totalCost = toBuy * product.price;
        if (balance >= totalCost) {
          for (let i = 0; i < toBuy; i++) {
            buyItem(product);
          }
        }
      } 
      // Yeni miktar mevcut miktardan azsa satış yapıyoruz
      else if (newQuantity < currentQuantity) {
        const toSell = currentQuantity - newQuantity;
        for (let i = 0; i < toSell; i++) {
          sellItem(product.id);
        }
      }
    }
  };

  // Dışarıdan miktar değiştiğinde input değerini güncelliyoruz
  const quantity = cartItem ? cartItem.quantity : 0;
  if (quantity.toString() !== inputValue) {
    setInputValue(quantity.toString());
  }

  return (
    <div id={`product-${product.id}`} className="product-card">
      {/* Ürün görseli */}
      <img 
        src={`/src/assets/images/${product.image}`} 
        alt={product.name}
        className="product-image"
      />
      {/* Ürün bilgileri */}
      <h3>{product.name}</h3>
      <p className="price">{formatMoney(product.price)}</p>
      {/* Alım-satım kontrolleri */}
      <div className="actions">
        {/* Satış butonları */}
        <button
          onMouseDown={() => setIsSelling(true)}
          onMouseUp={() => setIsSelling(false)}
          onMouseLeave={() => setIsSelling(false)}
          disabled={quantity === 0}
          className="sell-btn"
        >
          -
        </button>
        <button
          onClick={() => sellItem(product.id)}
          disabled={quantity === 0}
          className="sell-btn cart-action-btn"
          title="Remove one from cart"
        >
          <i className="fa-solid fa-cart-arrow-down"></i>
        </button>
        {/* Miktar girişi */}
        <input
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          value={inputValue}
          onChange={handleQuantityChange}
          className="quantity-input"
        />
        {/* Alım butonları */}
        <button
          onClick={() => buyItem(product)}
          disabled={balance < product.price}
          className="buy-btn cart-action-btn"
          title="Add one to cart"
        >
          <i className="fa-solid fa-cart-plus"></i>
        </button>
        <button
          onMouseDown={() => setIsBuying(true)}
          onMouseUp={() => setIsBuying(false)}
          onMouseLeave={() => setIsBuying(false)}
          disabled={balance < product.price}
          className="buy-btn"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default ProductCard; 