import { useStore } from '../../Store/store';


export default function SidebarEdgeEdit({edge}){
    const updateEdgeLabel = useStore((state) => state.updateEdgeLabel);
    const deleteEdge = useStore((state) => state.deleteEdge);
    const handleTypeChange = (e) => {
        updateEdgeLabel(edge.id, e.target.value);
    };
    return (
        <div className="container bg-light border border-secondary-subtle rounded-2 p-3">
            <h6 className="fw-bold mb-3">Relationship Details</h6>
            
            <div className="mb-3">
                <label className="form-label small text-muted">Type</label>
                <select 
                    className="form-select form-select-sm"
                    value={edge.data?.label || '1:N'}
                    onChange={handleTypeChange}
                >
                    <option value="1:1">One to One (1:1)</option>
                    <option value="1:N">One to Many (1:N)</option>
                    <option value="N:1">Many to One (N:1)</option>
                </select>
            </div>

            <div className="alert alert-info small p-2">
                <div className="fw-bold">Source:</div>
                {edge.sourceHandle}
                <div className="fw-bold mt-1">Target:</div>
                {edge.targetHandle}
            </div>
            <div className="d-grid mt-4">
                 
                 <button 
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => deleteEdge(edge.id)}
                >
                    Delete Relationship
                </button>
            </div>
        </div>
    );
}