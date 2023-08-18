import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { BrowserRouter as Router, Link } from 'react-router-dom';



export function Home() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [registerUsername, setRegisterUsername] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');
    const [registerName, setRegisterName] = useState('');

    const navigate = useNavigate();

    const handleNavigation = () => {
        navigate('/admin');
    }


    const handleLogin = async () => {
        try {
            const response = await fetch('/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: username, password })
            });

            const data = await response.json();

            if (data.success) {
                // Redirect to Admin page if login is successful
                handleNavigation();
            } else {
                alert(data.message || "Login failed");
            }
        } catch (error) {
            console.error("Login error:", error);
            alert("An error occurred. Please try again.");
        }
    };

    const handleRegister = async () => {
        if (!registerPassword) {
            alert("Passwords is empty");
            return;
        }
        
        try {
            const response = await fetch('/api/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: registerUsername, password: registerPassword, name: registerName })
            });

            const data = await response.json();

            if (data.success) {
                alert("Registration successful");
            } else {
                alert(data.message || "Registration failed");
            }
        } catch (error) {
            console.error("Registration error:", error);
            alert("An error occurred during registration. Please try again.");
        }
    };

    return (
        <div className="container">
        <div className="row justify-content-center">
            {/* Registration Section */}
            <div className="col-md-6">
                <div className="card">
                    <div className="card-body">
                        <h2 className="card-title">Register</h2>
                        <div className="mb-3">
                            <label className="form-label">Name:</label>
                            <input
                                type="text"
                                className="form-control"
                                value={registerName}
                                onChange={e => setRegisterName(e.target.value)}
                                placeholder="Enter your Name for registration"
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Email:</label>
                            <input
                                type="text"
                                className="form-control"
                                value={registerUsername}
                                onChange={e => setRegisterUsername(e.target.value)}
                                placeholder="Enter your email for registration"
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Password:</label>
                            <input
                                type="password"
                                className="form-control"
                                value={registerPassword}
                                onChange={e => setRegisterPassword(e.target.value)}
                                placeholder="Enter a password for registration"
                            />
                        </div>
                        <button className="btn btn-primary" onClick={handleRegister}>Register</button>
                    </div>
                </div>
            </div>
    
            {/* Login Section */}
            <div className="col-md-6">
                <div className="card">
                    <div className="card-body">
                        <h2 className="card-title">Login</h2>
                        <div className="mb-3">
                            <label className="form-label">Email:</label>
                            <input
                                type="text"
                                className="form-control"
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                                placeholder="Enter your email to login"
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Password:</label>
                            <input
                                type="password"
                                className="form-control"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                placeholder="Enter your password to login"
                            />
                        </div>
                        <button className="btn btn-primary" onClick={handleLogin}>Login</button>
                    </div>
                </div>
            </div>
        </div>
    </div> 
    );
}
