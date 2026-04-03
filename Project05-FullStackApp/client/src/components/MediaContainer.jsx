import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import MediaTable from './MediaTable'
import Form from './Form'
import * as api from '../api'
import { toPayload } from '../utils/media'
import * as ui from '../styles/ui'

// prepare data from the database to be safely used by the form
// make sure there are no undifined values
const toFormValues = (item) => ({
    title: item.title ?? '',
    image_url: item.image_url ?? '',
    media_type: item.media_type ?? '',
    genre: item.genre ?? '',
    status: item.status ?? '',
    rating: item.rating ?? '',
    release_year: item.release_year ?? '',
    notes: item.notes ?? '',
})

function MediaContainer() {
    // all media items to be displayed in the table
    const [items, setItems] = useState([])

    // control UI state
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    // store item currently being edited; null = modal is closed
    const [editingItem, setEditingItem] = useState(null)

    // grab all items from the db
    const load = async () => {
        setError('')
        setLoading(true)
        try {
            const data = await api.getAllMedia()
            setItems(Array.isArray(data) ? data : [])
        } catch (e) {
            setError(e.message)
        } finally {
            setLoading(false)
        }
    }

    // run once when component mounts
    useEffect(() => {
        load()
    }, [])

    // delete an item from both the db and the UI
    const handleDelete = async (item) => {
        const ok = window.confirm(`Delete "${item.title}"?`)
        if (!ok) {
            return // do nothing if cancelled
        }

        setError('')
        try {
            await api.deleteMedia(item.id)

            // immediately update UI
            setItems((prev) => prev.filter((row) => row.id !== item.id))

            // close modal if the deleted item was being edited
            if (editingItem?.id === item.id) {
                setEditingItem(null)
            }
        } catch (e) {
            setError(e.message)
        }
    }

    // open the edit modal for the selected item
    const handleEdit = (item) => {
        setEditingItem(item)
    }

    // close the edit modal
    const handleCancelEdit = () => {
        setEditingItem(null)
    }

    // handles updating an item
    const handleEditSubmit = async (formValues) => {
        if (!editingItem) return

        const payload = toPayload(formValues)

        setError('')
        try {
            const updated = await api.updateMedia(editingItem.id, payload)

            setItems((prev) =>
                prev.map((row) => (row.id === editingItem.id ? updated : row))
            )

            setEditingItem(null)
        } catch (e) {
            setError(e.message)
        }
    }

    return (
        <div className={ui.pageShell}>
            <div className="mx-auto max-w-5xl px-4 py-10">
                <header className="mb-8">
                    <h1 className={`${ui.heading} text-4xl`}>Media Tracker</h1>
                    <p className={`mt-3 max-w-3xl text-base leading-7 ${ui.mutedText}`}>
                        Keep track of movies, books, and video games you are planning to
                        consume or have already finished.
                    </p>
                </header>

                {error && (
                    <div className="mb-6 rounded-xl border border-red-400/20 bg-red-950/30 px-4 py-3 text-sm text-red-300">
                        {error}
                    </div>
                )}

                {!loading && (
                    <div className="mb-6">
                        <Link to="/addmedia" className={ui.primaryBtn}>
                            Add New Media
                        </Link>
                    </div>
                )}

                <section className={`${ui.panel} overflow-hidden`}>
                    {loading ? (
                        <div className="px-6 py-8 text-[#95B2B8]">Loading...</div>
                    ) : (
                        <MediaTable
                            items={items}
                            onDelete={handleDelete}
                            onEdit={handleEdit}
                            editingId={editingItem?.id ?? null}
                        />
                    )}
                </section>
            </div>

            {editingItem && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
                    <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-[#95B2B8]/20 bg-[#2E0F15] p-6 shadow-2xl">
                        <div className="mb-5 flex items-center justify-between gap-4">
                            <button
                                type="button"
                                className="text-md px-4 font-medium text-white bg-slate-500 tansition hover:text-black hover:bg-red-400"
                                onClick={handleCancelEdit}
                            >
                                Close
                            </button>

                            <h2 className={`${ui.subheading} text-right`}>
                                Edit Media Item
                            </h2>
                        </div>

                        <Form
                            key={editingItem.id}
                            initialValues={toFormValues(editingItem)}
                            isEditing={true}
                            onSubmit={handleEditSubmit}
                            onCancelEdit={handleCancelEdit}
                            onCancelAdd={null}
                        />
                    </div>
                </div>
            )}
        </div>
    )
}

export default MediaContainer