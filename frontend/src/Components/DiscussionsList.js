import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const DiscussionList = () => {
    const [discussions, setDiscussions] = useState([]);

    useEffect(() => {
        fetch('https://localhost:7259/ListDiscussions')
            .then(response => response.json())
            .then(data => setDiscussions(data))
            .catch(error => console.error('Error fetching discussions:', error));
    }, []);

    return (
        <div>
            {/* Render discussions here */}
            {discussions.map(discussion => (
                <div key={discussion.id}>
                    {/* Wrap the title with a Link component to make it clickable */}
                    <h3>
                        <Link to={`/discussion/${discussion.id}`}>
                            {discussion.pavadinimas}
                        </Link>
                    </h3>
                    <p>{discussion.turinys}</p>
                    {/* ... other discussion details ... */}
                </div>
            ))}
        </div>
    );
};

export default DiscussionList;
