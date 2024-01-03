import React, { useEffect, useState } from 'react';
import cartClient from '../Services/cartService';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    // Fetch cart items when the component mounts
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      // Assuming you have a user ID, replace 'userId' with the actual user ID
      const userId = '16298cb0-a1c4-4c67-bcaa-417722bdfb33';

      // Fetch cart items using the getCart method from cartClient
      const response = await cartClient.getCart(userId);

      // Assuming the response data is an array of cart items
      setCartItems(response.data);
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  const updateCart = async (id, item) => {
    try {
      await cartClient.updateCart(id, item);
      fetchCart(); // Refresh the cart after updating
    } catch (error) {
      console.error('Error updating cart:', error);
    }
  };

  const handleIncreaseQuantity = async (itemId) => {
    const updatedCartItems = cartItems.map((item) =>
      item.id === itemId ? { ...item, kiekis: item.kiekis + 1 } : item
    );
    setCartItems(updatedCartItems);

    // Assuming item object contains the necessary data for updating the quantity
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

    // Assuming item object contains the necessary data for updating the quantity
    const itemToUpdate = updatedCartItems.find((item) => item.id === itemId);
    if (itemToUpdate) {
      await updateCart(itemId, { kiekis: itemToUpdate.kiekis });
    }
  };

  const handleRemoveItem = (itemId) => {
    // Logic to remove the item from the cart
    // Update the state or make a request to the server if needed
  };

  const handleCheckout = () => {
    // Logic for the checkout process
    // Redirect to the payment page or perform any necessary actions
  };

  return (
    <div>
      <h2>Prekių krepšelis</h2>
      {cartItems.length === 0 ? (
        <p>Jūsų prekių krepšelis tuščias</p>
      ) : (
        <div>
          <ul style={styles.cartList}>
            {cartItems.map((item) => (
              <li key={item.id} style={styles.cartItem}>
                <div style={styles.itemName}>{item.pavadinimas}</div>
                <div style={styles.itemQuantity}>
                  <button onClick={() => handleDecreaseQuantity(item.id)}>-</button>
                  {item.kiekis}
                  <button onClick={() => handleIncreaseQuantity(item.id)}>+</button>
                </div>
                <div style={styles.itemPrice}>{item.kaina}</div>
                <button style={styles.removeButton} onClick={() => handleRemoveItem(item.id)}>
                  Ištrinti
                </button>
              </li>
            ))}
          </ul>
          <button onClick={handleCheckout}>Apmokėti</button>
        </div>
      )}
    </div>
  );
};

const styles = {
  cartList: {
    listStyle: 'none',
    padding: 0,
  },
  cartItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid #ccc',
    marginBottom: '10px',
    paddingBottom: '10px',
  },
  itemName: {
    flex: 2,
  },
  itemQuantity: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemPrice: {
    flex: 1,
  },
  removeButton: {
    backgroundColor: '#ff4d4d',
    color: 'white',
    padding: '8px',
    border: 'none',
    cursor: 'pointer',
  },
};

export default Cart;
