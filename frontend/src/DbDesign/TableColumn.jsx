import { Position, Handle } from '@xyflow/react';

export default function TableColumn({ col }) {
    return (
        <tr className="column-row">
            <th className="p-2 position-relative">
                <Handle type="both" position={Position.Left} id={`${col.name}-left`} className="column-handle"/>
                {col.name}
            </th>

            <td className="p-2 text-muted fs-6 position-relative">
                <Handle type="both" position={Position.Right} id={`${col.name}-right`} className="column-handle"/>
                {col.type}
            </td>

        </tr>
    );
}
