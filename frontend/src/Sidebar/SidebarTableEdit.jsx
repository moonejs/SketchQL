import {useStore} from '../Store/store'
export default function SidebarTableEdit({node}){
const selectedNodeId = useStore((state) => state.selectedNodeId);
const setSelectedNode = useStore((state) => state.setSelectedNode); 
const updateNodeLabel = useStore((state) => state.updateNodeLabel);
const addColumn=useStore((state)=>state.addColumn)
const updateColumn=useStore((state)=>state.updateColumn)
const deleteColumn=useStore((state)=> state.deleteColumn)
const deleteTable=useStore((state)=>state.deleteTable)



const isSelected=selectedNodeId===node.id;
const handleLabelChange = (e) => {
    updateNodeLabel(node.id, e.target.value);
  };

const handleColumnChange=(index,field,value)=>{
  updateColumn(node.id,index,field,value)
}

const handleDeleteTable=()=>{
  if (window.confirm(`Are you sure you want to delete the table "${node.data.label}"?`)) {
      deleteTable(node.id);
    }
}

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
                    <button 
                    className="btn btn-sm btn-outline-danger"
                    onClick={handleDeleteTable}
                    >
              Delete Table
            </button>
                </div>
            </div>
            <label className="form-label fw-bold small">Columns</label>
        <div className="d-flex flex-column gap-2 mb-3">
          {node.data.columns.map((col, index) => (
            <div className="d-flex gap-2" key={index}>
              <input
                type="text"
                className="form-control form-control-sm"
                value={col.name}
                onChange={(e)=>handleColumnChange(index,'name',e.target.value)} 
              />
              <input
                type="text"
                className="form-control form-control-sm"
                value={col.type}
                onChange={(e)=>handleColumnChange(index,'type',e.target.value)} 
              />
              <button 
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => deleteColumn(node.id, index)}
                >del</button>
            </div>
          ))}
        </div>
        <div className="d-flex gap-2">
         
          <button 
            className="btn btn-sm btn-primary"
            onClick={() => addColumn(node.id)} 
          >
            Add Column
          </button>
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