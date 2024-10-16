import React from 'react';
import './App.css';
import TodoList from './components/TodoList';
import ImageSearch from './components/ImageSearch';
import RandomColor from './components/RandomColor';

const App = () => {
    return (
        <div className="container">
            <TodoList />
            <ImageSearch />
            <RandomColor />
        </div>
    );
};

export default App;
