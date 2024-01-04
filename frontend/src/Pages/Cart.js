import React, { useEffect, useState } from 'react';
import cartClient from '../Services/cartService';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
import emailjs from 'emailjs-com';


const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    fetchCart();
  }, []);

  useEffect(() => {

    calculateTotalAmount();
  }, [cartItems]);

  const fetchCart = async () => {
    try {
     
      const userId = localStorage.getItem('naudotojas');


      const response = await cartClient.getCart(userId);
      
  
      setCartItems(response.data);
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };
  const sendEmail = async () => {
    const templateParams = {
      reply_to: 'dainius.misevicius1@gmail.com', // Replace with the email you want to use as a reply-to address
    };

    emailjs.send('service_azvzab5', 'template_6nbui8p', templateParams, 'tN3zOSO4cGsmX8opt')
    .then(function(response) {
       console.log('SUCCESS!', response.status, response.text);
    }, function(error) {
       console.log('FAILED...', error);
    });
  };

  const updateCart = async (id, item) => {
    try {
      await cartClient.updateCart(id, item);
      fetchCart(); 
    } catch (error) {
      console.error('Error updating cart:', error);
    }
  };

  const calculateTotalAmount = () => {
    const total = cartItems.reduce((acc, item) => acc + item.kiekis * item.kaina, 0);
    setTotalAmount(total);
  };

  const handleIncreaseQuantity = async (itemId) => {
    const updatedCartItems = cartItems.map((item) =>
      item.id === itemId ? { ...item, kiekis: item.kiekis + 1 } : item
    );
    setCartItems(updatedCartItems);

    const itemToUpdate = updatedCartItems.find((item) => item.id === itemId);
    if (itemToUpdate) {
      await updateCart(itemId, { kiekis: itemToUpdate.kiekis });
    }
  };

  const handleDecreaseQuantity = async (itemId) => {
    const updatedCartItems = cartItems.map((item) =>
      item.id === itemId && item.kiekis > 1 ? { ...item, kiekis: item.kiekis - 1 } : item
    );
    setCartItems(updatedCartItems);

    const itemToUpdate = updatedCartItems.find((item) => item.id === itemId);
    if (itemToUpdate) {
      await updateCart(itemId, { kiekis: itemToUpdate.kiekis });
    }
  };

  const handleRemoveItem = async (itemId) => {
    try {
      await cartClient.deleteCart(itemId);
      fetchCart();
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  const handleCheckout = async () => {
    try {
      const mokejimasData = {
        items: cartItems.map((item) => ({
          preke_id: item.id,
          vartotojo_id: item.vartotojo_id,
          kiekis: item.kiekis,
          pavadinimas: item.pavadinimas,
          kaina: item.kaina,
          
        })),
      };
  
      const insertedMokejimas = await cartClient.insertMokejimas(cartItems);
      await cartClient.deleteAllCart(cartItems[0].vartotojo_id);
      sendEmail();
      fetchCart();
      const form = document.getElementById('checkoutForm');
      form.submit()
    } catch (error) {
      console.error('Error during checkout:', error);
      alert("Įvyko klaida apmokant užsakymą. Bandykite dar kartą.");
    }
  };
  
  return (
    <div className="container mt-4">
      <Link to="/">
                  Gryžti į pradžia
            </Link>
      <h2>Prekių krepšelis</h2>
      {cartItems.length === 0 ? (
        <p>Jūsų prekių krepšelis tuščias</p>
        
      ) : (
        <div>
          <ul className="list-group">
            {cartItems.map((item) => (
              <li key={item.id} className="list-group-item">
                <div className="row">
                  <div className="col-6 d-flex align-items-center">
                    <div>{item.pavadinimas}</div>
                  </div>
                  <div className="col-3 d-flex align-items-center">
                    <div className="input-group">
                      <button className="btn btn-outline-secondary" type="button" onClick={() => handleDecreaseQuantity(item.id)}>
                        -
                      </button>
                      <span className="input-group-text">{item.kiekis}</span>
                      <button className="btn btn-outline-secondary" type="button" onClick={() => handleIncreaseQuantity(item.id)}>
                        +
                      </button>
                    </div>
                  </div>
                  <div className="col-3 d-flex align-items-center justify-content-end">
                    <div className="mr-3">{item.kaina}</div>
                    <button className="btn btn-danger mx-3" onClick={() => handleRemoveItem(item.id)}>
                      Ištrinti
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-3">
            <strong>Bendra suma: {totalAmount.toFixed(2)} Eur</strong>
          </div>
          <form id="checkoutForm" action="/create-checkout-session" method="POST">
            <button type="button" className="btn btn-primary mt-3" onClick={handleCheckout}>
          Apmokėti
        </button>
      </form>
        </div>
      )}
    </div>
  );
};

export default Cart;
