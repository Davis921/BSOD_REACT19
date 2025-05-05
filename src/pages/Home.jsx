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
      await axios.post('https://bsod-webapi.onrender.com/cart', {
        itemId,
        quantity: 1
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Item added to cart!');
    } catch (err) {
      console.error('Add to cart failed:', err);
    }
  };

  return (
    <div className="home">
      <h1>Available Items</h1>
      <div className="item-grid">
        {items.map(item => (
          <div key={item._id} className="item-card">
            <img
              src={encodeURI(item.imageUrl)}
              alt={item.name}
              style={{
                width: '100%',
                maxWidth: '300px',
                height: 'auto',
                objectFit: 'contain',
                display: 'block',
                margin: '0 auto'
              }}              
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/200x200?text=No+Image';
              }}
            />
            <h3>{item.name}</h3>
            <p>${item.price}</p>
            <p>{item.description}</p>
            <button onClick={() => handleAddToCart(item._id)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
