import React, { useEffect, useState } from 'react';
import './App.css'
import Register from './components/Register';
import Login from './components/Login';
import TodoList from './components/TodoList';

const App = () => {
  const [token, setToken] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      setLoggedIn(true);
    }
  }, []);

  const handleLogin = async (newToken) => {
    setToken(newToken);
    setLoggedIn(true);
    localStorage.setItem('token', newToken);
  };

  const handleLogout = () => {
    setToken('');
    setLoggedIn(false);
    localStorage.removeItem('token');
  };

  return (
    <div>
      <h1>Todo App</h1>
      {loggedIn ? (
        <>
          <TodoList token={token} />
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
        <div className='log'>
          <div className='login'>
            <h1>Login Form</h1>
            <Login handleLogin={handleLogin} />
          </div>
          <div className='login'>
            <h1>Signup Form</h1>
            <Register handleLogin={handleLogin} />
          </div>
        </div>
        </>
      )}
    </div>
  );
};

export default App;
