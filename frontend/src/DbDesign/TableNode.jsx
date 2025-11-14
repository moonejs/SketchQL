import { Handle, Position } from '@xyflow/react';
import TableHeading from './TableHeading';
import TableColumn from './TableColumn';
export default function TableNode({data}){
    return(
        <table className="table table-bordered table-sm m-0 ">
            <TableHeading label={data.label}/>
            <tbody>
                {data.columns.map((col,index)=>(
                    <TableColumn col={col} key={index}/>
                ))}
            </tbody>
        </table>

    )
}