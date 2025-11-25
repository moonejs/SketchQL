import React, { useState } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
export default function CodeBlock({ code, language }) {
    const [isCopied, setIsCopied] = useState(false);
    const handleCopy = () => {
        navigator.clipboard.writeText(code);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000); 
    };
    return (
        <div className="rounded-3 overflow-hidden border border-secondary-subtle">
            <div className="d-flex justify-content-between align-items-center px-3 py-2">

                <span className="fw-bold text-uppercase user-select-none">
                </span>

                <button 
                    onClick={handleCopy}
                    className="btn btn-sm text-white d-flex align-items-center gap-2 border-0"
                    style={{ backgroundColor: 'transparent' }}
                >
                    {isCopied ? (
                        <>
                            <i className="bi bi-check-lg"></i> 
                            <span>Copied!</span>
                        </>
                    ) : (
                        <>
                           
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1z"/>
                            </svg>
                            <span>Copy</span>
                        </>
                    )}
                </button>
            </div>
            <div style={{ maxHeight: '65vh', overflowY: 'auto' }}>
                <SyntaxHighlighter 
                    language={language}
                    style={docco} 
                    showLineNumbers={true} 
                >
                    {code}
                </SyntaxHighlighter>
            </div>
        </div>
    );
  
}


