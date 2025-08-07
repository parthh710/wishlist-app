import React, { useState, useEffect } from 'react';
import './App.css';
import { v4 as uuid } from 'uuid';

function App() {
  const [todo, setTodo] = useState('');
  const [todolist, setTodolist] = useState(() => {
    const saved = localStorage.getItem('wishlist');
    return saved ? JSON.parse(saved) : [];
  });
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(todolist));
  }, [todolist]);

  const onTodoInputchange = (e) => setTodo(e.target.value);

  const onAddTodolist = () => {
    if (todo.trim() === '') return;
    setTodolist([...todolist, { id: uuid(), todo, isCompleted: false }]);
    setTodo('');
  };

  const onDelete = (id) => {
    setTodolist(todolist.filter(item => item.id !== id));
  };

  const onTodoCheckchange = (id) => {
    setTodolist(
      todolist.map(item =>
        item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
      )
    );
  };

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <div className={`App ${darkMode ? 'dark' : ''}`}>
      <h1>My Wishlist</h1>
      <button onClick={toggleDarkMode}>
        {darkMode ? '☀ Light Mode' : '🌙 Dark Mode'}
      </button>
      <div>
        <input
          type="text"
          placeholder="Add your wishlist..."
          value={todo}
          onChange={onTodoInputchange}
        />
        <button onClick={onAddTodolist}>Add</button>
      </div>

      <div>
        {todolist.map(item => (
          <div className="todo-item" key={item.id}>
            <label>
              <input
                type="checkbox"
                checked={item.isCompleted}
                onChange={() => onTodoCheckchange(item.id)}
              />
              <span className={item.isCompleted ? 'completed' : ''}>
                {item.todo}
              </span>
            </label>
            <button onClick={() => onDelete(item.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
