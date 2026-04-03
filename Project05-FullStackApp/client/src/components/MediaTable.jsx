import * as ui from '../styles/ui'

// converts database values into user-friendly labels
const formatStatus = (status) => {
    switch (status) {
        case 'planned':
            return 'Planned'
        case 'in_progress':
            return 'In Progress'
        case 'completed':
            return 'Completed'
        case 'dropped':
            return 'Dropped'
        default:
            return status || '—'
    }
}

function TableHeader() {
    // responsible for rendering the head of the table
    // with the correct column labels for each media item field
    return (
        <thead className="bg-[#70163C]/60">
            <tr>
                <th className={ui.tableHeaderCell}>Title</th>
                <th className={ui.tableHeaderCell}>Type</th>
                <th className={ui.tableHeaderCell}>Genre</th>
                <th className={ui.tableHeaderCell}>Status</th>
                <th className={ui.tableHeaderCell}>Rating</th>
                <th className={ui.tableHeaderCell}>Year</th>
                <th className={ui.tableHeaderCell}>Image</th>
                <th className={ui.tableHeaderCell}>Actions</th>
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
                    <td className="px-4 py-10 text-center text-sm text-[#95B2B8]" colSpan={8}>No items yet.</td>
                </tr>
            </tbody>
        )
    }

    // responsible for rendering the table data row by row
    return (
        <tbody>
            {items.map((row) => (
                <tr
                    key={row.id}
                    className={`border-t border-[#95B2B8]/10 transition ${editingId === row.id ? 'bg-[#70163C]/30' : 'hover:bg-[#70163C]/20'
                        }`}
                >
                    <td className={ui.tableCell}>
                        <div className="font-medium text-white">{row.title}</div>
                    </td>

                    <td className={`${ui.tableCell} capitalize`}>
                        {row.media_type}
                    </td>

                    <td className={ui.tableCell}>
                        {row.genre || '—'}
                    </td>

                    <td className={ui.tableCell}>
                        <span
                            className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium border ${
                                row.status === 'planned'
                                    ? 'bg-[#95B2B8]/10 text-[#95B2B8] border-[#95B2B8]/30'
                                    : row.status === 'in_progress'
                                        ? 'bg-yellow-500/10 text-yellow-300 border-yellow-500/30'
                                        : row.status === 'completed'
                                            ? 'bg-green-500/10 text-green-300 border-green-500/30'
                                            : row.status === 'dropped'
                                                ? 'bg-red-500/10 text-red-300 border-red-500/30'
                                                : 'bg-[#120309] text-white border-[#95B2B8]/20'
                            }`}
                        >
                            {formatStatus(row.status)}
                        </span>
                    </td>

                    <td className={ui.tableCell}>
                        {row.rating ?? '—'}
                    </td>

                    <td className={ui.tableCell}>
                        {row.release_year ?? '—'}
                    </td>

                    <td className={ui.tableCell}>
                        {row.image_url ? (
                            <a
                                href={row.image_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-[#95B2B8] underline underline-offset-4 hover:text-white"
                            >
                                <img
                                    src={row.image_url}
                                    alt={row.title}
                                    className="h-12 w-10 rounded object-cover"
                                />
                                View
                            </a>
                        ) : (
                            '—'
                        )}
                    </td>

                    <td className={ui.tableCell}>
                        <div className="flex flex-wrap gap-2">
                            <button
                                type="button"
                                onClick={() => onEdit(row)}
                                className={`${ui.actionBtn} bg-[#70163C] text-white hover:opacity-80`}
                            >
                                Edit
                            </button>

                            <button
                                type="button"
                                onClick={() => onDelete(row)}
                                className={`${ui.actionBtn} bg-red-800 text-white hover:bg-red-500`}
                            >
                                Delete
                            </button>
                        </div>
                    </td>
                </tr>
            ))}
        </tbody>
    )
}

// combine the header and body into one reusable table component
function MediaTable(props) {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full border-separate border-spacing-0">
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