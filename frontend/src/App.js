import './Styles/App.css';
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
      <h1>
          Svetainė sukurta universiteto atsiskaitymui. Komandą sudaro:
        </h1>
        <ul className="team-list">
          <li>Paulius Černius</li>
          <li>Arminas Misevičius</li>
          <li>Lukas Kemfertas</li>
          <li>Nojus Sargevičius</li>
          <li>Mantas Rachmančiukas</li>
        </ul>
    </div>
  );
}

export default App;