import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
    // Add state and methods for handling the visibility of the navigation menu
    const [isNavVisible, setIsNavVisible] = useState(true);

    const toggleNav = () => {
        setIsNavVisible(!isNavVisible);
    };

    return (
        <div className="navbar">
            <nav className="navigation">
                <span className="close-icon" onClick={toggleNav}>
                    <i className="fa fa-close"></i>
                </span>
                <ul className="nav-list">
                    <li className="nav-item"><Link to="/">Pagrindinis</Link></li>
                    <li className="nav-item"><Link to="/new-discussion">Sukurti nauja diskusija</Link></li>
                </ul>
            </nav>
            <a className="bar-icon" onClick={toggleNav}>
                <i className="fa fa-bars"></i>
            </a>
            <div className="brand">Diskusijos</div>
        </div>
    );
};
export default NavBar;

