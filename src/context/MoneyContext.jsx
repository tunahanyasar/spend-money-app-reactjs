import { createContext, useContext, useState } from 'react';

// Context oluşturuyoruz
const MoneyContext = createContext();

// Context hook'u - diğer bileşenlerde kullanmak için
export const useMoney = () => useContext(MoneyContext);

// Context Provider bileşeni - uygulama genelinde state yönetimi sağlıyor
export const MoneyProvider = ({ children }) => {
  // Başlangıç bakiyesi: 100 milyar dolar
  const [balance, setBalance] = useState(100000000000);
  // Sepet state'i - ürünleri ve miktarlarını tutuyor
  const [cart, setCart] = useState([]);

  // Ürün satın alma fonksiyonu
  const buyItem = (item) => {
    // Bakiye kontrolü
    if (balance >= item.price) {
      // Sepette ürün var mı kontrolü
      const existingItem = cart.find((cartItem) => cartItem.id === item.id);
      
      if (existingItem) {
        // Varsa miktarını artır
        setCart(cart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        ));
      } else {
        // Yoksa yeni ürün ekle
        setCart([...cart, { ...item, quantity: 1 }]);
      }
      
      // Bakiyeyi güncelle
      setBalance(balance - item.price);
    }
  };

  // Ürün satma fonksiyonu
  const sellItem = (itemId) => {
    // Sepette ürünü bul
    const item = cart.find((cartItem) => cartItem.id === itemId);
    if (item) {
      if (item.quantity === 1) {
        // Son ürünse sepetten kaldır
        setCart(cart.filter((cartItem) => cartItem.id !== itemId));
      } else {
        // Değilse miktarını azalt
        setCart(cart.map((cartItem) =>
          cartItem.id === itemId
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        ));
      }
      // Bakiyeyi güncelle
      setBalance(balance + item.price);
    }
  };

  // Para formatı fonksiyonu - sayıları dolar formatına çeviriyor
  const formatMoney = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Sepetten ürün silme fonksiyonu
  const removeFromCart = (itemId) => {
    // Ürünü bul ve bakiyeyi güncelle
    const item = cart.find((cartItem) => cartItem.id === itemId);
    if (item) {
      setBalance(balance + (item.price * item.quantity));
    }
    // Ürünü sepetten kaldır
    setCart(cart.filter((cartItem) => cartItem.id !== itemId));
  };

  // Sepeti temizleme fonksiyonu
  const clearCart = () => {
    // Sepetteki tüm ürünlerin toplam değerini hesapla
    const totalValue = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    // Bakiyeyi güncelle
    setBalance(balance + totalValue);
    // Sepeti boşalt
    setCart([]);
  };

  // Context değerlerini tanımlıyoruz
  const value = {
    balance,
    cart,
    buyItem,
    sellItem,
    removeFromCart,
    clearCart,
    formatMoney
  };

  // Provider'ı render et
  return (
    <MoneyContext.Provider value={value}>
      {children}
    </MoneyContext.Provider>
  );
}; 