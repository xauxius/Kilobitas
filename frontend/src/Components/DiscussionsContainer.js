import React from 'react';
import { Link } from 'react-router-dom';

const DiscussionsContainer = ({ discussions }) => {
    return (
        <div className="container">
            {/* Loop through the discussions array and render each discussion */}
            {discussions.map(discussion => (
                <div key={discussion.id} className="subforum">
                    
                    <div className="subforum-row">
                        <div className="subforum-icon subforum-column center">
                            <i className="fa fa-user center"></i>
                        </div>
                        <div className="subforum-description subforum-column">
                            <h4><Link to={`/discussion/${discussion.id}`}>
                                {discussion.pavadinimas}
                            </Link></h4>
                            <p>{discussion.turinys}</p>
                        </div>
                        <div className="subforum-info subforum-column">
                            <b><a href="#">post</a></b> by <a href="#">{discussion.kurėjo_vardas}</a>
                            <br />on <small>{new Date(discussion.sukurimo_data).toLocaleDateString()}</small>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};



export default DiscussionsContainer;
