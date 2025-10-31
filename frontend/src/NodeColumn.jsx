// src/NodeColumn.jsx
import { Handle, Position } from "@xyflow/react";

export default function NodeColumn({ columns }) {
  // We'll add a safety check
  if (!columns || columns.length === 0) {
    return null;
  }

  return (
    <div>
      {columns.map((col, index) => (
        <div 
          key={index} 
          style={{ 
            position: 'relative', 
            padding: '5px 10px', 
            borderTop: index !== 0 ? '1px solid #f0f0f0' : 'none' 
          }}
        >
          {/* Target Handle (Left) */}
          <Handle
            type="target" 
            position={Position.Left}
            id={col.name} // No template literal, just the name
            style={{ background: '#555', width: 8, height: 8, left: -4 }}
          />
          
          {/* Column Info */}
          <span style={{ fontWeight: 500 }}>{col.name}</span>
          <span style={{ color: '#888', marginLeft: 8, fontSize: '0.9em' }}>
            {col.type}
          </span>
          
          {/* Source Handle (Right) */}
          <Handle 
            type="source"
            position={Position.Right}
            id={col.name} // No template literal, just the name
            style={{ background: '#555', width: 8, height: 8, right: -4 }}
          />
        </div>
      ))}
    </div>
  );
}