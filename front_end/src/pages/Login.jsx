import React, { useState}  from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/header';
import Sidebar from '../components/sidebar';
import stockUserImg from '../components/stock_user.png';
import '../App.css'; //
import axios from 'axios';

const Login = ({ onLoginSuccess }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    

    const handleLogin = async () => {
        try {
            const response = await axios.post('/api/auth/login', { email, password });
            const { token, user } = response.data;

            console.log("response ", user)
            
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            onLoginSuccess();
    
            navigate('/home');
        } catch (error) {
            alert(error);
        }
    };

    return (
        <div className="login-container">
            <Header />
            <div className="content-area">
                <Sidebar disableHover={true}/>
                <div className = "background">
                    <div className="login-form">
                    <div className= "login-image-div"><img className="login-image" src={stockUserImg} alt = ""/></div>
                    <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    <input type="password" placeholder="Password"  value={password} onChange={(e) => setPassword(e.target.value)}/>
                    <button onClick={handleLogin}>Login</button>
                </div>
                </div> 
            </div>
        </div>
    );
};

export default Login;