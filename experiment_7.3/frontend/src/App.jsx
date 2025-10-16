import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5000/api/products')
      .then(res => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <h2>Loading...</h2>;

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Product List</h1>
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
        {products.map((p) => (
          <div key={p.name} style={{ border: '1px solid gray', padding: '10px', borderRadius: '8px' }}>
            <h3>{p.name}</h3>
            <p>Price: ${p.price}</p>
            <button>Buy Now</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
