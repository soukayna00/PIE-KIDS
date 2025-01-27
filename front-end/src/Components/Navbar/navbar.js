import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faSignInAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from '../../context/AuthContext';

const Navbar = () => {
  const { authState, setAuthState } = useContext(AuthContext);
  const navigate = useNavigate(); 

  const handleLogout = () => {
    localStorage.removeItem('token');
    setAuthState({
      isAuthenticated: false,
      name: '',
      age: 0
    });
    navigate('/login');
  };

  // console.log('AuthState in Navbar:', authState); 

  return (
    <nav className="navbar">
      <div className="logo">PIE KIDZ</div>
      <ul className="nav-links">
        <li><Link to="/">About</Link></li>
        <li><Link to="/courses">Explore</Link></li>
        <li><Link to="/TeachWithUs">Teach with us</Link></li>
        {/* <li><Link to="/faq">FAQ</Link></li> */}
        {authState.isAuthenticated ? (
          <li>
            <div className="user-info">
              <button className='btn btn-danger' onClick={handleLogout}><FontAwesomeIcon icon={faSignOutAlt} /> Logout</button> 
            </div>
          </li>
        ) : (
          <>
            <li>
              <Link to="/register" className="signup-button">
                <FontAwesomeIcon icon={faUserPlus} /> Sign Up
              </Link>
            </li>
            <li>
              <Link to="/login" className="signin-button">
                <FontAwesomeIcon icon={faSignInAlt} /> Sign In
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
