import './Styles/App.css';
import NavigationBar from './Components/NavigationBar';
import React, { useEffect } from 'react';


function App() {
  useEffect(() => {
    // Get the current URL
    const currentUrl = window.location.href;

    // Check if the URL contains 'success=true'
    if (currentUrl.includes('success=true')) {
      // Show an alert
      alert('Mokėjimas sėkmingas');
    }
    if (currentUrl.includes('success=fale')) {
      // Show an alert
      alert('Mokėjimas nesėkmingas');
    }
    if (currentUrl.includes('canceled=true')) {
      // Show an alert
      alert('Mokėjimas buvo atšauktas');
    }
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <NavigationBar />
      </header>
    </div>
  );
}

export default App;