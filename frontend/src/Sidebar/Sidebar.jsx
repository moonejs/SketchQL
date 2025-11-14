import SidebarHeading from "./SidebarHeading.jsx"
import { useStore } from '../Store/store';

export default function Sidebar(){
    const nodes = useStore((state) => state.nodes);
    return(
        <div className="h-100 shadow-lg">
            <SidebarHeading></SidebarHeading>

        </div>
    )
}