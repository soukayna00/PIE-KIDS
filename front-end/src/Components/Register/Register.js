import React, { useState } from 'react';
import './Register.css';


const Register = () => {
  const [formData, setFormData] = useState({
    nom: '',
    age:'',
    email: '',
    motDePasse: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/Etudiants/Register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log(data); 
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
  <div className='containers-register'>
      <div className='header-money'>
          <img id='image-money' src='/assets/star.png' />
          {/* <h2>JOIN US NOW !</h2> */}
          </div>
                   <div id='form-registers'>
      <form onSubmit={handleSubmit}>
        <div>
        <h2>JOIN US NOW !</h2> 
          <label>Enter your Name:</label>
          <input
            type="text"
            name="nom"
            value={formData.nom}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Your Age:</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}  min="4"
            max="18"
          />
        </div>
        <div>
          <label> Your Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Your Password:</label>
          <input
            type="password"
            name="motDePasse"
            value={formData.motDePasse}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Register</button>
      </form>
      </div>

         
      <div className='test'> <img id='thekidi' src='/assets/character-group.png' /></div>
    
    
    </div>
  );
};

export default Register;
