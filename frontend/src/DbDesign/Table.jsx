import { useState, useCallback } from 'react';
import { ReactFlow,Background} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import TableNode from './TableNode';
import { useStore } from '../Store/store';

const nodeTypes = {
  tableNode: TableNode,
};


export default function Table() {
const nodes = useStore((state) => state.nodes);
  const edges = useStore((state) => state.edges);
  const onNodesChange = useStore((state) => state.onNodesChange);
  const onEdgesChange = useStore((state) => state.onEdgesChange);
  const onConnect = useStore((state) => state.onConnect);
 
  return (

    <div style={{ width: '100%', height: '100%' }}>
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

  );
}