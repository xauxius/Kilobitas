import React, { useState, useEffect } from 'react';

const DiscussionList = () => {
    const [discussions, setDiscussions] = useState([]);

    useEffect(() => {
        fetch('/discussions')
            .then(response => response.json())
            .then(data => setDiscussions(data))
            .catch(error => console.error('Error fetching discussions:', error));
    }, []);

    return (
        <div>
            {/* Render discussions here */}
            {discussions.map(discussion => (
                <div key={discussion.id}>
                    {/* Display discussion details */}
                </div>
            ))}
        </div>
    );
};

export default DiscussionList;
