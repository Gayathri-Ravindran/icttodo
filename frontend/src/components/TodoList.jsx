import React, { useState, useEffect } from 'react';
import TodoItem from './TodoItem';
import { TextField, Button, Checkbox, FormControlLabel, List, ListItem, ListItemText, Box } from '@mui/material';

const TodoList = ({ filter }) => {
    const [todos, setTodos] = useState([]);
    const [description, setDescription] = useState('');

    useEffect(() => {
        fetch('http://localhost:5000/todos')
            .then(res => res.json())
            .then(data => setTodos(data))
            .catch(err => console.error('Error fetching todos:', err));
    }, []);

    const addTodo = () => {
        fetch('http://localhost:5000/todos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ description, status: 'ongoing' })
        })
        .then(res => res.json())
        .then(newTodo => {
            setTodos([...todos, newTodo]);
            setDescription('');
        })
        .catch(err => console.error('Error adding todo:', err));
    };

    const deleteTodo = id => {
        fetch(`http://localhost:5000/todos/${id}`, {
            method: 'DELETE'
        })
        .then(() => {
            setTodos(todos.filter(todo => todo._id !== id));
        })
        .catch(err => console.error('Error deleting todo:', err));
    };

    const toggleTodoStatus = id => {
        const todo = todos.find(todo => todo._id === id);
        const updatedTodo = { ...todo, status: todo.status === 'completed' ? 'ongoing' : 'completed' };
        fetch(`http://localhost:5000/todos/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedTodo)
        })
        .then(() => {
            setTodos(todos.map(todo => (todo._id === id ? updatedTodo : todo)));
        })
        .catch(err => console.error('Error updating todo:', err));
    };

    const filteredTodos = todos.filter(todo => {
        if (filter === 'all') return true;
        if (filter === 'completed') return todo.status === 'completed';
        if (filter === 'incomplete') return todo.status === 'ongoing';
        return true;
    });

    return (
        <Box sx={{ backgroundColor: '#f0f0f0', padding: '20px', borderRadius: '10px' }}>
            <TextField
                label="Add new todo"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <Button onClick={addTodo} variant="contained" color="primary">
                Add
            </Button>
            <List>
                {filteredTodos.map(todo => (
                    <ListItem key={todo._id}>
                        <FormControlLabel
                            control={<Checkbox checked={todo.status === 'completed'} onChange={() => toggleTodoStatus(todo._id)} />}
                            label={<ListItemText primary={todo.description} />}
                        />
                        <Button onClick={() => deleteTodo(todo._id)} variant="outlined" color="secondary">
                            Delete
                        </Button>
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};

export default TodoList;