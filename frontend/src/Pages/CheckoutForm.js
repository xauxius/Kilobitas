import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { useState } from 'react';

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe dar nėra pasiruošęs
      return;
    }

    const cardElement = elements.getElement(CardElement);

    // Patikriname, ar pavyksta gauti kortelės duomenis
    const { token, error } = await stripe.createToken(cardElement);

    if (error) {
      setError(error.message);
      return;
    }

    // Siunčiame kortelės duomenis į serverį
    const response = await fetch('/api/payments/create-payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: 1000,  // Suma centais
        currency: 'usd',
        payment_method: token.id,
      }),
    });

    const responseData = await response.json();

    // Sukuriamas mokėjimo intentas ir gaunamas kliento paslėptasis kodas
    const { clientSecret } = responseData;

    // Patvirtiname mokėjimą
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
      },
    });

    if (result.error) {
      // Mokėjimo klaida
      setError(result.error.message);
    } else {
      // Mokėjimas sėkmingas
      console.log(result.paymentIntent);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe}>
        Apmokėti
      </button>
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </form>
  );
};

export default CheckoutForm;
