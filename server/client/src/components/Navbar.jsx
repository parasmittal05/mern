import { NavLink } from 'react-router-dom';
import React from 'react';
import "./Navbar.css"
import { useAuth } from '../store/auth';

function Navbar() {
  const { isLoggedIn } = useAuth();
  console.log("login or not ", isLoggedIn);
  return (
    <div>
      <header>
        <div className="container">
          <div className='logo-brand'>
            <NavLink to="/">Paras Technical</NavLink>
          </div>
          <nav>
            <ul>
              <li>
                <NavLink to="/">Home</NavLink>
                </li>
              <li>
                <NavLink to="/About">About</NavLink>
                </li>
                <li><NavLink  to="/service">Service</NavLink></li>
              <li><NavLink to="/contact">Contact</NavLink></li>
              { isLoggedIn? <li> <NavLink to ="/logout">Logout</NavLink></li>:<>
              <li><NavLink to="/register">Register</NavLink></li>
              <li><NavLink to="/login">Login</NavLink></li>
              </>}
              
            
              
            </ul>
          </nav>
        </div>
      </header>
    </div>
  );
}

export default Navbar;
