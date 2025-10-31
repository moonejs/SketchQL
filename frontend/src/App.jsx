import { useState, useCallback } from 'react';
import { ReactFlow, applyNodeChanges, applyEdgeChanges, addEdge ,Background} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import TableNode from './TableNode'; 

const initialNodes = [
  {
    id: '1',
    type: 'tableNode', 
    position: { x: 50, y: 50 },
    data: {
      label: 'User',
      columns: [
        { name: 'id', type: 'INT' },
        { name: 'username', type: 'VARCHAR' },
        { name: 'email', type: 'VARCHAR' }
      ]
    }
  },
  {
    id: '2',
    type: 'tableNode', 
    position: { x: 350, y: 100 },
    data: {
      label: 'Post',
      columns: [
        { name: 'id', type: 'INT' },
        { name: 'title', type: 'VARCHAR' },
        { name: 'user_id', type: 'INT (FK)' }
      ]
    }
  }
];


const initialEdges = [
  {
    id: 'e1-2',
    source: '1', 
    target: '2', 
    sourceHandle: 'id', 
    targetHandle: 'user_id',
    markerStart: 'url(#one)',
    markerEnd: 'url(#many)', 
      
  }
];
 
const nodeTypes = {
  tableNode: TableNode,
};
export default function App() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );
const onConnect = useCallback(
  (connection) => {
    const newEdge = {
      ...connection,
      id: `e-${connection.sourceHandle}-to-${connection.targetHandle}`,
      
      style: { strokeWidth: 2, stroke: '#555' },
      markerStart: 'url(#one)',
      markerEnd: 'url(#many)'   
    };
    setEdges((eds) => addEdge(newEdge, eds));
  },
  [setEdges]
);


 
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
       
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
      >
        <svg>
          <defs>

            <marker
              id="one"
              markerWidth="12.5"
              markerHeight="12.5"
              refX="8"
              refY="6"
              orient="auto"
            >
              <path d="M0,0 L0,12.5" stroke="#777" strokeWidth="1" />
            </marker>
            
   
            <marker
              id="many"
              markerWidth="12.5"
              markerHeight="12.5"
              refX="8"
              refY="6"
              orient="auto"
            >
              <path d="M0,0 L12.5,6.25 L0,12.5" fill="none" stroke="#777" strokeWidth="1" />
            </marker>
          </defs>
        </svg>
        <Background />
      </ReactFlow>
      
    </div>
  );
}