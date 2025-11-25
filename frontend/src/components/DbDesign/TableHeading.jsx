export default function TableHeading({label,index}){

    return(
        <thead >
            <tr >
                <th scope="col" id="class" className="p-2" colSpan={2}>{label} </th>
            </tr>
        </thead>
    )
}