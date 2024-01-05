import { Link } from 'react-router-dom';
import '../Styles/NavigationBar.css'; // Ensure you have the updated CSS imported

const NavigationBar = () => {
    return (
        <div className="nav-content">
            <div className="nav-left">
                <div className="nav-button"><Link to="/">Namai</Link></div>
                <div className="nav-button"><Link to="/Katalogas">Katalogas</Link></div>
                <div className="nav-button"><Link to="/Krepšelis">Krepšelis</Link></div>
                <div className="nav-button"><Link to="/order">Užsakymas</Link></div>
                <div className="nav-button"><Link to="/Administracinis">Administracinis puslapis</Link></div>
                <div className="nav-button"><Link to="/Prekių-administravimas">Prekių administravimas</Link></div>
            </div>
            <div className="nav-right">
                <div className="nav-button"><Link to="/Profilis">Profilis</Link></div>
                <div className="nav-divider"></div> {/* Add a vertical divider */}
                <div className="nav-button"><Link to="/Registruotis">Registruotis</Link></div>
                <div className="nav-button"><Link to="/Prisijungti">Prisijungti</Link></div>
            </div>
        </div>
    );
}

export default NavigationBar;