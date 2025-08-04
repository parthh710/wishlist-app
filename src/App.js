import React, { useState } from 'react';
import './App.css';
import { v4 as uuid } from 'uuid';

function App() {
  const [todo, setTodo] = useState('');
  const [todolist, setTodolist] = useState([]);

  const onTodoInputchange = (e) => {
    setTodo(e.target.value);
  };

  const onAddTodolist = () => {
    if (todo.trim() === '') return;
    setTodolist([...todolist, { id: uuid(), todo: todo, isCompleted: false }]);
    setTodo('');
  };

  const onDelete = (id) => {
    const updatedTodoList = todolist.filter(item => item.id !== id);
    setTodolist(updatedTodoList);
  };

  const onTodoCheckchange = (id) => {
    const updatedTodoList = todolist.map(todo =>
      todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
    );
    setTodolist(updatedTodoList);
  };

  return (
    <div className='App'>
      <h1>My wishlist</h1>
      <div>
        <input
          type="text"
          placeholder='Add your wishlist...'
          value={todo}
          onChange={onTodoInputchange}
        />
        <button onClick={onAddTodolist}>Add</button>
      </div>

      <div>
        {
          todolist.length > 0 &&
          todolist.map(item => (
            <div className="todo-item" key={item.id}>
              <label>
                <input
                  type='checkbox'
                  checked={item.isCompleted}
                  onChange={() => onTodoCheckchange(item.id)}
                />
                <span className={item.isCompleted ? 'completed' : ''}>
                  {item.todo}
                </span>
              </label>
              <button onClick={() => onDelete(item.id)}>Delete</button>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default App;

