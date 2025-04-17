import { Link } from 'react-router-dom';
import { useMoney } from '../context/MoneyContext';

// Header bileşeni - Uygulama başlığı ve navigasyon menüsünü içeriyor
const Header = () => {
  // Context'ten bakiye ve para formatı fonksiyonunu alıyoruz
  const { balance, formatMoney } = useMoney();

  return (
    <div className="header">
      {/* Sol kısım - Logo ve başlık */}
      <div className="header-left">
        <img src="/src/assets/money-logo.png" alt="Money Logo" className="header-logo" />
        <h1 className="header-title">Spend Bill Gates' Money</h1>
      </div>
      {/* Orta kısım - Bakiye gösterimi */}
      <div className="money-display">
        {formatMoney(balance)}
      </div>
      {/* Sağ kısım - Navigasyon menüsü */}
      <nav className="nav-links">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/products/1" className="nav-link">Products</Link>
        <Link to="/cart" className="nav-link">Cart</Link>
      </nav>
    </div>
  );
};

export default Header; 