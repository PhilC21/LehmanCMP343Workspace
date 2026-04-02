import { useState, useEffect } from 'react'

function Form({ initialValues, isEditing, onSubmit, onCancelEdit, onCancelAdd }) {
    
    // stores all form field values (controlled inputs)
    const [values, setValues] = useState(initialValues)

    // validation errors for required fields
    const [titleError, setTitleError] = useState('')
    const [mediaTypeError, setMediaTypeError] = useState('')
    const [statusError, setStatusError] = useState('')

    // update form values when editing a different item
    // and clear any previous validation errors
    useEffect(() => {
        setValues(initialValues)
        setTitleError('')
        setMediaTypeError('')
        setStatusError('')
    }, [initialValues])

    // handle changes for all form inputs
    // update the corresponding field and clears error if any
    const handleChange = (e) => {
        const { name, value } = e.target

        setValues((prev) => ({
            ...prev,
            [name]: value
        }))

        if (name === 'title') setTitleError('')
        if (name === 'media_type') setMediaTypeError('')
        if (name === 'status') setStatusError('')
    }

    // handle form submission for both add and edit
    const handleSubmit = (e) => {
        e.preventDefault()

        const trimmedTitle = values.title.trim()

        // set error messages if required fields are missing
        setTitleError(!trimmedTitle ? 'Title is required' : '')
        setMediaTypeError(!values.media_type ? 'Media type is required' : '')
        setStatusError(!values.status ? 'Status is required' : '')

        // do not submit if validation fails
        if (!trimmedTitle || !values.media_type || !values.status) {
            return
        }

        // pass valid data up to parent component
        onSubmit(values)

        // reset form only when adding a new item
        if (!isEditing) {
            setValues(initialValues)
        }
    }

    return (
        <form className="media-form" onSubmit={handleSubmit}>
            <label>Title: *</label>
            <input
                type="text"
                name="title"
                value={values.title}
                onChange={handleChange}
            />
            {titleError && <p className="field-error">{titleError}</p>}

            <label>Image URL:</label>
            <input
                type="url"
                name="image_url"
                value={values.image_url}
                onChange={handleChange}
            />

            <label>Media type: *</label>
            <select
                name="media_type"
                value={values.media_type}
                onChange={handleChange}
            >
                <option value="">Select type</option>
                <option value="book">Book</option>
                <option value="movie">Movie</option>
                <option value="game">Game</option>
            </select>
            {mediaTypeError && <p className="field-error">{mediaTypeError}</p>}

            <label>Genre:</label>
            <input
                type="text"
                name="genre"
                value={values.genre}
                onChange={handleChange}
            />

            <label>Status: *</label>
            <div className="radio-group">
                <label>
                    <input
                        type="radio"
                        name="status"
                        value="planned"
                        checked={values.status === 'planned'}
                        onChange={handleChange}
                    />
                    Planned
                </label>

                <label>
                    <input
                        type="radio"
                        name="status"
                        value="in_progress"
                        checked={values.status === 'in_progress'}
                        onChange={handleChange}
                    />
                    In Progress
                </label>

                <label>
                    <input
                        type="radio"
                        name="status"
                        value="completed"
                        checked={values.status === 'completed'}
                        onChange={handleChange}
                    />
                    Completed
                </label>

                <label>
                    <input
                        type="radio"
                        name="status"
                        value="dropped"
                        checked={values.status === 'dropped'}
                        onChange={handleChange}
                    />
                    Dropped
                </label>
            </div>
            {statusError && <p className="field-error">{statusError}</p>}

            <label>Rating:</label>
            <input
                type="number"
                name="rating"
                step="0.1"
                value={values.rating}
                onChange={handleChange}
            />

            <label>Release Year:</label>
            <input
                type="number"
                name="release_year"
                value={values.release_year}
                onChange={handleChange}
            />

            <label>Notes:</label>
            <textarea
                name="notes"
                value={values.notes}
                onChange={handleChange}
                rows={3}
            />

            <div className="form-actions">
                <button type="submit">
                    {isEditing ? 'Save Changes' : 'Add Item'}
                </button>

                {isEditing && onCancelEdit && (
                    <button
                        type="button"
                        className="btn-secondary"
                        onClick={onCancelEdit}
                    >
                        Cancel
                    </button>
                )}

                {!isEditing && onCancelAdd && (
                    <button
                        type="button"
                        className="btn-secondary"
                        onClick={onCancelAdd}
                    >
                        Cancel
                    </button>
                )}
            </div>
        </form>
    )
}

export default Form