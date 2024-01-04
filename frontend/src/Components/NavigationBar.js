import { Link } from 'react-router-dom';

const NavigationBar = () => {
    return <div className="nav-content">
        <div className="nav-button">
            <Link to="/">
                Namai
            </Link>
        </div>
        <div className="nav-button">
            <Link to="/Katalogas">
                Katalogas
            </Link>
        </div>
        <div className="nav-button">
            <Link to="/Krepšelis">
                Krepšelis
            </Link>
        </div>
        <div className="nav-button">
            <Link to="/Profilis">
                Profilis
            </Link>
        </div>
        <div className="nav-button">
            <Link to="/Administracinis">
                Administracinis puslapis
            </Link>
        </div>
        <div className="nav-button">
            <Link to="/Prekių-administravimas">
                Prekių administravimas
            </Link>
        </div>
        <div className="nav-button">
            <Link to="/Diskusijos">
                Diskusijos
            </Link>
        </div>
        <div className="nav-button">
            <Link to="/Registruotis">
                Registruotis
            </Link>
        </div>
        <div className="nav-button">
            <Link to="/Prisijungti">
                Prisijungti
            </Link>
        </div>
    </div>
}

export default NavigationBar;