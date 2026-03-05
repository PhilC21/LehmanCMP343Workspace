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

function TableBody() {

    // responsible for rendering the data for the table.
    return (
        <tbody>
            
        </tbody>
    )

}

function Table() {

    return (
        <table>
            <TableHeader />
            <TableBody />
        </table>
    )

}

export default Table