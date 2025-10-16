import React from 'react';
import { useDispatch } from 'react-redux';
import { addItem } from '../features/cartSlice';

const products = [
  { name: 'Laptop', price: 1200 },
  { name: 'Mouse', price: 25 },
  { name: 'Keyboard', price: 45 },
   { name: 'phone', price: 1200 },
  { name: 'cpu', price: 2500 },
  { name: 'monitor', price: 4500 },
];

export default function ProductList() {
  const dispatch = useDispatch();

  return (
    <div>
      <h2>Products</h2>
      <div style={{ display: 'flex', gap: '1rem' }}>
        {products.map((p) => (
          <div key={p.name} style={{ border: '1px solid gray', padding: '10px', borderRadius: '8px' }}>
            <h3>{p.name}</h3>
            <p>${p.price}</p>
            <button onClick={() => dispatch(addItem(p))}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}
