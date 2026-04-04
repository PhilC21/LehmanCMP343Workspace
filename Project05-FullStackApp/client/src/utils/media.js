// convert form inputs to a format expected by the db
// - trims text
// - convert empty strings to null
// - make sure numbers are properly typed
export const toPayload = (raw) => ({
    title: raw.title.trim(),
    image_url: raw.image_url.trim() || null,
    media_type: raw.media_type.trim() || null,
    genre: raw.genre.trim() || null,
    status: raw.status.trim() || null,
    rating: raw.rating === '' ? null : Number(raw.rating),
    release_year: raw.release_year === '' ? null : parseInt(raw.release_year, 10),
    notes: raw.notes.trim() || null,
})

// converts database status values into user-friendly labels
export const formatStatus = (status) => {
    switch (status) {
        case 'planned':
            return 'Planned'
        case 'in_progress':
            return 'In Progress'
        case 'completed':
            return 'Completed'
        case 'dropped':
            return 'Dropped'
        default:
            return status || '—'
    }
}

export const getStatusStyles = (status) => {
    switch (status) {
        case 'planned':
            return 'bg-[#95B2B8]/10 text-[#95B2B8] border-[#95B2B8]/30'
        case 'in_progress':
            return 'bg-yellow-500/10 text-yellow-300 border-yellow-500/30'
        case 'completed':
            return 'bg-green-500/10 text-green-300 border-green-500/30'
        case 'dropped':
            return 'bg-red-500/10 text-red-300 border-red-500/30'
        default:
            return 'bg-[#120309] text-white border-[#95B2B8]/20'
    }
}