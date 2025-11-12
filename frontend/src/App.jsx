import { useState, useCallback } from 'react';
import { ReactFlow,Background, applyNodeChanges, applyEdgeChanges, addEdge } from '@xyflow/react';
import '@xyflow/react/dist/style.css';




import NavBar from './Navbar/NavBar'
import TableNode from './TableNode';

const nodeTypes = {
  tableNode: TableNode,
};


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
];
const initialEdges = [];
 
export default function App() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
 
  const onNodesChange = useCallback(
    (changes) => setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
    [],
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
    [],
  );
  const onConnect = useCallback(
    (params) => setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
    [],
  );
 
  return (
    <div className="d-flex flex-column vh-100">
      <NavBar/>
    <div style={{ width: '100vw', height: '100vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        >
        <Background/>
      </ReactFlow>
      
    </div>
    </div>
  );
}