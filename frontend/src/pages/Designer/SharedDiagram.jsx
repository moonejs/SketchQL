import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { ReactFlow, Background, Controls, MiniMap } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import TableNode from '../../components/DbDesign/TableNode';
import { SmartStepEdge } from '@tisoap/react-flow-smart-edge';

// Define types locally to avoid store conflicts
const nodeTypes = { tableNode: TableNode };
const edgeTypes = { smart: SmartStepEdge };

export default function SharedDiagram() {
    const { id } = useParams();
    const [nodes, setNodes] = useState([]);
    const [edges, setEdges] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [projectName, setProjectName] = useState('');

    useEffect(() => {
        const fetchDiagram = async () => {
            try {
                // Note: Use your full backend URL variable here
                const res = await axios.get(`http://localhost:5000/api/diagramss/shared/${id}`);
                setNodes(res.data.nodes);
                setEdges(res.data.edges);
                setProjectName(res.data.name);
            } catch (err) {
                setError("Diagram not found or deleted.");
            } finally {
                setLoading(false);
            }
        };
        fetchDiagram();
    }, [id]);

    if (loading) return <div className="vh-100 d-flex justify-content-center align-items-center">Loading Diagram...</div>;
    if (error) return <div className="vh-100 d-flex justify-content-center align-items-center text-danger">{error}</div>;

    return (
        <div className="d-flex flex-column vh-100 bg-light">
            {/* Simple Read-Only Header */}
            <nav className="navbar bg-white border-bottom px-4 shadow-sm">
                <span className="navbar-brand fw-bold text-primary">
                    <i className="bi bi-eye-fill me-2"></i>
                    View Mode: <span className="text-dark">{projectName}</span>
                </span>
                <a href="/login" className="btn btn-sm btn-outline-primary">Create your own</a>
            </nav>

            {/* The Canvas */}
            <div className="flex-grow-1" style={{ width: '100%', height: '100%' }}>
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    nodeTypes={nodeTypes}
                    edgeTypes={edgeTypes}
                    fitView
                    // --- LOCK IT DOWN ---
                    nodesDraggable={false} // Disable dragging
                    nodesConnectable={false} // Disable new connections
                    elementsSelectable={true} // Allow clicking but not moving
                    zoomOnScroll={true}
                    panOnDrag={true}
                    preventScrolling={false}
                >
                    <Background gap={12} size={1} />
                    <Controls showInteractive={false} /> {/* Hides edit controls */}
                    <MiniMap nodeColor="#0d6efd" />
                </ReactFlow>
            </div>
        </div>
    );
}