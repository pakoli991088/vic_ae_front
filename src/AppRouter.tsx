import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { LoginPage } from './Components/LoginPage/LoginPage';
import { MarginCallList } from './Components/MarginCallListPage/MarginCallList';

export const AppRouter: React.FC = () => {
    return (
        <div className="container">
            <Router>
                <Routes>
                    <Route path="/"  Component={LoginPage} />
                    <Route path="/margin-data" Component={MarginCallList} />
                </Routes>
            </Router>
        </div>
    );
};