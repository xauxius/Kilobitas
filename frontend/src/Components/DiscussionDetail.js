import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const DiscussionDetail = () => {
    const { id } = useParams();
    const [discussion, setDiscussion] = useState(null);

    useEffect(() => {
        const fetchDiscussionDetails = async () => {
            try {
                const response = await fetch(`https://localhost:7259/GetDiscussion/${id}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setDiscussion(data);
            } catch (error) {
                console.error("Failed to fetch discussion details:", error);
            }
        };

        fetchDiscussionDetails();
    }, [id]);

    if (!discussion) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container2">
            <div className="posts-table">
                <div className="table-head">
                    <div className="status">
                        <b>{discussion.pavadinimas}</b> by {discussion.kurejo_vardas}
                    </div>
                </div>

                <div className="user-photo">
                    <i className="fa fa-user center"></i>
                </div>

                <div className="table-head">
                    <div className="subjects">
                        on <small>{new Date(discussion.sukurimo_data).toLocaleDateString()}</small>
                    </div>
                </div>

                <div className="table-row">
                    <div className="status">
                        <p>{discussion.turinys}</p>
                    </div>
                    <div className="subjects">
                        {/* Assuming tags is an array of strings */}
                        {discussion.tags.map((tag, index) => (
                            <span key={index}>{tag}</span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DiscussionDetail;
