import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const DiscussionDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [discussion, setDiscussion] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const hardcodedCategories = ['Be kategorijos', 'Sportas', 'Mokslas', 'Menai', 'Politika', 'Gamta', 'Kelionės', 'Maistas', 'Sveikata', 'Muzika'];

    useEffect(() => {
        const fetchDiscussionDetails = async () => {
            try {
                const response = await fetch(`https://localhost:7259/GetDiscussion/${id}`);
                console.log("ID being passed:", id);

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setDiscussion(data);
            } catch (error) {
                console.error("Failed to fetch discussion details:", error);
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchDiscussionDetails();
    }, [id]);

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this discussion?')) {
            try {
                const response = await fetch(`https://localhost:7259/DeleteDiscussion/${id}`, { method: 'DELETE' });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                alert('Discussion successfully deleted.');
                navigate('/Diskusijos');
            } catch (error) {
                console.error("Failed to delete discussion:", error);
                setError(error);
            }
        } else {
            navigate('/Diskusijos'); // Redirect when cancellation occurs
        }
    };

    const handleEdit = () => {
        setEditMode(true);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!discussion.pavadinimas.trim() || !discussion.turinys.trim() || !discussion.kurėjo_Pavardė.trim() || !discussion.kurėjo_vardas.trim()) {
            alert('Visi laukai turi buti užpildyti.');
            return;
        }
        try {
            const response = await fetch(`https://localhost:7259/PutDiscussion/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(discussion),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            setEditMode(false);
            // Optionally, re-fetch the discussion details to update the UI
        } catch (error) {
            console.error("Failed to update discussion:", error);
            setError(error);
        }
    };

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
        setDiscussion({ ...discussion, [event.target.name]: event.target.value });
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error fetching discussion: {error.message}</div>;
    }

    if (!discussion) {
        return <div>Discussion not found</div>;
    }

    return (
        <div className="discussion-container">
            <button onClick={() => navigate('/Diskusijos')}>Back to Discussions</button>

            <div className="posts-table">
                {editMode ? (
                    <form onSubmit={handleSubmit}>
                        <label>Pavadinimas:</label>
                        <input
                            type="text"
                            name="pavadinimas"
                            value={discussion.pavadinimas || ''}
                            onChange={handleChange}
                        />

                        <label>Turinys:</label>
                        <textarea
                            name="turinys"
                            value={discussion.turinys || ''}
                            onChange={handleChange}
                        />

                        <label>Kategorija:</label>
                        <select
                            name="kategorija"
                            value={discussion.kategorija || ''}
                            onChange={handleChange}
                        >
                            {hardcodedCategories.map((category, index) => (
                                <option key={index} value={category}>{category}</option>
                            ))}
                        </select>

                        {/* Display-only fields */}
                        <div>Kurėjo Vardas: {discussion.kurėjo_vardas}</div>
                        <div>Kurėjo Pavardė: {discussion.kurėjo_Pavardė}</div>
                        <div>Sukurimo Data: {new Date(discussion.sukurimo_data).toLocaleDateString()}</div>

                        <button type="submit">Save Changes</button>
                    </form>
                ) : (
                    <div>
                        <h2>{discussion.pavadinimas}</h2>
                        <p>{discussion.turinys}</p>
                        <div>Kategorija: {discussion.kategorija}</div>
                            <div>Kurėjo Vardas: {discussion.kurėjo_vardas}</div>
                        <div>Kurėjo Pavardė: {discussion.kurėjo_Pavardė}</div>
                        <div>Sukurimo Data: {new Date(discussion.sukurimo_data).toLocaleDateString()}</div>
                        <button onClick={handleEdit}>Edit Discussion</button>
                        <button onClick={handleDelete}>Delete Discussion</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DiscussionDetail;
