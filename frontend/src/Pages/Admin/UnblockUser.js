import React, { useState, useEffect } from 'react';
import naudotojasClient from '../../Services/naudotojasService';
import styles from './Funkcijos.module.css';

const NaudotojasTable = () => {
  const [naudotojai, setNaudotojai] = useState([]);

  useEffect(() => {
    const fetchNaudotojai = async () => {
      try {
        const response = await naudotojasClient.getNaudotojai();
        setNaudotojai(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchNaudotojai();
  }, []);

  const handleUpdateBlockedStatus = async (id, blocked) => {
    try {
      // Fetch the existing user data
      const existingUserData = naudotojai.find((naudotojas) => naudotojas.id === id);
  
      // Create a new Naudotojas object with the updated userType
      const updatedNaudotojas = { ...existingUserData, blocked };
  
      console.log('Updating userType:', blocked);
      console.log('Updated Naudotojas:', updatedNaudotojas);
  
      await naudotojasClient.updateNaudotojas(id, updatedNaudotojas);
  
      // Fetch the updated data again
      const response = await naudotojasClient.getNaudotojai();
      setNaudotojai(response.data);
  
      // Rest of the code...
    } catch (error) {
      console.error('Error updating blocked:', error);
    }
  };

  return (
    <div>
      <table className={styles.table}>
      <caption className={styles.caption}>Užblokuoti sistemos vartotojai</caption>
        <thead>
          <tr>
            <th className={styles.th}>Slapyvardis</th>
            <th className={styles.th}>El. paštas</th>
            <th className={styles.th}>Vardas</th>
            <th className={styles.th}>Pavardė</th>
            <th className={styles.th}>Tel. nr</th>
            <th className={styles.th}>Gimimo data</th>
            <th className={styles.th}>Vartotojo tipas</th>
            <th className={styles.th}></th>
          </tr>
        </thead>
        <tbody>
          {naudotojai.map((naudotojas) => (
            naudotojas.blocked === "true" && (
              <tr key={naudotojas.id}>
                <td className={styles.td}>{naudotojas.username}</td>
                <td className={styles.td}>{naudotojas.email}</td>
                <td className={styles.td}>{naudotojas.name}</td>
                <td className={styles.td}>{naudotojas.lastname}</td>
                <td className={styles.td}>{naudotojas.phone}</td>
                <td className={styles.td}>{naudotojas.birthDate}</td>
                <td className={styles.td}>{naudotojas.userType}</td>
                <td className={styles.td}>
                  <button 
                  className={styles.button}
                  onClick={() => handleUpdateBlockedStatus(naudotojas.id, 'false')}>
                    Atblokuoti
                  </button>
                </td>
              </tr>
            )
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default NaudotojasTable;
