// Cart.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Cart = ({ token }) => {
  const [cart, setCart] = useState({ items: [], total: 0 });

  const fetchCart = async () => {
    try {
      const res = await axios.get('https://bsod-webapi.onrender.com/cart', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCart(res.data);
    } catch (err) {
      console.error('Failed to fetch cart:', err);
    }
  };

  const updateQuantity = async (itemId, quantity) => {
    try {
      await axios.put('https://bsod-webapi.onrender.com/cart', { itemId, quantity }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchCart();
    } catch (err) {
      console.error('Failed to update item:', err);
    }
  };

  const clearCart = async () => {
    try {
      await axios.delete('https://bsod-webapi.onrender.com/cart', {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchCart();
    } catch (err) {
      console.error('Failed to clear cart:', err);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>
      {cart.items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul>
            {cart.items.map((item) => (
              <li key={item.itemId._id}>
                {item.itemId.name} - ${item.itemId.price} ×
                <input
                  type="number"
                  min="0"
                  value={item.quantity}
                  onChange={(e) => updateQuantity(item.itemId._id, parseInt(e.target.value))}
                />
              </li>
            ))}
          </ul>
          <p>Total: ${cart.total.toFixed(2)}</p>
          <button onClick={clearCart}>Clear Cart</button>
        </>
      )}
    </div>
  );
};

export default Cart;