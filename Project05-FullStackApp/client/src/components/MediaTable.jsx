function TableHeader() {
    // responsible for rendering the head of the table
    // with the correct column labels for each media item field
    return (
        <thead>
            <tr>
                <th>Title</th>
                <th>Type</th>
                <th>Genre</th>
                <th>Status</th>
                <th>Rating</th>
                <th>Year</th>
                <th>Image</th>
                <th>Actions</th>
            </tr>
        </thead>
    )
}

function TableBody({ items, onDelete, onEdit, editingId }) {

    // if there are no items yet, render a single row with a message
    if (items.length === 0) {
        return (
            <tbody>
                <tr>
                    <td colSpan={8}>No items yet.</td>
                </tr>
            </tbody>
        )
    }

    // responsible for rendering the table data row by row
    return (
        <tbody>
            {items.map((row) => (
                <tr key={row.id} className={editingId === row.id ? 'row-active' : ''}>
                    <td>{row.title}</td>
                    <td>{row.media_type}</td>
                    <td>{row.genre}</td>
                    <td>{row.status}</td>
                    <td>{row.rating ?? '—'}</td>
                    <td>{row.release_year ?? '—'}</td>
                    <td>
                        {row.image_url ? (
                            <a href={row.image_url} target="_blank" rel="noopener noreferrer">
                                View Image
                            </a>
                        ) : (
                            '—'
                        )}
                    </td>
                    <td className="media-actions">
                        <button type="button" onClick={() => onEdit(row)}>
                            Edit
                        </button>
                        <button type="button" onClick={() => onDelete(row)}>
                            Delete
                        </button>
                    </td>
                </tr>
            ))}
        </tbody>
    )
}

// combine the header and body into one reusable table component
function MediaTable(props) {
    return (
        <div className="table-wrap">
            <table className="media-table">
                <TableHeader />
                <TableBody
                    items={props.items}
                    onDelete={props.onDelete}
                    onEdit={props.onEdit}
                    editingId={props.editingId}
                />
            </table>
        </div>
    )
}

export default MediaTable