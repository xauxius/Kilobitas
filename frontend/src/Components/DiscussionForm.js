import '../Pages/Styles/Discussions.css';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';


const DiscussionForm = ({ onSubmit }) => {
    const [formData, setFormData] = useState({
        Pavadinimas: '',
        Turinys: '',
        Kategorija: '',
        Kurėjo_vardas: '',
        Kurėjo_Pavardė: '',
        Sukurimo_data: new Date(),
    });
    const navigate = useNavigate();
    const handleBack = () => {
        navigate('/Diskusijos'); // This is the route you want to go back to
    };
    const hardcodedCategories = ['Be kategorijos', 'Sportas', 'Mokslas', 'Menai', 'Politika', 'Gamta', 'Kelionės', 'Maistas', 'Sveikata', 'Muzika'];


    const handleChange = (event) => {
        if (event.target.name === 'Pavadinimas' && event.target.value.length > 225) {
            alert('Pavadinimas negali buti ilgesnis nei 225 raidės.');
            return;
        }
        if (event.target.name === 'Kurėjo_vardas' || event.target.name === 'Kurėjo_Pavardė') {
            if (event.target.value.split(' ').length > 1) {
                alert('Vardas ir Pavardė turi buti iš vieno žodžio.');
                return;
            }
        }
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };




    const handleSubmit = async (event) =>
    {
        event.preventDefault();

        if (!formData.Pavadinimas.trim() || !formData.Turinys.trim() || !formData.Kurėjo_Pavardė.trim() || !formData.Kurėjo_vardas.trim()) {
            alert('Visi laukai turi buti užpildyti.');
            return;
        }

        const payload = {
            ...formData,
        };

        try {
            const response = await fetch('https://localhost:7259/PostDiscussion', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });
            if (response.ok) {
                alert('Discussion successfully added.');
                navigate('/Diskusijos');
            }
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            console.log('Success:', result);
            navigate('/Diskusijos');
            // Handle the successful submission, e.g., by resetting the form or redirecting the user
        } catch (error) {
            console.error('Error:', error);
            // Handle the error, e.g., by displaying a message to the user
        }

    };
    return (
        <div className="container2">
            <form id="newDiscussionForm" onSubmit={handleSubmit}>
                <div className="posts-table">
                    <button type="button" onClick={handleBack} className="search-box button">Atgal į Diskusijas</button>

                    <div className="table-head">
                        <div className="status">
                            <label htmlFor="pavadinimasInput">Pavadinimas:</label>
                            <input
                                type="text"
                                id="pavadinimasInput"
                                name="Pavadinimas"
                                value={formData.Pavadinimas}
                                onChange={handleChange}
                                className="input-style21"
                            />
                        </div>
                    </div>
                    <div className="table-row">
                        <div className="status">
                            <label htmlFor="turinysInput">Turinys:</label>
                            <textarea
                                id="turinysInput"
                                name="Turinys"
                                value={formData.Turinys}
                                onChange={handleChange}
                                className="input-style21"
                            />
                        </div>
                    </div>

                    <div className="status">
                        <label htmlFor="kategorijaInput">Kategorija:</label>
                        <select
                            id="kategorijaInput"
                            name="Kategorija"
                            value={formData.Kategorija}
                            onChange={handleChange}
                            className="input-style21"
                        >
                            {hardcodedCategories.map((category, index) => (
                                <option key={index} value={category}>{category}</option>
                            ))}
                        </select>
                    </div>
                    <div className="table-row">
                        <div className="status">
                            <label htmlFor="vardasInput">Kurėjo vardas:</label>
                            <input
                                type="text"
                                id="vardasInput"
                                name="Kurėjo_vardas"
                                value={formData.Kurėjo_vardas}
                                onChange={handleChange}
                                className="input-style21"
                            />
                        </div>
                        <div className="status">
                            <label htmlFor="pavardeInput">Kurėjo Pavardė:</label>
                            <input
                                type="text"
                                id="pavardeInput"
                                name="Kurėjo_Pavardė"
                                value={formData.Kurėjo_Pavardė}
                                onChange={handleChange}
                                className="input-style21"
                            />
                        </div>
                    </div>
                </div>
                <button type="submit" className="search-box button">Sukurti</button>
            </form>
        </div>
    );
};

export default DiscussionForm;
