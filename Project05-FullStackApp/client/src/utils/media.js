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