import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ProductCard from './ProductCard';
import { products } from '../data/products';

// Ürün listesi bileşeni - Ürünleri sayfalı şekilde gösteriyor
const ProductList = () => {
  // URL'den sayfa numarasını alıyoruz
  const { page } = useParams();
  const navigate = useNavigate();
  const productsPerPage = 12;
  const currentPage = parseInt(page) || 1;
  
  // Ürünleri fiyata göre sıralıyoruz
  const sortedProducts = [...products].sort((a, b) => a.price - b.price);
  
  // Sayfalama hesaplamaları
  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = sortedProducts.slice(startIndex, endIndex);

  // Önceki sayfaya gitme fonksiyonu
  const handlePrevious = () => {
    if (currentPage > 1) {
      navigate(`/products/${currentPage - 1}`);
    }
  };

  // Sonraki sayfaya gitme fonksiyonu
  const handleNext = () => {
    if (currentPage < totalPages) {
      navigate(`/products/${currentPage + 1}`);
    }
  };

  return (
    <div className="product-list-container">
      {/* Ürün listesi */}
      <div className="product-list">
        {currentProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      {/* Sayfalama kontrolleri */}
      {totalPages > 1 && (
        <div className="pagination">
          <button
            onClick={handlePrevious}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span>Page {currentPage} of {totalPages}</span>
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductList; 