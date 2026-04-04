import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import MediaTable from './MediaTable'
import * as api from '../api'
import { toPayload } from '../utils/media'
import * as ui from '../styles/ui'
import EditItemModal from './EditItemModal'
import DetailedViewModal from './DetailedViewModal'

function MediaContainer() {
    // all media items to be displayed in the table
    const [items, setItems] = useState([])

    // control UI state
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    // store info for edit and view modals; null = modal is closed
    const [editingItem, setEditingItem] = useState(null)
    const [selectedItem, setSelectedItem] = useState(null)

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

    // open edit modal and ensure details modal is closed
    const handleEdit = (item) => {
        setSelectedItem(null)
        setEditingItem(item)
    }

    // close the edit modal
    const handleCancelEdit = () => {
        setEditingItem(null)
    }

    // open detailed view modal and ensure edit modal is closed
    const handleView = (item) => {
        setEditingItem(null)
        setSelectedItem(item)
    }

    // close details modal
    const handleCloseDetails = () => {
        setSelectedItem(null)
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
                            onView={handleView}
                            editingId={editingItem?.id ?? null}
                        />
                    )}
                </section>
            </div>

            <EditItemModal
                item={editingItem}
                onClose={handleCancelEdit}
                onSubmit={handleEditSubmit}
            />

            <DetailedViewModal
                item={selectedItem}
                onClose={handleCloseDetails}
            />
        </div>
    )
}

export default MediaContainer