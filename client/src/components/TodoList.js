import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TodoList = ({ token }) => {
  const [todos, setTodos] = useState([]);
  const [todoInput, setTodoInput] = useState('');

  const fetchTodos = async () => {
    try {
      const response = await axios.get('http://localhost:5000/todo', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTodos(response.data.todos);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, [token]);

  const handleAddTodo = async () => {
    try {
      await axios.post(
        'http://localhost:5000/todo',
        {
          todo: todoInput,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTodoInput('');
      fetchTodos(); // Call fetchTodos again to update the list
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/todo/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchTodos(); // Call fetchTodos again to update the list
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  return (
    <>
      <div>
        
        <input
          placeholder='Add a todo here'
          type="text"
          value={todoInput}
          onChange={(e) => setTodoInput(e.target.value)}
        />
        <button onClick={handleAddTodo}>Add Todo</button>
      </div>
      <ul>
        {todos.map((todo) => (
          <li key={todo._id}>
            {todo.todo}
            <button onClick={() => handleDeleteTodo(todo._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default TodoList;
