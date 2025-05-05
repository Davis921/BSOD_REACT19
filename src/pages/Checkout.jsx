// Checkout.jsx
import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Checkout = ({ token }) => {
  const navigate = useNavigate();

  const handleCheckout = async () => {
    try {
      const res = await axios.post('https://bsod-webapi.onrender.com/checkout', {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Order placed successfully!');
      navigate('/');
    } catch (err) {
      console.error('Checkout failed:', err);
      alert('Failed to complete checkout.');
    }
  };

  return (
    <div className="checkout-page">
      <h2>Ready to checkout?</h2>
      <button onClick={handleCheckout}>Place Order</button>
    </div>
  );
};

export default Checkout;
