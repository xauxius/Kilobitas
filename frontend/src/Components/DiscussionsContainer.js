import React from 'react';
import { Link } from 'react-router-dom';

const DiscussionsContainer = () => {
    return (
        <div className="container">
            <div id="discussionsContainer" className="subforum">
                {/* Dynamic discussions will be inserted here */}
            </div>
            {/* Other static content or dynamic content can be added here */}
        </div>
    );
};

export default DiscussionsContainer;
