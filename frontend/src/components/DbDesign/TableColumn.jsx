import { Position, Handle } from '@xyflow/react';

export default function TableColumn({ col }) {
    return (
        <tr className="column-row position-relative">

            <th className="p-2 position-relative text-start" style={{ minWidth: '120px' }}>
                <Handle 
                    type="target" 
                    position={Position.Left} 
                    id={`${col.name}-left`} 
                    className="column-handle"
                    style={{ 
                        top: '50%', 
                        transform: 'translateY(-50%)', 
                        left: '-8px', 
                        background: '#555' 
                    }}
                />
                
                <div className="d-flex align-items-center gap-2">

                    {col.isPK && (
                        <span title="Primary Key" style={{ fontSize: '0.8rem' }}>
                            🔑
                        </span>
                    )}
                    

                    <span>{col.name}</span>
                </div>
            </th>


            <td className="p-2 position-relative text-end" style={{ minWidth: '80px' }}>

                <span className="badge bg-light text-secondary border border-secondary-subtle font-monospace fw-normal">
                    {col.type}
                </span>

                <Handle 
                    type="source" 
                    position={Position.Right} 
                    id={`${col.name}-right`} 
                    className="column-handle"
                    style={{ 
                        top: '50%', 
                        transform: 'translateY(-50%)', 
                        right: '-8px', 
                        background: '#555' 
                    }}
                />
            </td>
        </tr>
    );
}