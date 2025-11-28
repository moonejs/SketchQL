import React, { useState } from 'react';
import axios from 'axios';
import { useAuthStore } from '../../Store/authStore'
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
    const login = useAuthStore((state) => state.login);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: '', password: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            const res = await axios.post('http://localhost:5000/api/auth/login', formData);
            login({ username: res.data.username, id: res.data.userId }, res.data.token);
            navigate('/dashboard');
        } catch (err) {
            alert(err.response?.data?.error || 'Login failed');
        }
    };


    const handleSocialLogin = (provider) => {
        window.location.href = `http://localhost:5000/auth/${provider}`;
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <div className="card shadow p-4" style={{ width: '400px' }}>
                <h3 className="text-center mb-4">Login</h3>
                
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label>Email</label>
                        <input 
                            type="email" 
                            className="form-control"
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                        />
                    </div>
                    <div className="mb-3">
                        <label>Password</label>
                        <input 
                            type="password" 
                            className="form-control"
                            onChange={(e) => setFormData({...formData, password: e.target.value})}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Login</button>
                </form>

                <hr />
                
                <div className="d-flex flex-column gap-2">
                    <button onClick={() => handleSocialLogin('google')} className="btn btn-outline-danger">
                        Login with Google
                    </button>
                    <button onClick={() => handleSocialLogin('github')} className="btn btn-outline-dark">
                        Login with GitHub
                    </button>
                </div>
                
                <div className="mt-3 text-center">
                    <small>Don't have an account? <Link to="/register">Register</Link></small>
                </div>
            </div>
        </div>
    );
}