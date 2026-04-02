import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Form from '../components/Form'
import * as api from '../api'
import { toPayload } from '../utils/media'

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
        <div className="media-app">
            <p className="media-breadcrumb">
                <Link to="/">Return to library</Link>
            </p>
            <h1>Add new media</h1>

            {/* display error if request fails */}
            {error && <p className="media-error" role="alert">{error}</p>}

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
    )
}

export default AddMediaPage