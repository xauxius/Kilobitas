import React, { useState, useEffect } from 'react';
import naudotojasClient from '../../Services/naudotojasService';
import styles from './Funkcijos.module.css';

const NaudotojasTable = () => {
  const [naudotojai, setNaudotojai] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);

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


  const handleCheckboxChange = (id) => {
    // Toggle the selected status of the user with the given id
    setSelectedIds((prevSelectedIds) =>
      prevSelectedIds.includes(id)
        ? prevSelectedIds.filter((selectedId) => selectedId !== id)
        : [...prevSelectedIds, id]
    );
  };
  
  const handleUpdateBlockedStatus = async () => {
    try {
      // Update the blocked status for all selected users
      await Promise.all(
        selectedIds.map(async (id) => {
          const existingUserData = naudotojai.find((naudotojas) => naudotojas.id === id);
          const updatedNaudotojas = { ...existingUserData, blocked: 'true' };
          await naudotojasClient.updateNaudotojas(id, updatedNaudotojas);
        })
      );
  
      // Fetch the updated data again
      const response = await naudotojasClient.getNaudotojai();
      setNaudotojai(response.data);

      // Clear the selectedIds array
      setSelectedIds([]);
    } catch (error) {
      console.error('Error updating blocked:', error);
    }
  };

  return (
    <div>
      <table className={styles.table}>
      <caption className={styles.caption}>Neužblokuoti sistemos vartotojai</caption>
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
            naudotojas.blocked === "false" && (
              <tr key={naudotojas.id}>
                <td className={styles.td}>{naudotojas.username}</td>
                <td className={styles.td}>{naudotojas.email}</td>
                <td className={styles.td}>{naudotojas.name}</td>
                <td className={styles.td}>{naudotojas.lastname}</td>
                <td className={styles.td}>{naudotojas.phone}</td>
                <td className={styles.td}>{naudotojas.birthDate}</td>
                <td className={styles.td}>{naudotojas.userType}</td>
                <td className={styles.td}>
                <input
                    type="checkbox"
                    checked={selectedIds.includes(naudotojas.id)}
                    onChange={() => handleCheckboxChange(naudotojas.id)}
                  />
                </td>
              </tr>
            )
          ))}
        </tbody>
      </table>
      <div style={{ textAlign: 'center' }}>
      <button 
      className={styles.button}
      onClick={handleUpdateBlockedStatus}>Užblokuoti</button>
      </div>
    </div>
  );
};

export default NaudotojasTable;
