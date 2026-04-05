import * as ui from '../styles/ui'
import { formatStatus, getStatusStyles } from '../utils/media'

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
                <th className={ui.tableHeaderCell}>Image</th>
                <th className={`${ui.tableHeaderCell} px-4 py-3 min-w-[180px]`}>Actions</th>
            </tr>
        </thead>
    )
}

function TableBody({ items, onDelete, onEdit, onView, editingId }) {

    // if there are no items yet, render a single row with a message
    if (items.length === 0) {
        return (
            <tbody>
                <tr>
                    <td className="px-4 py-10 text-center text-sm text-[#95B2B8]" colSpan={7}>No items yet.</td>
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
                    <td className={`${ui.tableCell} px-2 py-3 break-words`}>
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
                            className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium border whitespace-nowrap ${getStatusStyles(row.status)}`}
                        >
                            {formatStatus(row.status)}
                        </span>
                    </td>

                    <td className={ui.tableCell}>
                        {row.rating ?? '—'}
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
                            </a>
                        ) : (
                            '—'
                        )}
                    </td>

                    <td className={`{ui.tableCell} px-4 py-3 min-w-[180px]`}>
                        <div className="flex items-center gap-2 whitespace-nowrap">
                            <button
                                type="button"
                                onClick={() => onView(row)}
                                className={`${ui.actionBtn} border border-[#95B2B8]/30 bg-[#120309] text-[#95B2B8] hover:text-white`}
                            >
                                View
                            </button>

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
            <table className="min-w-full border-separate border-spacing-0 table-fixed">
                <TableHeader />
                <TableBody
                    items={props.items}
                    onDelete={props.onDelete}
                    onEdit={props.onEdit}
                    onView={props.onView}
                    editingId={props.editingId}
                />
            </table>
        </div>
    )
}

export default MediaTable