import { create } from 'zustand';
import { applyNodeChanges, applyEdgeChanges, addEdge } from '@xyflow/react';

export const useStore=create((set,get)=>({
    nodes: [
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
    ],
    edges: [],
    selectedNodeId: null,
    setSelectedNode:(nodeId)=>{
        set({selectedNodeId:nodeId});
    },

    updateNodeLabel:(nodeId,newLabel)=>{
        set({
            nodes:get().nodes.map((node)=>{
                if(node.id==nodeId){
                    return {
                        ...node,
                        data:{
                            ...node.data,
                            label:newLabel
                        }
                    }
                }
                return node;
            })
        })
    },





    onNodesChange: (changes) => {
        set({
            nodes: applyNodeChanges(changes, get().nodes),
        });
    },

    onEdgesChange: (changes) => {
        set({
            edges: applyEdgeChanges(changes, get().edges),
        });
    },

    onConnect: (connection) => {
        set({
            edges: addEdge(connection, get().edges),
        });
    },
    addNewTable:()=>{
        const currentNodes=get().nodes;
        const newTableId = `table_${currentNodes.length + 1}`;
        const newNode = {
            id: newTableId,
            type: 'tableNode',
            position: { x: 20, y: 100 },
            data: {
                label: `New Table ${currentNodes.length + 1}`,
                columns: [{ name: 'id', type: 'INT' }]
            }
        };
        set({
            nodes: [...currentNodes, newNode]
        });
    }
}))