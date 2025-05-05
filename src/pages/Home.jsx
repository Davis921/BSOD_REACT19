// Home.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Home = ({ token }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await axios.get('https://bsod-webapi.onrender.com/items');
        setItems(res.data);
      } catch (err) {
        console.error('Error fetching items:', err);
      }
    };
    fetchItems();
  }, []);

  const handleAddToCart = async (itemId) => {
    if (!token) return alert('Please log in to add to cart.');

    try {
      const res = await axios.post('https://bsod-webapi.onrender.com/cart', {
        itemId,
        quantity: 1
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log("Cart response:", res.data);
      alert('Item added to cart!');
    } catch (err) {
      console.error('Add to cart failed:', err);
    }
  };

  return (
    <div className="home" style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
      <h1 style={{ textAlign: 'center' }}>Available Items</h1>
      <div
        className="item-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          gap: '2rem',
          marginTop: '2rem'
        }}
      >
        {items.map(item => (
          <div key={item._id} className="item-card" style={{
            border: '1px solid #ddd',
            borderRadius: '8px',
            padding: '1rem',
            boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
            textAlign: 'center'
          }}>
            <img
              src={encodeURI(item.imageUrl)}
              alt={item.name}
              style={{
                width: '100%',
                height: '200px',
                objectFit: 'contain',
                marginBottom: '1rem'
              }}
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/200x200?text=No+Image';
              }}
            />
            <h3>{item.name}</h3>
            <p><strong>${item.price}</strong></p>
            <p>{item.description}</p>
            <button onClick={() => handleAddToCart(item._id)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
