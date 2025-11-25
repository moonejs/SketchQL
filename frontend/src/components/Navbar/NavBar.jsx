import React, { useState } from 'react';
import { useStore } from '../../Store/store';
import CodeExportModal from '../codeGenerator/CodeExportModal';
import axios from 'axios';
import { useAuthStore } from '../../Store/authStore';
import AiModal from '../codeGenerator/AiModal';

export default function NavBar(){
    const { nodes, edges, currentProjectId, projectName, setProjectName, loadProject, clearCanvas } = useStore();
    const [showAiModal, setShowAiModal] = useState(false);
    const { token } = useAuthStore();
    
    const [showModal, setShowModal] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const handleSave = async () => {
        if (!projectName.trim()) {
            alert("Please enter a project name");
            return;
        }

        setIsSaving(true);
        try {
            const payload = {
                name: projectName,
                nodes: nodes,
                edges: edges,
                projectId: currentProjectId 
            };

            const res = await axios.post('http://localhost:5000/api/diagramss/save', payload, {
                headers: { 'auth-token': token }
            });


            loadProject(res.data); 
            
            alert("Diagram saved successfully!");
        } catch (err) {
            console.error("Save Error:", err);
            alert("Failed to save diagram. Check console.");
        } finally {
            setIsSaving(false);
        }
    };
    return(
        <>
            <nav className="container-fluid navbar navbar-expand-lg bg-info-subtle">
                <div className="container-fluid">
                    <span className="navbar-brand mb-0 h1">My DB Visualizer</span>
                    <input 
                        type="text" 
                        className="form-control form-control-sm me-auto" 
                        style={{ maxWidth: '200px', fontWeight: 'bold' }}
                        value={projectName}
                        onChange={(e) => setProjectName(e.target.value)}
                        placeholder="Untitled Diagram"
                    />
                    <div className="d-flex gap-2">
                        <button 
                            className="btn btn-warning btn-sm fw-bold" 
                            onClick={() => setShowAiModal(true)}
                        >
                            <i className="bi bi-stars me-1"></i> AI Gen
                        </button>
                        <button 
                            className="btn btn-outline-dark btn-sm" 
                            onClick={() => setShowModal(true)}
                        >
                            Export Code
                        </button>
                        <button className="btn btn-outline-light btn-sm">File</button>
                        
                        <button className="btn btn-outline-light btn-sm">Share</button>
                        <button 
                            className="btn btn-primary btn-sm"
                            onClick={handleSave}
                            disabled={isSaving}
                        >
                            {isSaving ? (
                                <span><span className="spinner-border spinner-border-sm me-1"></span>Saving...</span>
                            ) : (
                                <span><i className="bi bi-save me-1"></i> Save</span>
                            )}
                        </button>
                        <button 
                        className="btn btn-outline-danger btn-sm" 
                        onClick={clearCanvas}
                        >
                        Clear Canvas
                        </button>
                    </div>
                </div>
            </nav>

            <CodeExportModal 
                isOpen={showModal} 
                onClose={() => setShowModal(false)} 
                nodes={nodes} 
                edges={edges} 
            />
            <AiModal 
    isOpen={showAiModal} 
    onClose={() => setShowAiModal(false)} 
/>
        </>
    )
}