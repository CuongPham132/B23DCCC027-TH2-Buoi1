import React, { useState } from 'react';

const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const [todoInput, setTodoInput] = useState('');
    const [editIndex, setEditIndex] = useState(-1);

    const addTodo = () => {
        if (todoInput.trim() !== '') {
            if (editIndex !== -1) {
                // Chỉnh sửa todo hiện có
                const newTodos = [...todos];
                newTodos[editIndex] = todoInput;
                setTodos(newTodos);
                setEditIndex(-1);
            } else {
                // Thêm todo mới
                setTodos([...todos, todoInput]);
            }
            setTodoInput('');
        }
    };

    const deleteTodo = (index) => {
        const newTodos = todos.filter((_, i) => i !== index);
        setTodos(newTodos);
    };

    const editTodo = (index) => {
        setTodoInput(todos[index]);
        setEditIndex(index);
    };

    return (
        <div className="todo-list">
            <h2>Todo List</h2>
            <input 
                type="text" 
                value={todoInput} 
                onChange={(e) => setTodoInput(e.target.value)} 
                placeholder="Thêm hoặc chỉnh sửa công việc..."
            />
            <button onClick={addTodo}>{editIndex !== -1 ? 'Cập nhật' : 'Thêm'}</button>
            <ul>
                {todos.map((todo, index) => (
                    <li key={index}>
                        {todo}
                        <button onClick={() => editTodo(index)}>Chỉnh sửa</button>
                        <button onClick={() => deleteTodo(index)}>Xóa</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TodoList;