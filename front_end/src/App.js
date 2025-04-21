import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';

const AppRoutes = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsAuthenticated(!!token);
        if(token!=null){
            console.log("authenticated: ", token)
        }
    }, []);

    const handleLoginSuccess = () => {
        setIsAuthenticated(true);
    };

    return (
        <Routes>
            <Route path="/" element={isAuthenticated ? <Navigate to="/home" /> : <Login onLoginSuccess={handleLoginSuccess} />} />
            <Route path="/home/*" element={isAuthenticated ? <Home /> : <Navigate to="/" />} />
        </Routes>
    );
};

const App = () => {
    

    return (
        <Router>
            <AppRoutes />
        </Router>
    );
};

export default App;