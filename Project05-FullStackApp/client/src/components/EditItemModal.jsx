import Form from './Form'
import * as ui from '../styles/ui'

// prepare data from the database to be safely used by the form
// make sure there are no undefined values
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

function EditItemModal({ item, onClose, onSubmit }) {
    if (!item) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
            <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-[#95B2B8]/20 bg-[#2E0F15] p-6 shadow-2xl">
                <div className="mb-4 flex items-center justify-between gap-4">
                    <h2 className={ui.subheading}>
                        Edit Media Item
                    </h2>

                    <button
                        type="button"
                        className="text-md px-4 font-sm text-white bg-slate-500 tansition hover:text-black hover:bg-red-400"
                        onClick={onClose}
                    >
                        Close
                    </button>
                </div>

                <Form
                    key={item.id}
                    initialValues={toFormValues(item)}
                    isEditing={true}
                    onSubmit={onSubmit}
                    onCancelEdit={onClose}
                    onCancelAdd={null}
                />
            </div>
        </div>
    )
}

export default EditItemModal