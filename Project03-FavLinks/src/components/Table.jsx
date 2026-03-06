function TableHeader() {

    // responsible for rendering the head of the table with the appropriate columns.
    return (
        <thead>
            <tr className="bg-purple-600 text-white">
                <th className="text-left py-3 px-4">Name</th>
                <th className="text-left py-3 px-4">URL</th>
                <th className="text-left py-3 px-4">Remove</th>
            </tr>
        </thead>
    )
}

const TableBody = (props) => {

    // responsible for rendering the data for the table.
    const rows = props.linkData.map((row, index) => {
        return (
            <tr key={index} className="border-b border-slate-200 bg-slate-50 even:bg-white">
                <td className="py-3 px-4">{row.linkName}</td>
                <td className="py-3 px-4">
                    <a href={row.linkURL} target="_blank" rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 hover:underline"
                    >
                        {row.linkURL}
                    </a>
                </td>
                <td className="py-3 px-4">
                    <button type="button" onClick={() => props.removeLink(index)}
                    className="px-3 py-1.5 text-sm font-medium text-white bg-red-500 hover:bg-red-700 rounded"
                    >
                        Delete
                    </button>
                </td>
            </tr>
        )
    })

    return (
        <tbody>
            {rows}
        </tbody>
    )

}

function Table(props) {

    // function handleRemove(index) {
    //     console.log("button clicked: ", index)
    // }

    return (
        <table className="w-full border border-slate-200 rounded-lg overflow-hidden shadow-sm">
            <TableHeader />
            <TableBody linkData={props.linkData} removeLink={props.removeLink} />
        </table>
    )

}

export default Table