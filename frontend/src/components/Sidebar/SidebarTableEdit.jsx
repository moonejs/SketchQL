import { useStore, DATA_TYPES } from '../../Store/store';

export default function SidebarTableEdit({ node }) {
    const selectedNodeId = useStore((state) => state.selectedNodeId);
    const setSelectedNode = useStore((state) => state.setSelectedNode);
    const updateNodeLabel = useStore((state) => state.updateNodeLabel);
    const addColumn = useStore((state) => state.addColumn);
    const updateColumn = useStore((state) => state.updateColumn);
    const deleteColumn = useStore((state) => state.deleteColumn);
    const deleteTable = useStore((state) => state.deleteTable);
    const setPrimaryKey = useStore((state) => state.setPrimaryKey);

    const isSelected = selectedNodeId === node.id;
    
    const handleLabelChange = (e) => {
        updateNodeLabel(node.id, e.target.value);
    };

    const handleColumnChange = (index, field, value) => {
        updateColumn(node.id, index, field, value);
    };

    const handleDeleteTable = () => {
        if (window.confirm(`Are you sure you want to delete the table "${node.data.label}"?`)) {
            deleteTable(node.id);
        }
    };

    if (isSelected) {
        return (
            <div className="container bg-light border border-primary-subtle rounded-2 p-3 mb-2">
                <div className="row mb-3">
                    <div className="col-7">
                        <label className="form-label fw-bold small">Table Name</label>
                        <input
                            type="text"
                            className="form-control form-control-sm"
                            value={node.data.label}
                            onChange={handleLabelChange}
                        />
                    </div>
                    <div className="col-5 d-flex align-items-end justify-content-end">
                        <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={handleDeleteTable}
                        >
                            Delete Table
                        </button>
                    </div>
                </div>


                <div className="d-flex gap-2 mb-1 small text-muted">
                    <div style={{ flex: 3 }}>Name</div>
                    <div style={{ flex: 2 }}>Type</div>
                    <div style={{ flex: 1 }} className="text-center">PK</div>
                    <div style={{ flex: 1 }} className="text-center">NN</div>
                    <div style={{ width: '30px' }}></div>
                </div>

                <div className="d-flex flex-column gap-2 mb-3">
                    {node.data.columns.map((col, index) => (
                        <div className="d-flex gap-2 align-items-center" key={index}>

                            <input
                                type="text"
                                style={{ flex: 3 }}
                                className="form-control form-control-sm"
                                value={col.name}
                                onChange={(e) => handleColumnChange(index, 'name', e.target.value)}
                            />

                            <select
                                style={{ flex: 2 }}
                                className="form-select form-select-sm"
                                value={col.type}
                                onChange={(e) => handleColumnChange(index, 'type', e.target.value)}
                            >
                                {DATA_TYPES.map((type) => (
                                    <option key={type} value={type}>{type}</option>
                                ))}
                            </select>

                            <div style={{ flex: 1 }} className="text-center">
                                <input
                                    type="radio"
                                    className="form-check-input"
                                    name={`${node.id}_pk_group`}
                                    checked={col.isPK || false}
                                    onChange={() => setPrimaryKey(node.id, index)}
                                />
                            </div>

         
                            <div style={{ flex: 1 }} className="text-center">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    checked={!col.isNullable}
                                    disabled={col.isPK}
                                    onChange={(e) => handleColumnChange(index, 'isNullable', !e.target.checked)}
                                />
                            </div>


                            <button
                                style={{ width: '30px' }}
                                className="btn btn-sm btn-outline-danger p-1"
                                onClick={() => deleteColumn(node.id, index)}
                            >
                                X
                            </button>
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
        <li
            className="list-group-item list-group-item-action d-flex justify-content-between align-items-center rounded-2 mb-1 border-0"
            onClick={() => setSelectedNode(node.id)}
            style={{ cursor: 'pointer' }}
        >
            <span>{node.data.label}</span>
            <button className="btn btn-sm border-0 p-0 text-muted">...</button>
        </li>
    );
}