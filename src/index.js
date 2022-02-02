import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './style/style.scss';
import Home from './pages/home';
import TicTacToe from './pages/tictactoe';

const Routing = () => {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route path="/tic-tac-toe" element={<TicTacToe />} />
            </Routes>
        </Router>
    );
};

const rootElement = document.getElementById('root');
render(<Routing />, rootElement);
