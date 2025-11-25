import { create } from 'zustand';
import { applyNodeChanges, applyEdgeChanges, addEdge, MarkerType } from '@xyflow/react';

import { persist, createJSONStorage } from 'zustand/middleware';
export const DATA_TYPES = ['INT', 'BIGINT', 'VARCHAR', 'TEXT', 'DATE', 'DATETIME', 'BOOLEAN', 'FLOAT'];
const INITIAL_NODES = [
    {
        id: '1',
        type: 'tableNode',
        position: { x: 100, y: 100 },
        data: {
            label: 'Users',
            columns: [{ name: 'id', type: 'INT', isPK: true, isNullable: false }]
        }
    }
];
export const useStore=create(
    persist(
        (set,get)=>({
        nodes: [
            {
                id: '1',
                type: 'tableNode', 
                position: { x: 50, y: 50 },
                data: {
                    label: 'User',
                    columns: [
                        { name: 'id', type: 'INT',isPK: true, isNullable: false},
                        { name: 'username', type: 'VARCHAR',isPK: false, isNullable: false },
                        { name: 'email', type: 'VARCHAR',isPK: false, isNullable: false}
                    ]
                }
            },
        ],
        edges: [],
        selectedNodeId: null,
        selectedEdgeId:null,
        currentProjectId: null,
        projectName: 'Untitled Diagram',
        loadProject: (project) => {
                set({
                    nodes: project.nodes || [],
                    edges: project.edges || [],
                    currentProjectId: project._id,
                    projectName: project.name
                });
            },
        setSelectedNode:(nodeId)=>{
            set({
                selectedNodeId:nodeId,
                selectedEdgeId:null,
            });
        },
        setSelectedEdge:(edgeId)=>{
            set({
                selectedEdgeId:edgeId,
                selectedNodeId:null
            })
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
        resetCanvas: () => {
            set({
                nodes: INITIAL_NODES, 
                edges: [],
                currentProjectId: null,
                projectName: 'Untitled Diagram',
                selectedNodeId: null,
                selectedEdgeId: null
            });
        },
        setProjectName: (name) => set({ projectName: name }),
        addColumn:(nodeId)=>{
            set({
                nodes:get().nodes.map((node)=>{
                    if(nodeId==node.id){
                        const newCol={
                            name:`new_col_${node.data.columns.length + 1}`,
                            type: 'VARCHAR',
                            isPK: false,
                            isNullable: true
                        }
                        return{
                            ...node,
                            data:{
                                ...node.data,
                                columns:[...node.data.columns,newCol]   
                            }
                        }
                    }
                    return node;
                })
            })
        },
        updateColumn:(nodeId,columnIndex,field,value)=>{
            set({
                nodes:get().nodes.map((node)=>{
                    if(nodeId==node.id){
                        const newColumns=node.data.columns.map((col,idx)=>{
                            if(idx==columnIndex){
                                return{
                                    ...col,
                                    [field]:value,
                                }
                            }
                            return col
                        })
                        return{
                            ...node,
                            data:{
                                ...node.data,
                                columns:newColumns
                            }
                        }
                    }
                    return node;
                })
            })
        },
        deleteColumn:(nodeId,colIndex)=>{
            set({
                nodes:get().nodes.map((node)=>{
                    if(nodeId==node.id){
                        const newColumns=node.data.columns.filter((col,idx)=>{
                            return idx!=colIndex
                        })
                        return{
                            ...node,
                            data:{
                                ...node.data,
                                columns:newColumns
                            }
                        }
                    }
                    return node
                })
            })
        },

        deleteTable: (nodeId) => {
            set({
                nodes: get().nodes.filter((node) => node.id !== nodeId),
                edges: get().edges.filter((edge) => 
                    edge.source !== nodeId && edge.target !== nodeId
                ),
                selectedNodeId: null, 
                selectedEdgeId: null,
            })
        },
        setPrimaryKey:(nodeId,colIndex)=>{
            set({
                nodes:get().nodes.map((node)=>{
                    if(nodeId==node.id){
                        const newColumns=node.data.columns.map((col,idx)=>{
                            if(idx==colIndex){
                                return {...col,isPK:true,isNullable:false}
                            }
                            return{...col,isPK:false}
                        })
                        return{
                            ...node,
                            data:{
                                ...node.data,
                                columns:newColumns
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
                edges: addEdge({
                    ...connection,
                    type:'smoothstep',
                    animated:true,
                    markerEnd:{
                        type:MarkerType.ArrowClosed,
                        width:20,
                        height:20,
                    },
                    data:{label:'1:N'}
                },get().edges),
            });
        },
        updateEdgeLabel:(edgeId,label)=>{
            set({
                edges:get().edges.map((edge)=>{
                    if(edgeId==edge.id){
                        let newMarkerEnd = { type: MarkerType.ArrowClosed, width: 20, height: 20 };
                        let newMarkerStart = undefined;
                        if (label === 'N:1') {
                            newMarkerEnd = undefined;
                            newMarkerStart = { type: MarkerType.ArrowClosed, width: 20, height: 20 };
                        }
                        else if (label === '1:1') {
                            newMarkerEnd = { type: MarkerType.Arrow, width: 20, height: 20 };
                        }
                        return {
                            ...edge,
                            markerEnd: newMarkerEnd,
                            markerStart: newMarkerStart,
                            data: { ...edge.data, label: label }
                        };
                    }
                    return edge
                })
            })
        },
        deleteEdge:(edgeId)=>{
            set({
                edges:get().edges.filter((edge)=>edge.id !==edgeId),
                selectedEdgeId:null
            })
        },
        addNewTable:()=>{
            const currentNodes=get().nodes;
            const newTableId = `table_${Date.now()}`;
            const newNode = {
                id: newTableId,
                type: 'tableNode',
                position: { x: 100, y: 100 },
                data: {
                    label: `New Table ${currentNodes.length + 1}`,
                    columns: [{ name: 'id', type: 'INT',isPK: true, isNullable: false }]
                }
            };
            set({
                nodes: [...currentNodes, newNode]
            });
        },
        clearCanvas: () => {
            if(window.confirm("Are you sure you want to clear the entire diagram? This cannot be undone.")){
                set({
                    nodes: [],
                    edges: [],
                    selectedNodeId: null,
                    selectedEdgeId: null
                });
            }
        },   
    }),
    {
    name: 'db-design-storage', 
    storage: createJSONStorage(() => localStorage), 
    }
))