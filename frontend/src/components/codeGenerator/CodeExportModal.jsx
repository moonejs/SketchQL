import React, { useState, useEffect } from 'react';
import generateFlaskSQLAlchemy from './generateFlaskSQLAlchemy.js';

import CodeBlock from './CodeBlock.jsx';

import generateMySQL from './generateMySQL.js';
import generateMongoose from './generateMongoose.js';
import generateJava from './generateJava.js';
import generateCSharp from './generateCSharp.js';



const GENERATORS = {
    'mongoose':   { name: 'MERN (Mongoose)', fn: generateMongoose },
    'sqlalchemy': { name: 'Python (SQLAlchemy)', fn: generateFlaskSQLAlchemy },
    'java':       { name: 'Java (Spring Boot)', fn: generateJava },       
    'csharp':     { name: 'C# (Entity Framework)', fn: generateCSharp }, 
    'mysql':      { name: 'SQL Script (DBMS)', fn: generateMySQL }
};
export default function CodeExportModal({ isOpen, onClose, nodes, edges }) {
    const [selectedLang, setSelectedLang] = useState('sqlalchemy');
    const [code, setCode] = useState('');

    useEffect(() => {
        if (isOpen && nodes) {
            const generator = GENERATORS[selectedLang];
            if (generator) {
                const generatedCode = generator.fn(nodes, edges);
                setCode(generatedCode);
            }
        }
    }, [selectedLang, isOpen, nodes, edges]);

    if (!isOpen) return null;


    return (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050 }}>
            <div className="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
                <div className="modal-content shadow-lg" style={{ height: '85vh', border: 'none' }}>
                    
                   
                    <div className="modal-header bg-dark text-white border-bottom border-secondary">
                        <h5 className="modal-title">Export Database Schema</h5>
                        <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
                    </div>

                    <div className="modal-body p-0 d-flex">
                        
                       
                        <div className="bg-light border-end p-0" style={{ width: '250px', flexShrink: 0 }}>
                            <div className="p-3 bg-secondary-subtle fw-bold text-muted small border-bottom">
                                TARGET FRAMEWORK
                            </div>
                            <div className="list-group list-group-flush">
                                {Object.keys(GENERATORS).map((key) => (
                                    <button
                                        key={key}
                                        className={`list-group-item list-group-item-action border-0 ${selectedLang === key ? 'active' : ''}`}
                                        onClick={() => setSelectedLang(key)}
                                        style={{cursor: 'pointer'}}
                                    >
                                        {GENERATORS[key].name}
                                    </button>
                                ))}
                            </div>
                        </div>

                        
                        <div className="flex-grow-1 p-0 bg-dark d-flex flex-column">
                           
                            <CodeBlock 
                                code={code} 
                                language={GENERATORS[selectedLang].lang} 
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}