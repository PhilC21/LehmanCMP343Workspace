import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import MediaTable from './MediaTable'
import Form from './Form'
import * as api from '../api'
import { toPayload } from '../utils/media'

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
        <div className="media-app">
            <h1>Media Tracker</h1>
            <p className="media-lead">
                Keep track of various forms of media that you have or are planning to consume.
                This includes movies, books, and video games.
            </p>

            {/* display error message if something fails */}
            {error && <p className="media-error" role="alert">{error}</p>}

            {/* Show add button once data is loaded */}
            {!loading && (
                <Link to="/addmedia" className="btn-add-media">
                    Add New Media
                </Link>
            )}

            {/* show loading state vs table display */}
            {loading ? (
                <p>Loading...</p>
            ) : (
                <MediaTable
                    items={items}
                    onDelete={handleDelete}
                    onEdit={handleEdit}
                    editingId={editingItem?.id ?? null}
                />
            )}

            {/* edit modal; only shows when editing an item */}
            {editingItem && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <p className="media-breadcrumb">
                            <button
                                type="button"
                                className="link-button"
                                onClick={handleCancelEdit}
                            >
                                Close Edit
                            </button>
                        </p>

                        <h2>Edit Media Item</h2>

                        {/* reusable form in edit mode */}
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