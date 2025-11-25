import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

export default function Register() {
    const navigate = useNavigate();
    

    const [formData, setFormData] = useState({
        
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (error) setError(''); 
    };
    const handleSocialLogin = (provider) => {
        window.location.href = `http://localhost:5000/auth/${provider}`;
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            setLoading(false);
            return;
        }
        const autoUsername = formData.email.split('@')[0];

        try {
            
            await axios.post('http://localhost:5000/api/auth/register', {
                username: autoUsername,
                email: formData.email,
                password: formData.password
            });

            
            alert('Registration successful! You can now login.');
            navigate('/login');

        } catch (err) {
           
            if (err.response?.data?.error?.includes('username')) {
                setError('This email prefix is taken. Please try a different email.');
            } else {
                setError(err.response?.data?.error || 'Registration failed. Try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <div className="card shadow p-4" style={{ width: '400px' }}>
                <h3 className="text-center mb-4">Create Account</h3>
                
                {error && <div className="alert alert-danger p-2 small text-center">{error}</div>}

                <form onSubmit={handleSubmit}>
                    

                    <div className="mb-3">
                        <label className="form-label small text-muted">Email</label>
                        <input 
                            type="email" 
                            name="email"
                            className="form-control"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label small text-muted">Password</label>
                        <input 
                            type="password" 
                            name="password"
                            className="form-control"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            minLength="6"
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label small text-muted">Confirm Password</label>
                        <input 
                            type="password" 
                            name="confirmPassword"
                            className="form-control"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button 
                        type="submit" 
                        className="btn btn-primary w-100 mb-3"
                        disabled={loading}
                    >
                        {loading ? 'Creating...' : 'Register'}
                    </button>
                </form>
                <div className="text-center my-3 text-muted small">OR</div>

                <div className="d-flex flex-column gap-2">
                    <button 
                        onClick={() => handleSocialLogin('google')} 
                        className="btn btn-outline-danger btn-sm"
                    >
                        <i className="bi bi-google me-2"></i> Register with Google
                    </button>
                    <button 
                        onClick={() => handleSocialLogin('github')} 
                        className="btn btn-outline-dark btn-sm"
                    >
                        <i className="bi bi-github me-2"></i> Register with GitHub
                    </button>
                </div>

                <div className="text-center border-top pt-3 mt-3">
                    <small className="text-muted">Already have an account? </small>
                    <Link to="/login" className="text-decoration-none fw-bold">Login</Link>
                </div>
               
            </div>
        </div>
    );
}