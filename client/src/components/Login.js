import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ handleLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUserLogin = async () => {
    try {
      const response = await axios.post('/auth/login', {
        username,
        password,
      });
      const token = response.data.token;
      handleLogin(token); 
      setUsername('');
      setPassword('');
    } catch (error) {
      console.error('Error logging in:', error);
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
      <button onClick={handleUserLogin}>Login</button>
    </>
  );
};

export default Login;
