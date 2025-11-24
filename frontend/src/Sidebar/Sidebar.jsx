import SidebarHeading from "./SidebarHeading.jsx";
import { useStore } from '../Store/store';
import SidebarTableEdit from "./SidebarTableEdit.jsx";
import SidebarEdgeEdit from "./SidebarEdgeEdit.jsx";

export default function Sidebar() {
    const nodes = useStore((state) => state.nodes);
    const edges = useStore((state) => state.edges); 
    const selectedEdgeId = useStore((state) => state.selectedEdgeId); 


    const selectedEdge = edges.find(e => e.id === selectedEdgeId);

    return (
        <div className="h-100 shadow-lg bg-light" style={{ overflowY: 'auto' }}>
            <SidebarHeading />
            
            <div className="p-3">
                
                {selectedEdge && (
                   <div className="mb-3">
                       <SidebarEdgeEdit edge={selectedEdge} />
                       <hr />
                   </div>
                )}

               
                <ul className="list-group list-group-flush">
                    {nodes.length === 0 ? (
                        <li className="list-group-item text-center text-muted border-0 bg-transparent">
                            Click "Add" to start
                        </li>
                    ) : (
                        nodes.map((node) => (
                            <SidebarTableEdit key={node.id} node={node} />
                        ))
                    )}
                </ul>
            </div>
        </div>
    )
}