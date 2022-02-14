import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './views/Home/index';
import Game from './views/Game/index';

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" exact element={<Home />} />
                <Route path="/playing" exact element={<Game />} />
            </Routes>
        </BrowserRouter>
    )
}