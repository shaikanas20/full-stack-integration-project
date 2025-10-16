import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from '../features/cartSlice';

export default function Cart() {
  const items = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  return (
    <div>
      <h2>Shopping Cart</h2>
      {items.length === 0 ? (
        <p>No items in cart</p>
      ) : (
        items.map((item) => (
          <div key={item.name}>
            {item.name} (${item.price}) 
            <input
              type="number"
              min="1"
              value={item.quantity}
              onChange={(e) =>
                dispatch(updateQuantity({ name: item.name, quantity: Number(e.target.value) }))
              }
            />
            <button onClick={() => dispatch(removeItem(item.name))}>Remove</button>
          </div>
        ))
      )}
    </div>
  );
}
