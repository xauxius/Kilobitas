import '../Pages/Styles/Discussions.css';
import React, { useState, useEffect } from 'react';
import { searchTags, createTag } from '../Services/tagService';


const DiscussionForm = ({ onSubmit }) => {
    const [formData, setFormData] = useState({
        Pavadinimas: '',
        Turinys: '',
        Kategorija: '',
        Kurėjo_vardas: '',
        Kurėjo_Pavardė: '',
        Sukurimo_data: new Date(),
        TagIds: []
    });

    const [tags, setTags] = useState([]);
    const [suggestedTags, setSuggestedTags] = useState([]);
    const hardcodedCategories = ['Technologijos', 'Sportas', 'Mokslas', 'Menai', 'Politika', 'Gamta', 'Kelionės', 'Maistas', 'Sveikata', 'Muzika'];

    useEffect(() => {
        // Assuming searchTags fetches all tags when called with an empty string
        const loadInitialData = async () => {
            const fetchedTags = await searchTags('');
            setSuggestedTags(fetchedTags);
        };

        loadInitialData();
    }, []);

    const handleChange = (event) => {
        if (event.target.name === "TagIds") {
            const inputTags = event.target.value.split(',').map(tag => tag.trim());
            setFormData({ ...formData, [event.target.name]: inputTags });
        } else {
            setFormData({ ...formData, [event.target.name]: event.target.value });
        }
    };

    const handleTagInput = async (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            const input = event.target.value.trim();
            if (input && input.startsWith('#')) {
                const tagName = input.slice(1);
                let existingTag = tags.find(tag => tag.Žymės_pavadinimas.toLowerCase() === tagName.toLowerCase());
                if (!existingTag) {
                    existingTag = await createTag({ Žymės_pavadinimas: tagName });
                    setTags([...tags, existingTag]);
                }
                event.target.value = '';
            }
        }
    };


    const handleSubmit = async (event) => {
        event.preventDefault();
        const tagIdsForSubmission = tags.map(tag => tag.Id);
        const payload = {
            ...formData,
            TagIds: tagIdsForSubmission
        };
        try {
            const response = await fetch('https://localhost:7259/PostDiscussion', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            console.log('Success:', result);
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
                    <div className="status">
                        <label htmlFor="tagInput">Žymės:</label>
                        <input
                            type="text"
                            id="tagInput"
                            placeholder="Type and press 'Enter' to add tag"
                            onKeyDown={handleTagInput} // Changed from onChange to onKeyDown
                            className="input-style21"
                        />
                    </div>
                    <div className="status">
                        {/* Displaying added tags */}
                        {tags.map((tag, index) => (
                            <span key={index} className="tag">{tag.Žymės_pavadinimas}</span>
                        ))}
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
                <button type="submit" className="search-box button">Submit</button>
            </form>
        </div>
    );
};

export default DiscussionForm;
