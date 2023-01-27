import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../images/logo.png';
import Account from './Account';
import './Navbar.css';

const Navbar = () => {
  return (
      <nav className="nav">
          <ul>
              <li>
                  <Link to='/' className="brand">
                      <img src={Logo} alt="logo" />
                      <h3>Play Quiz</h3>
                  </Link>
              </li>
          </ul>
          <Account />
    </nav>
  )
}

export default Navbar