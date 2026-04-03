import { useState, useEffect } from 'react'
import * as ui from '../styles/ui'

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
        <div>
            <p className="mt-1 mb-3 max-w-3xl text-red-300">
                All fields marked with * are requied.
            </p>
            <form onSubmit={handleSubmit}>
                <div className="grid gap-3 md:grid-cols-2">
                    <div className="md:col-span-2">
                        <label className={ui.labelBase}>Title: *</label>
                        <input
                            type="text"
                            name="title"
                            value={values.title}
                            onChange={handleChange}
                            className={ui.inputBase}
                        />
                        {titleError && <p className={ui.errorText}>{titleError}</p>}
                    </div>

                    <div className="md:col-span-2">
                        <label className={ui.labelBase}>Image URL:</label>
                        <input
                            type="url"
                            name="image_url"
                            value={values.image_url}
                            onChange={handleChange}
                            className={ui.inputBase}
                        />
                    </div>

                    <div>
                        <label className={ui.labelBase}>Media type: *</label>
                        <select
                            name="media_type"
                            value={values.media_type}
                            onChange={handleChange}
                            className={ui.inputBase}
                        >
                            <option value="">Select type</option>
                            <option value="book">Book</option>
                            <option value="movie">Movie</option>
                            <option value="game">Game</option>
                        </select>
                        {mediaTypeError && <p className={ui.errorText}>{mediaTypeError}</p>}
                    </div>

                    <div>
                        <label className={ui.labelBase}>Genre:</label>
                        <input
                            type="text"
                            name="genre"
                            value={values.genre}
                            onChange={handleChange}
                            className={ui.inputBase}
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className={ui.labelBase}>Status: *</label>
                        <div className="mt-3 flex flex-wrap gap-4">
                            {[
                                { label: 'Planned', value: 'planned' },
                                { label: 'In Progress', value: 'in_progress' },
                                { label: 'Completed', value: 'completed' },
                                { label: 'Dropped', value: 'dropped' },
                            ].map((option) => (
                                <label
                                    key={option.value}
                                    className="flex cursor-pointer items-center gap-2 rounded-lg border border-[#95B2B8]/20 bg-[#120309] px-3 py-2 text-sm text-white"
                                >
                                    <input
                                        type="radio"
                                        name="status"
                                        value={option.value}
                                        checked={values.status === option.value}
                                        onChange={handleChange}
                                        className="accent-green-500"
                                    />
                                    {option.label}
                                </label>
                            ))}
                        </div>
                        {statusError && <p className={ui.errorText}>{statusError}</p>}
                    </div>

                    <div>
                        <label className={ui.labelBase}>Rating:</label>
                        <input
                            type="number"
                            name="rating"
                            step="0.1"
                            value={values.rating}
                            onChange={handleChange}
                            placeholder='Can be between 1 and 10 to one decimal place. e.g. 6.4'
                            className={ui.inputBase}
                        />
                    </div>

                    <div>
                        <label className={ui.labelBase}>Release Year:</label>
                        <input
                            type="number"
                            name="release_year"
                            value={values.release_year}
                            onChange={handleChange}
                            className={ui.inputBase}
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className={ui.labelBase}>Notes:</label>
                        <textarea
                            name="notes"
                            value={values.notes}
                            onChange={handleChange}
                            rows={4}
                            className={ui.inputBase}
                        />
                    </div>
                </div>

                <div className="flex flex-wrap gap-3 pt-2">
                    <button type="submit" className={ui.primaryBtn}>
                        {isEditing ? 'Save Changes' : 'Add Item'}
                    </button>

                    {isEditing && onCancelEdit && (
                        <button
                            type="button"
                            className={ui.secondaryBtn}
                            onClick={onCancelEdit}
                        >
                            Cancel
                        </button>
                    )}

                    {!isEditing && onCancelAdd && (
                        <button
                            type="button"
                            className={ui.secondaryBtn}
                            onClick={onCancelAdd}
                        >
                            Cancel
                        </button>
                    )}
                </div>
            </form>
        </div>
    )
}

export default Form