import Table from "./Table"
import Form from "./Form"

import { useState } from "react"



const LinkContainer = (props) => {
    const [favLinks, setFavLinks] = useState([])

    const handleRemove = (index) => {
        const link = favLinks[index]
        if (!link) {
            return // safety net; do nothing if no data is found.
        }

        const ok = window.confirm(
            `Are you sure you want to delete "${link.linkName}"?`
        );
        if (!ok) {
            return // do nothing if cancelled
        }

        setFavLinks(favLinks.filter((link, i) => i !== index))
    }

    const handleSubmit = (favLink) => {

        setFavLinks([...favLinks, favLink])
    }

    return (
        <div className="max-w-3xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-purple-600 mb-1">My Favorite Links</h1>


            <p className="text-slate-300 mb-6">Add a new link with a name and URL to the table!</p>

            <Table linkData={favLinks} removeLink={handleRemove} />

            <h2 className="text-xl font-semibold text-purple-500 mt-8 mb-4">Add New</h2>
            <Form submitNewLink={handleSubmit} />
        </div>
    )

}


export default LinkContainer