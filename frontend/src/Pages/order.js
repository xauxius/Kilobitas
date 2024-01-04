import React, { useState, useEffect } from 'react';
import baseClient from '../Services/cartService';
import itemClient from '../Services/itemsService';
import { Card, Button, Modal } from 'react-bootstrap';

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [prekes, setPrekes] = useState([]);
  const [selectedPrekeDetails, setSelectedPrekeDetails] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = new Date(dateString).toLocaleDateString('lt-LT', options);
    return formattedDate;
  };

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
        const prekesResponse = await itemClient.getItems();
        setPrekes(prekesResponse.data);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    fetchOrders();
    fetchPrekes();
  }, []);

  const handleCancelOrder = async (id, busena) => {
    if (!busena) {
      // Display a message or handle the case where cancellation is not allowed
      alert('Užsakymo atšaukimas negalimas, kreipkitės į administratorių');
      return;
    }
    const shouldCloseModal = window.confirm('Ar tkrai norite at6aukti?');
    
    if (shouldCloseModal) {
      
      setShowModal(false);
      setSelectedPrekeDetails(null);
      await baseClient.deleteMokejimas(id);
    }
  };

  const handleCardClick = (orderId, prekeId) => {
    const prekeDetails = prekes.find((preke) => preke.id === prekeId);

    // Set the details of the selected item
    setSelectedPrekeDetails(prekeDetails);

    // Show the modal
    setShowModal(true);
  };

  const handleCloseModal = () => {
    // Close the modal
    setShowModal(false);

    // Clear the selected item details
    setSelectedPrekeDetails(null);
  };

  return (
    <div>
      <h2>Užsakymai</h2>
      {orders.length === 0 ? (
        <p>Nėra užsakymų</p>
      ) : (
        <div>
          {orders.map((order) => (
            <Card key={order.id} style={{ marginBottom: '10px' }}>
              <Card.Body>
                <Card.Title>Užsakymo data: {formatDate(order.data)}</Card.Title>
                <Card.Text>
                  <div>Suma: {order.suma}</div>
                  <div>Pirktos Prekės:</div>
                  {order.pirktosPrekes.map((prekeId) => (
                    <div key={prekeId} onClick={() => handleCardClick(order.id, prekeId)}>
                      {prekes.find((preke) => preke.id === prekeId)?.pavadinimas || 'Prekė nerasta'}
                    </div>
                  ))}
                </Card.Text>
                <Button variant="danger" onClick={() => handleCancelOrder(order.id, order.busena)}>
                  Atšaukti užsakymą
                </Button>
              </Card.Body>
            </Card>
          ))}
        </div>
      )}

      {/* Modal for displaying additional information about the selected item */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Prekės informacija</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedPrekeDetails ? (
            <div>
              <p>Pavadinimas: {selectedPrekeDetails.pavadinimas}</p>
              <p>Kaina: {selectedPrekeDetails.kaina}</p>
              <p>Aprašymas: {selectedPrekeDetails.aprasymas}</p>

            </div>
          ) : (
            <p>Nepavyko gauti informacijos apie prekę.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Uždaryti
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default OrderList;
