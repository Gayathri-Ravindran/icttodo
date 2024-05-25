import React, { useState } from 'react';
import TodoList from './components/TodoList'; 
import './App.css';

const App = () => {
    const [filter, setFilter] = useState('all');

    return (
        <div className="app">
            <h1>Todo Dashboard</h1>
            <div>
                <button onClick={() => setFilter('all')}>All</button>
                <button onClick={() => setFilter('completed')}>Completed</button>
                <button onClick={() => setFilter('incomplete')}>Incomplete</button>
            </div>
            <TodoList filter={filter} />
        </div>
    );
};

export default App;
