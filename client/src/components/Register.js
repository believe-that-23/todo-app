import React, { useState } from 'react';
import axios from 'axios';

const Register = ({ handleLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleSignup = async () => {
    try {
      const response = await axios.post('/auth/signup', {
        username,
        password,
        email,
      });
      const token = response.data.token;
      handleLogin(token); 
      setUsername('');
      setPassword('');
      setEmail('');
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };
  

  return (
    <>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <button onClick={handleSignup}>Signup</button>
    </>
  );
};

export default Register;
