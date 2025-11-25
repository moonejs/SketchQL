  import { useState, useCallback } from 'react';
  import { ReactFlow,Background, Controls, MiniMap } from '@xyflow/react';
  import '@xyflow/react/dist/style.css';

  import TableNode from './TableNode';
  import { useStore } from '../../Store/store';

  const nodeTypes = {
    tableNode: TableNode,
  };


  export default function Table() {
  const nodes = useStore((state) => state.nodes);
    const edges = useStore((state) => state.edges);
    const onNodesChange = useStore((state) => state.onNodesChange);
    const onEdgesChange = useStore((state) => state.onEdgesChange);
    const onConnect = useStore((state) => state.onConnect);
    const setSelectedEdge = useStore((state) => state.setSelectedEdge);
    const deleteEdge = useStore((state) => state.deleteEdge);
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
          onEdgeClick={(event, edge) => {
              setSelectedEdge(edge.id);
              
              event.stopPropagation(); 
          }}
          onPaneClick={() => setSelectedEdge(null)}
          onEdgesDelete={(edgesToDelete) => {
           
            if (edgesToDelete.length > 0) {
                deleteEdge(edgesToDelete[0].id);
            }
        }}
          >
          <Background gap={12} size={1} />
          <Controls />
          <MiniMap 
            nodeColor={() => '#0d6efd'} // Blue dots for your tables
            style={{ border: '1px solid #dee2e6', borderRadius: '8px' }}
        />
        </ReactFlow>
        
      </div>

    );
  }