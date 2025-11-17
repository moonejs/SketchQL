import SidebarHeading from "./SidebarHeading.jsx"
import { useStore } from '../Store/store';
import SidebarTableEdit from "./SidebarTableEdit.jsx";

export default function Sidebar(){
    const nodes = useStore((state) => state.nodes);
    return(
        <div className="h-100 shadow-lg">
            <SidebarHeading></SidebarHeading>
            {nodes.length==0 ?(
                <li className="list-group-item text-center text-muted border-0 bg-transparent">
                        Click "Add" to start
                    </li>
            ):(
                nodes.map((node)=>(
                    <SidebarTableEdit key={node.id} 
                    label={node.data.label}
                    />

                ))
            )}
        </div>
    )
}