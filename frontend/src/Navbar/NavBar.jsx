import React, { useState } from 'react';
import { useStore } from '../Store/store';
import CodeExportModal from '../codeGenerator/CodeExportModal';

export default function NavBar(){
    const nodes = useStore((state) => state.nodes);
    const edges = useStore((state) => state.edges);
    const [showModal, setShowModal] = useState(false);
    const clearCanvas = useStore((state) => state.clearCanvas);
    return(
        <>
            <nav className="container-fluid navbar navbar-expand-lg bg-info-subtle">
                <div className="container-fluid">
                    <span className="navbar-brand mb-0 h1">My DB Visualizer</span>
                    <div className="d-flex gap-2">
                        <button 
                            className="btn btn-outline-dark btn-sm" 
                            onClick={() => setShowModal(true)}
                        >
                            Export Code
                        </button>
                        <button className="btn btn-outline-light btn-sm">File</button>
                        <button className="btn btn-outline-light btn-sm">Share</button>
                        <button className="btn btn-outline-light btn-sm">Save</button>
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
        </>
    )
}