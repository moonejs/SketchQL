import React, { useState } from 'react';
import { useStore } from '../../Store/store';
import CodeExportModal from '../codeGenerator/CodeExportModal';
import axios from 'axios';
import { useAuthStore } from '../../Store/authStore';
import AiModal from '../codeGenerator/AiModal';
import { toPng } from 'html-to-image';

export default function NavBar(){
    const { nodes, edges, currentProjectId, projectName, setProjectName, loadProject, clearCanvas } = useStore();
    const [showAiModal, setShowAiModal] = useState(false);
    const { token } = useAuthStore();
    
    const [showModal, setShowModal] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const downloadImage = () => {
        const viewport = document.querySelector('.react-flow__viewport');

        if (!viewport || nodes.length === 0) return;

       
        const NODE_WIDTH_ESTIMATE = 350; 
        const NODE_HEIGHT_ESTIMATE = 400; 
        const PADDING = 100;

        const bounds = nodes.reduce((acc, node) => ({
            minX: Math.min(acc.minX, node.position.x),
            minY: Math.min(acc.minY, node.position.y),
            maxX: Math.max(acc.maxX, node.position.x + NODE_WIDTH_ESTIMATE),
            maxY: Math.max(acc.maxY, node.position.y + NODE_HEIGHT_ESTIMATE),
        }), { minX: Infinity, minY: Infinity, maxX: -Infinity, maxY: -Infinity });

        
        const width = bounds.maxX - bounds.minX + (PADDING * 2);
        const height = bounds.maxY - bounds.minY + (PADDING * 2);

        toPng(viewport, { 
            backgroundColor: '#ffffff',
            width: width,
            height: height,
            style: {
                width: `${width}px`,
                height: `${height}px`,
                
                transform: `translate(${-bounds.minX + PADDING}px, ${-bounds.minY + PADDING}px) scale(1)`
            }
        })
        .then((dataUrl) => {
            const link = document.createElement('a');
            link.download = `${projectName || 'database-schema'}.png`;
            link.href = dataUrl;
            link.click();
        })
        .catch((err) => {
            console.error('Failed to export image', err);
            alert("Could not download image.");
        });
    };
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
    const handleShare = () => {
    if (!currentProjectId) {
        alert("Please save the diagram first to generate a link.");
        return;
    }

    
    const shareUrl = `${window.location.origin}/shared/${currentProjectId}`;

    navigator.clipboard.writeText(shareUrl).then(() => {
        alert("Link copied to clipboard! You can send it to anyone.");
    }, (err) => {
        console.error('Could not copy text: ', err);
    });
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
                            className="btn btn-outline-secondary btn-sm" 
                            onClick={downloadImage}
                            title="Download as Image"
                        >
                            <i className="bi bi-camera-fill me-1"></i> PNG
                        </button>
                        <button 
                            className="btn btn-outline-dark btn-sm" 
                            onClick={() => setShowModal(true)}
                        >
                            Export Code
                        </button>
                        <button className="btn btn-outline-light btn-sm">File</button>
                        
                        <button className="btn btn-outline-light btn-sm"
                        onClick={handleShare}
                        >Share</button>
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