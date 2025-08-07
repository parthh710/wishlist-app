import React, { useEffect, useState } from 'react';
import './App.css';
import { v4 as uuid } from 'uuid';

function App() {
  const [todo, setTodo] = useState('');
  const [todolist, setTodolist] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTodos = localStorage.getItem('todolist');
    if (savedTodos) setTodolist(JSON.parse(savedTodos));

    const savedMode = localStorage.getItem('darkMode');
    if (savedMode) setDarkMode(JSON.parse(savedMode));
  }, []);

  useEffect(() => {
    localStorage.setItem('todolist', JSON.stringify(todolist));
  }, [todolist]);

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    document.body.className = darkMode ? 'dark-mode' : '';
  }, [darkMode]);

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
    setTodolist(todolist.map(todo =>
      todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
    ));
  };

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <div className={`App ${darkMode ? 'dark' : ''}`}>
      <button className="dark-mode-toggle" onClick={toggleDarkMode}>
        {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
      </button>

      <h1>My Wishlist</h1>
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
        {todolist.length > 0 &&
          todolist.map(item => (
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
