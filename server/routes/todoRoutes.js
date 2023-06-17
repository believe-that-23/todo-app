const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Todo = require('../models/todo');

// Middleware to check if the request contains a valid JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  jwt.verify(token, 'your-secret-key', (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }
    if (req.params.id && user.id !== req.params.id) {
      return res.status(403).json({ error: 'Unauthorized' });
    }
    req.user = user;
    next();
  });
};


// Protected route that requires authentication
router.get('/', authenticateToken, async (req, res) => {
  try {
    const todos = await Todo.find({ userId: req.user.id }).populate('userId');
    res.json({ todos });
  } catch (error) {
    console.error('Error fetching todos:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Protected route that requires authentication
router.post('/', authenticateToken, async (req, res) => {
  const { todo } = req.body;
  try {
    const newTodo = await Todo.create({ todo, userId: req.user.id });
    res.status(201).json({ todo: newTodo });
  } catch (error) {
    console.error('Error adding todo:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Protected route that requires authentication
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const todo = await Todo.findByIdAndDelete(id);
    
    res.sendStatus(204);
  } catch (error) {
    console.error('Error deleting todo:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


module.exports = router;
