import {useStore} from '../Store/store'
export default function SidebarTableEdit({node}){
const selectedNodeId = useStore((state) => state.selectedNodeId);
const setSelectedNode = useStore((state) => state.setSelectedNode); 
  const updateNodeLabel = useStore((state) => state.updateNodeLabel);

    const isSelected=selectedNodeId===node.id;
    const handleLabelChange = (e) => {
    updateNodeLabel(node.id, e.target.value);
  };
    if(isSelected){
        return(
             <div className="container bg-danger-subtle border border-primary">
            <div className="row">
                <div className="col-6">
                   <input 
                    type="text" 
                    className="form-control form-control-sm mb-2" 
                    value={node.data.label}
                    onChange={handleLabelChange}
                    />
                </div>
                <div className="col-6 ">
                    hel
                </div>
            </div>
            <div className="row">
                <div className="d-flex gap-2 mb-2">
                    <input 
                    type="text" 
                    className="form-control form-control-sm" 
                    value="id" 
                    readOnly 
                    />
                    <input 
                    type="text" 
                    className="form-control form-control-sm" 
                    value="bigint" 
                    readOnly 
                    />
                </div>
            </div>
            
        </div>
        )
    }
   return (
    <div
      className="list-group-item list-group-item-action d-flex justify-content-between align-items-center rounded-2 mb-1 border-0"
      onClick={() => setSelectedNode(node.id)}
      style={{ cursor: 'pointer' }}
    >
      <span>{node.data.label}</span>
      <button className="btn btn-sm border-0 p-0 text-muted">...</button>
    </div>
  );

}