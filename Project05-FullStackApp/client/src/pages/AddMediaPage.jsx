import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Form from '../components/Form'
import * as api from '../api'
import { toPayload } from '../utils/media'
import * as ui from '../styles/ui'

// default empty values used when adding a new media item
const emptyForm = {
    title: '',
    image_url: '',
    media_type: '',
    genre: '',
    status: '',
    rating: '',
    release_year: '',
    notes: '',
}

function AddMediaPage() {
    const navigate = useNavigate()

    const [error, setError] = useState('')

    // handles form submission for creating a new item
    const handleSubmit = async (formValues) => {
        const payload = toPayload(formValues)

        setError('')
        try {
            await api.createMedia(payload)
            navigate('/')
        } catch (e) {
            setError(e.message)
        }
    }

    return (
        <div className={ui.pageShell}>
            <div className="mx-auto max-w-5xl px-4 py-10">
                <button
                    type="button"
                    className="text-md px-2 mb-2 font-medium text-white bg-slate-500 tansition hover:text-black hover:bg-red-400"
                >
                    <Link to="/">Return to library</Link>
                </button>
                <h1 className={ui.heading}>Add new media</h1>

                {/* display error if request fails */}
                {error && (
                    <div className="mb-6 rounded-xl border border-red-400/20 bg-red-950/30 px-4 py-3 text-sm text-red-300">
                        {error}
                    </div>
                )}

                {/* reusable form in add mode */}
                <Form
                    key="add"
                    initialValues={emptyForm}
                    isEditing={false}
                    onSubmit={handleSubmit}
                    onCancelEdit={null}
                    onCancelAdd={() => navigate('/')}
                />
            </div>
        </div>
    )
}

export default AddMediaPage