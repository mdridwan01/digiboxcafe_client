import React, { useEffect, useState } from 'react'
import SingleCard from './SingleCard';
import BuyModal from './BuyModal';
import { Box } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import axios from 'axios';
 const API_URL = "http://localhost:5000";

export default function ProductCard() {
    const [products, setProducts] = useState([]);
   
               useEffect(() => {
                axios.patch(`${API_URL}/api/vending/68d2580ac503c5f97e895c53`, {
                            onKey: null
                          }).then(() => {
                          //  console.log("PATCH successful");
                          }).catch((err) => {
                            //console.error("PATCH error", err);
                          });
  }, []);

  useEffect(() => {
    fetch(`${API_URL}/api/products`) 
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error loading data:', error));
  }, []);

   const [selectedProduct, setSelectedProduct] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
  
    const handleBuyClick = (products) => {
      setSelectedProduct(products);
      setModalOpen(true);
    };
  
    const handleCloseModal = () => {
      setModalOpen(false);
      setSelectedProduct(null);
    };
  
  return (
    <>
     <ToastContainer position="top-center" />
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 py-5">
      {/* <BuyModal /> */}
      {products.map(product => (
        <SingleCard  key={product.id} products={product} onBuyClick={handleBuyClick}/>
        
      ))}
     
        </div>
        <BuyModal
                open={modalOpen}
                onClose={handleCloseModal}
                product={selectedProduct}
              />
        
    </>
  )
}
