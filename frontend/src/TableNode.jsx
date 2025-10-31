import { Handle, Position } from '@xyflow/react';
import NodeColumn from './NodeColumn';
export default function TableNode({data}){
    return(
        <div>
            <div>
                {data.label}
            </div>
            <NodeColumn columns={data.columns} />

        </div>
    )
}