import React, { useContext } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export const NavBar = () => {
  const history = useHistory();
  const auth = useContext(AuthContext);
  const logoutHandler = (event) => {
    event.preventDefault();
    auth.logout();
    history.push('/');
  }

  return (
    <nav>
      <div className="nav-wrapper blue darken-1">
        <a href="/" className="brand-logo">Suivre les entretiens</a>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li><NavLink to="/cars">Voitures</NavLink></li>
          <li><NavLink to="/create">Ajouter une voiture</NavLink></li>
          <li><a href="/" onClick={logoutHandler}>Logout</a></li>
        </ul>
      </div>
    </nav>
  )
}