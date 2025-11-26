import React, { useState } from 'react';
import axios from 'axios';
import { useStore } from '../../Store/store';
import { useAuthStore } from '../../Store/authStore';
import { getLayoutedElements } from '../../utils/autoLayout';
export default function AiModal({ isOpen, onClose }) {
    const [prompt, setPrompt] = useState('');
    const [loading, setLoading] = useState(false);
    const { token } = useAuthStore();
    const loadProject = useStore((state) => state.loadProject);

    if (!isOpen) return null;

    const handleGenerate = async () => {
        
        if (!prompt.trim()) return;
        setLoading(true);

        try {
            const res = await axios.post('http://localhost:5000/api/ai/generate', 
                { userPrompt: prompt },
                { headers: { 'auth-token': token } }
            );
            const repairedEdges = res.data.edges.map(edge => {
                const cleanSourceCol = edge.sourceHandle
                    .replace('-source', '')
                    .replace('-right', '')
                    .replace('-left', '');
                
                const cleanTargetCol = edge.targetHandle
                    .replace('-target', '')
                    .replace('-left', '')
                    .replace('-right', '');

                return {
                    ...edge,
                    
                    sourceHandle: `${cleanSourceCol}-right`, 
                    targetHandle: `${cleanTargetCol}-left`,
                    type: 'step',
                    animated: false,
                    style: { stroke: '#b1b1b7', strokeWidth: 2 },
                    markerEnd: { type: 'arrowclosed' },
                    markerEnd: { type: 'arrowclosed', color: '#b1b1b7' }
                };
            });
            const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
                res.data.nodes, 
                repairedEdges 
            );

            
            loadProject({
    _id: null, 
    name: `AI: ${prompt.substring(0, 15)}...`,
    nodes: layoutedNodes, 
    edges: layoutedEdges
});

            onClose();
            alert("Diagram Generated Successfully!");

        } catch (err) {
            console.error(err);
            alert("AI Generation Failed. Check backend logs.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content border-0 shadow-lg">
                    <div className="modal-header bg-primary text-white">
                        <h5 className="modal-title fw-bold">
                            <i className="bi bi-stars me-2"></i> AI Architect
                        </h5>
                        <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
                    </div>
                    <div className="modal-body p-4">
                        <p className="text-muted small mb-2">
                            Describe your app, and I will design the database schema for you.
                        </p>
                        <textarea 
                            className="form-control" 
                            rows="4" 
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            placeholder="e.g. A Movie Booking System with Cinemas, Movies, Showtimes, and Tickets..."
                        ></textarea>
                    </div>
                    <div className="modal-footer bg-light">
                        <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
                        <button className="btn btn-primary" onClick={handleGenerate} disabled={loading}>
                            {loading ? (
                                <span><span className="spinner-border spinner-border-sm me-2"></span>Thinking...</span>
                            ) : (
                                <span><i className="bi bi-lightning-charge-fill me-1"></i> Generate</span>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}