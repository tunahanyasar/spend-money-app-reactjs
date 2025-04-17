// Cart bileşenini içe aktarıyoruz
import Cart from '../components/Cart';

// Sepet sayfası bileşeni - Sepet içeriğini tam sayfa olarak gösteriyor
const CartPage = () => {
  return (
    // Sepet içeriğini ortalanmış bir container içinde gösteriyoruz
    <div style={{
      maxWidth: 500,
      width: '100%',
      marginLeft: '500px',
      marginBottom: '50px',
      background: '#f5f5f5',
      minHeight: '100vh'
    }}>
        <Cart />
    </div>
  );
};

export default CartPage;