function TableHeader() {

    // responsinle for rendering the head of the table with the appropriate columns.
    return (
        <thead>
            <tr>
                <th>Name</th>
                <th>URL</th>
                <th>Remove</th>
            </tr>
        </thead>
    )
}

const TableBody = (props) => {

    // responsible for rendering the data for the table.
    const rows = props.linkData.map((row, index) => {
        return (
            <tr key={index}>
                <td>
                    {row.linkName}
                </td>
                <td>
                    <a href={row.linkURL}>{row.linkURL}</a>
                </td>
                <td>
                    <button onClick={() => props.removeLink(index)}>Delete</button>
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
        <table>
            <TableHeader />
            <TableBody linkData={props.linkData} removeLink={props.removeLink} />
        </table>
    )

}

export default Table