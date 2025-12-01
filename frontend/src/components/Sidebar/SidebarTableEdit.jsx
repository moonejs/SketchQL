  import { useStore, DATA_TYPES } from "../../Store/store";

  export default function SidebarTableEdit({ node }) {
    const addColumn = useStore((state) => state.addColumn);
    const updateColumn = useStore((state) => state.updateColumn);
    const deleteColumn = useStore((state) => state.deleteColumn);
    const setPrimaryKey = useStore((state) => state.setPrimaryKey);

    if (!node) return null;

    const themeColor = "#20c996ff"; 

    return (
      <div className="bg-white border-start border-end border-bottom">
        
        <div className="p-2 d-flex flex-column gap-2">
          {node.data.columns.map((col, index) => (
            <div key={index} className="d-flex align-items-center gap-2">
              <input
                type="text"
                className="form-control form-control-sm border-secondary-subtle"
                value={col.name}
                placeholder="name"
                onChange={(e) => updateColumn(node.id, index, 'name', e.target.value)}
                style={{ flex: 2, height: '32px' }}
              />
              <div style={{ flex: 1.5 }}>
                  <input
                      list="dataTypes"
                      className="form-control form-control-sm border-secondary-subtle"
                      value={col.type}
                      placeholder="type"
                      onChange={(e) => updateColumn(node.id, index, 'type', e.target.value)}
                      style={{ height: '32px' }}
                  />
                  
                  <datalist id="dataTypes">
                      {DATA_TYPES.map((t) => (
                          <option key={t} value={t} />
                      ))}
                  </datalist>
              </div>
              <button 
                  className="border-0   fw-bold"
                  style={{ 
                      width: '24px', 
                      color: col.isNullable ? themeColor : '#adb5bd'
                  }}
                  title="Toggle Nullable"
                  onClick={() => updateColumn(node.id, index, 'isNullable', !col.isNullable)}
              >
                  N
              </button>

              <button 
                  className="border-0 bg-transparent p-0" 
                  style={{ 
                      width: '20px',
                      color: col.isPK ? themeColor : '#adb5bd',
                      cursor: 'pointer'
                  }}
                  title="Toggle Primary Key"
                  onClick={() => setPrimaryKey(node.id, index)}
              >

                  <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      height="20px" 
                      viewBox="0 -960 960 960" 
                      width="24px" 
                      fill="currentColor" 
                  >
                      <path d="M280-400q-33 0-56.5-23.5T200-480q0-33 23.5-56.5T280-560q33 0 56.5 23.5T360-480q0 33-23.5 56.5T280-400Zm0 160q-100 0-170-70T40-480q0-100 70-170t170-70q67 0 121.5 33t86.5 87h352l120 120-180 180-80-60-80 60-85-60h-47q-32 54-86.5 87T280-240Zm0-80q56 0 98.5-34t56.5-86h125l58 41 82-61 71 55 75-75-40-40H435q-14-52-56.5-86T280-640q-66 0-113 47t-47 113q0 66 47 113t113 47Z"/>
                  </svg>
              </button>
              <div className="dropdown">
                  <button 
                      className="border-0 bg-transparent text-muted p-0" 
                      type="button" 
                      data-bs-toggle="dropdown"
                      style={{ width: '20px' }}
                  >
                      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#7f7878ff"><path d="M480-160q-33 0-56.5-23.5T400-240q0-33 23.5-56.5T480-320q33 0 56.5 23.5T560-240q0 33-23.5 56.5T480-160Zm0-240q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm0-240q-33 0-56.5-23.5T400-720q0-33 23.5-56.5T480-800q33 0 56.5 23.5T560-720q0 33-23.5 56.5T480-640Z"/></svg>
                  </button>
                  <ul className="dropdown-menu dropend shadow-sm border-0">
                      <li>
                          <button className="dropdown-item text-danger fw-bolder bg-primary rounded-1 " onClick={() => deleteColumn(node.id, index)}>
                              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg> Delete column
                          </button>
                      </li>
                  </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="d-flex justify-content-end gap-2 p-2 border-top mt-1">
          
          <button 
              className="btn rounded-1  fw-bolder px-2 py-2" 
              style={{ 
                  border: `1px solid ${themeColor}`, 
                  color: themeColor,
                  fontSize: '0.9rem' 
              }}
              onClick={() => addColumn(node.id)}
          >
              Add Column
          </button>
        </div>
      </div>
    );
  }