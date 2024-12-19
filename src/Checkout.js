import React, { useState } from 'react';
import { supabase } from './supabaseClient';

const Checkout = ({ product }) => {
  const [status, setStatus] = useState('');

  const handleCheckout = async () => {
    const user = supabase.auth.user();
    if (!user) {
      alert('Please log in to checkout.');
      return;
    }

    const { data, error } = await supabase
      .from('orders')
      .insert({
        buyer_id: user.id,
        product_id: product.id,
      });

    if (error) {
      console.error('Error during checkout:', error);
    } else {
      setStatus('Order placed successfully!');
    }
  };

  return (
    <div>
      <button onClick={handleCheckout}>Checkout</button>
      {status && <p>{status}</p>}
    </div>
  );
};

export default Checkout;
