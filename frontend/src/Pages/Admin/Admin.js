import React from "react";
import "./Admin.css";
import { Link } from 'react-router-dom';

const Admin = () => {
    return (
      <div>
        <div class="center">
            <p> Administracinis Langas </p>
        </div>
        
        <div class="funkcijos">
            <Link to="/Blokavimas"> Blokavimas</Link>
            <Link to="/Atblokavimas"> Atblokavimas</Link>
            <Link to="/Roles_keitimas">Roles Keitimas</Link>
            <Link to="/Pelno_ataskaita">Pelno Ataskaita</Link>
        </div>


        </div>
      
    );
  };
  
  export default Admin;