import * as ui from '../styles/ui'
import { formatStatus, getStatusStyles } from '../utils/media'

// format timestamps into a readable date/time string
const formatDateTime = (value) => {
    if (!value) return '—'

    return new Date(value).toLocaleString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
    })
}

function DetailedViewModal({ item, onClose }) {
    if (!item) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
            <div className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl border border-[#95B2B8]/20 bg-[#2E0F15] p-6 shadow-2xl">
                <div className="mb-6 flex items-center justify-between gap-4">
                    <h2 className={`${ui.subheading} text-left`}>
                        {item.title}
                    </h2>

                    <button
                        type="button"
                        className="text-md px-4 font-sm text-white bg-slate-500 tansition hover:text-black hover:bg-red-400"
                        onClick={onClose}
                    >
                        Close
                    </button>
                </div>

                <div className="grid gap-6 md:grid-cols-[260px_1fr]">
                    <div>
                        {item.image_url ? (
                            <a
                                href={item.image_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block"
                            >
                                <img
                                    src={item.image_url}
                                    alt={item.title}
                                    className="w-full rounded-xl border border-[#95B2B8]/20 object-cover shadow-lg"
                                />
                            </a>
                        ) : (
                            <div className="flex h-80 items-center justify-center rounded-xl border border-[#95B2B8]/20 bg-[#120309] text-sm text-[#95B2B8]">
                                No image available
                            </div>
                        )}
                    </div>

                    <div className="space-y-5">
                        <div className="grid gap-4 sm:grid-cols-2">
                            <div>
                                <p className="text-sm font-medium text-[#95B2B8]">Type:</p>
                                <p className="mt-1 text-white capitalize">{item.media_type || '—'}</p>
                            </div>

                            <div>
                                <p className="text-sm font-medium text-[#95B2B8]">Genre:</p>
                                <p className="mt-1 text-white">{item.genre || '—'}</p>
                            </div>

                            <div>
                                <p className="text-sm font-medium text-[#95B2B8]">Status:</p>
                                <span
                                    className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium border ${getStatusStyles(item.status)}`}
                                >
                                    {formatStatus(item.status)}
                                </span>
                            </div>

                            <div>
                                <p className="text-sm font-medium text-[#95B2B8]">Rating:</p>
                                <p className="mt-1 text-white">{item.rating ?? '—'}</p>
                            </div>

                            <div>
                                <p className="text-sm font-medium text-[#95B2B8]">Release Year:</p>
                                <p className="mt-1 text-white">{item.release_year ?? '—'}</p>
                            </div>
                        </div>

                        <div>
                            <p className="text-sm font-medium text-[#95B2B8]">Notes:</p>
                            <div className="mt-2 rounded-xl border border-[#95B2B8]/15 bg-[#120309] p-4 text-white">
                                {item.notes || 'No notes available.'}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-6 border-t border-[#95B2B8]/15 pt-4 text-sm text-[#95B2B8]/80">
                    <p>Created: {formatDateTime(item.created_at)}</p>
                    <p>
                        Updated: {item.updated_at ? formatDateTime(item.updated_at) : 'Never updated'}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default DetailedViewModal