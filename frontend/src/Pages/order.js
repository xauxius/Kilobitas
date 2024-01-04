import React, { useState, useEffect } from 'react';
import baseClient from '../Services/cartService';
import itemClient from '../Services/itemsService';

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [prekes, setPrekes] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await baseClient.getMokejimas(localStorage.getItem('naudotojas'));
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    const fetchPrekes = async () => {
      try {
        // Assuming getPrekes is a function in your itemClient service
        const prekesResponse = await itemClient.getItems();
        setPrekes(prekesResponse.data);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    fetchOrders();
    fetchPrekes();
  }, []); // The empty dependency array ensures the effect runs only once, similar to componentDidMount

  const handleCancelOrder = async (id) => {
    try {
      await baseClient.cancelOrder(id);
      setOrders((prevOrders) => prevOrders.filter((order) => order.Id !== id));
    } catch (error) {
      console.error('Error canceling order:', error);
    }
  };

  return (
    <div>
      <h2>Užsakymai</h2>
      {orders.length === 0 ? (
        <p>Nėra užsakymų</p>
      ) : (
        <ul>
          {orders.map((order) => (
            <li key={order.Id}>
              <div>Suma: {order.suma}</div>
              <div>Pirktos Prekės:</div>
              {order.pirktosPrekes.map((prekeId) => {
                const prekeDetails = prekes.find((preke) => preke.id === prekeId);
                return prekeDetails ? (
                  <div key={prekeId}>{prekeDetails.pavadinimas}</div>
                ) : (
                  <div key={prekeId}>Prekė nerasta</div>
                );
              })}
              <button onClick={() => handleCancelOrder(order.Id)}>Atšaukti užsakymą</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OrderList;
