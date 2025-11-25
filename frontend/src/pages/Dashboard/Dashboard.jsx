import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../Store/authStore';
import { useStore } from '../../Store/store'; 
import NavBar from '../../components/Navbar/NavBar'; 

export default function Dashboard() {
    const navigate = useNavigate();
    const { token, user, logout } = useAuthStore();
    const { loadProject, resetCanvas } = useStore();
    
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/diagramss/diagrams', {
                headers: { 'auth-token': token }
            });
            setProjects(res.data);
        } catch (err) {
            console.error("Error fetching projects:", err);
            
        } finally {
            setLoading(false);
        }
    };

    const handleCreateNew = () => {
        resetCanvas(); 
        navigate('/design'); 
    };

    const handleOpenProject = (project) => {
        loadProject(project); 
        navigate('/design');
    };

    const handleDelete = async (e, id) => {
        e.stopPropagation(); 
        if(!window.confirm("Are you sure you want to delete this diagram?")) return;

        try {
            await axios.delete(`http://localhost:5000/api/diagramss/delete/${id}`, {
                headers: { 'auth-token': token }
            });
            
            setProjects(projects.filter(p => p._id !== id));
        } catch (err) {
            alert("Failed to delete project");
        }
    }

    return (
        <div className="vh-100 bg-light d-flex flex-column">
             
             <nav className="navbar navbar-expand-lg bg-white border-bottom px-4">
                <span className="navbar-brand fw-bold text-primary">My DB Visualizer</span>
                <div className="ms-auto d-flex gap-3 align-items-center">
                    <span className="fw-bold text-dark">Hi, {user?.username}</span>
                    <button className="btn btn-outline-danger btn-sm" onClick={() => { logout(); navigate('/login'); }}>Logout</button>
                </div>
            </nav>

            <div className="container-fluid flex-grow-1">
                <div className="row h-100">
                   
                    <div className="col-2 bg-white border-end py-4">
                        <div className="list-group list-group-flush">
                            <button className="list-group-item list-group-item-action border-0 active rounded">
                                <i className="bi bi-database me-2"></i> My diagrams
                            </button>
                            <button className="list-group-item list-group-item-action border-0 text-muted">
                                <i className="bi bi-share me-2"></i> Shared with me
                            </button>
                        </div>
                    </div>

                    
                    <div className="col-10 py-4 px-5">
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <h3 className="fw-bold text-dark">My diagrams</h3>
                            <button className="btn btn-primary" onClick={handleCreateNew}>
                                <i className="bi bi-plus-lg me-2"></i> New Diagram
                            </button>
                        </div>

                        {loading ? (
                            <div className="text-center mt-5"><div className="spinner-border text-primary"></div></div>
                        ) : (
                            <div className="row g-4">
                                {projects.length === 0 && (
                                    <div className="col-12 text-center text-muted mt-5">
                                        <p>No diagrams found. Create your first one!</p>
                                    </div>
                                )}
                                
                                {projects.map((project) => (
                                    <div className="col-md-4 col-lg-3" key={project._id}>
                                        <div 
                                            className="card h-100 shadow-sm border-0 project-card" 
                                            style={{cursor: 'pointer', transition: 'transform 0.2s'}}
                                            onClick={() => handleOpenProject(project)}
                                            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                                            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                                        >
                                            {/* Preview Placeholder */}
                                            <div className="card-img-top bg-light d-flex align-items-center justify-content-center" style={{height: '140px'}}>
                                                <i className="bi bi-diagram-3 text-secondary" style={{fontSize: '3rem'}}></i>
                                            </div>
                                            
                                            <div className="card-body">
                                                <h6 className="card-title fw-bold text-dark mb-1">{project.name}</h6>
                                                <p className="card-text text-muted small">
                                                    Edited {new Date(project.updatedAt).toLocaleDateString()}
                                                </p>
                                                <div className="d-flex justify-content-between align-items-center mt-3">
                                                    <span className="badge bg-warning text-dark bg-opacity-25 border border-warning px-2 py-1">Public</span>
                                                    <button 
                                                        className="btn btn-sm text-danger hover-bg-light"
                                                        onClick={(e) => handleDelete(e, project._id)}
                                                    >
                                                        <i className="bi bi-trash"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}