export default function TableHeading({label,color}){
    const headerColor = color || '#0d6efd';
    return (
        <thead>
            <tr>
                <th 
                    scope="col" 
                    className="p-2 text-white text-center position-relative" 
                    colSpan={2}
                    style={{ 
                        backgroundColor: headerColor,
                        border: 'none' 
                    }}
                >
                    {label} 
                </th>
            </tr>
        </thead>
    )

}