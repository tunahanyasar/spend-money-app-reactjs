import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-content">
        <div className="project-description">
          <h2>Proje Hakkında</h2>
          <ul>
            <li>Bu uygulama, sanal bir serveti harcamanıza olanak tanıyan interaktif bir simülasyondur.</li>
            <li>Yüksek bir başlangıç bakiyesi ile alışverişe başlayabilirsiniz.</li>
            <li>Çeşitli ürünleri sepetinize ekleyebilir veya çıkarabilirsiniz.</li>
            <li>Ürünleri tek tek veya hızlı bir şekilde toplu olarak alabilirsiniz.</li>
            <li>Sepetinizdeki ürünleri yönetebilir ve toplam harcamanızı görebilirsiniz.</li>
            <li>Sepetinizdeki her bir <b>ürünün ismine</b> tıklayarak ürüne yönlendirilebilirsiniz.</li>
            <li>Ürün ekleme çıkarma işlemleri sepete eklenmiş bir ürün üzerinden direkt <b>sepet içerisinden</b> de yapılabilir. </li>
          </ul>
          <Link to="/products/1" className="start-button">
            Harcamaya Başla
          </Link>
        </div>
        
        <div className="usage-guide">
          <h2>Sayfa Kullanımı</h2>
          <div className="guide-item">
            <div className="guide-icon">
              <i className="fa-solid fa-cart-plus"></i>
            </div>
            <div className="guide-text">
              <h3>Ürün Ekleme</h3>
              <p>Ürün kartındaki "+" butonuna tıklayarak veya ürün miktarını manuel olarak girerek sepete ürün ekleyebilirsiniz.</p>
            </div>
          </div>
          
          <div className="guide-item">
            <div className="guide-icon">
              <i className="fa-solid fa-plus"></i>
            </div>
            <div className="guide-text">
              <h3>Hızlı Ekleme</h3>
              <p>"+" butonunu basılı tutarak ürünü hızlıca sepete ekleyebilirsiniz. Bakiye yetersiz olduğunda otomatik olarak durur.</p>
            </div>
          </div>
          
          <div className="guide-item">
            <div className="guide-icon">
              <i className="fa-solid fa-cart-arrow-down"></i>
            </div>
            <div className="guide-text">
              <h3>Ürün Çıkarma</h3>
              <p>Ürün kartındaki "-" butonuna tıklayarak veya ürün miktarını azaltarak sepetten ürün çıkarabilirsiniz.</p>
            </div>
          </div>
          
          <div className="guide-item">
            <div className="guide-icon">
              <i className="fa-solid fa-minus"></i>
            </div>
            <div className="guide-text">
              <h3>Hızlı Çıkarma</h3>
              <p>"-" butonunu basılı tutarak ürünü hızlıca sepetten çıkarabilirsiniz. Ürün miktarı sıfır olduğunda otomatik olarak durur.</p>
            </div>
          </div>
          
          <div className="guide-item">
            <div className="guide-icon">
              <i className="fa-solid fa-broom"></i>
            </div>
            <div className="guide-text">
              <h3>Sepeti Temizleme</h3>
              <p>Sepet bölümündeki süpürge ikonuna tıklayarak tüm sepeti temizleyebilirsiniz.</p>
            </div>
          </div>
          
          <div className="guide-item">
            <div className="guide-icon">
              <i className="fa-solid fa-cart-shopping"></i>
            </div>
            <div className="guide-text">
              <h3>Sepete Git</h3>
              <p>Sepet ikonuna tıklayarak sepet sayfasına gidebilirsiniz.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home; 