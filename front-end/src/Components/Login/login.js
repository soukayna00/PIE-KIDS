import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import './login.css';

const Login = () => {
  const navigate = useNavigate();
  const { setAuthState } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    email: '',
    motDePasse: '',
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/Etudiants/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (response.ok) {
        // Save token to localStorage
        localStorage.setItem('token', data.token);

        // Log token and user data
        console.log('Token:', data.token);
        console.log('User Data:', data);

        // Update auth state to trigger re-render
        setAuthState({
          isAuthenticated: true,
          id: data.id, 
          name: data.name,
          role: data.role,
        });

        // Navigate based on user role
        if (data.role === 'Enseignant') {
          navigate('/home'); 
        } else if (data.role === 'Etudiant') {
          navigate('/student'); 
        } else {
          // Handle unexpected role
          console.error('Unexpected role:', data.role);
          setError('Unexpected role encountered.');
        }
      } else {
        // Handle login error
        console.error('Login failed:', data.message);
        setError(data.message || 'Login failed. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className='containers-regist'>
      <div className='header-money'>
        <img id='image-moneys' src='/assets/coin.png' alt='Header' />
      </div>
      <div id='form-registers'>
        <form onSubmit={handleSubmit}>
          <h2>Good to see you again!</h2>
          {error && <p className="error">{error}</p>}
          <div>
            <label>Your Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Your Password:</label>
            <input
              type="password"
              name="motDePasse"
              value={formData.motDePasse}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Connect</button>
        </form>
      </div>
      <div className='test'><img id='thekid' src='/assets/peach.png' alt='Kids' /></div>
    </div>
  );
};

export default Login;
