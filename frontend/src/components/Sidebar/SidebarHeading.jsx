import { useStore } from '../../Store/store';

export default function SidebarHeading(){
    const addNewTable = useStore((state) => state.addNewTable);
    return(
        <div className="container bg-warning-subtle py-2 shadow-lg">
            <div className="row">
                <div className="col-6">
                    Table
                </div>
                <div className="col-6 ">
                    <button className="btn-primary "onClick={addNewTable}>Add</button>
                </div>
            </div>
        </div>
    )
}