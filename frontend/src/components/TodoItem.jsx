import React from 'react';

const TodoItem = ({ todo, onDelete, onToggle }) => {
    return (
        <div className={`todo-item ${todo.status === 'completed' ? 'completed' : ''}`}>
            <input
                type="checkbox"
                checked={todo.status === 'completed'}
                onChange={() => onToggle(todo._id)}
            />
            <span>{todo.description}</span>
            <button onClick={() => onDelete(todo._id)}>Delete</button>
        </div>
    );
};

export default TodoItem;
