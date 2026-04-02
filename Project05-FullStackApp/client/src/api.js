const base = import.meta.env.VITE_API_URL || ''

async function parse(res) {
    const text = await res.text()
    const data = text ? JSON.parse(text) : null
    if (!res.ok) {
        const msg = data?.error || res.statusText || 'Request failed'
        throw new Error(msg)
    }
    return data
}

export function getAllMedia() {
    return fetch(`${base}/api/media`).then(parse)
}

export function createMedia(body) {
    return fetch(`${base}/api/media`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
    }).then(parse)
}

export function updateMedia(id, body) {
    return fetch(`${base}/api/media/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
    }).then(parse)
}

export function deleteMedia(id) {
    return fetch(`${base}/api/media/${id}`, { method: 'DELETE' }).then(parse)
}