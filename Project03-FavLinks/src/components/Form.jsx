import { useState } from "react"

function Form(props) {
    const [linkName, setLinkName] = useState("")
    const [linkURL, setLinkURL] = useState("")

    const handleNameChange = (event) => {
        console.log(event.target.value)
        setLinkName(event.target.value)
    }

    const handleURLChange = (event) => {
        console.log(event.target.value)
        setLinkURL(event.target.value)
    }

    return (
        <form onSubmit={(event) => {
            event.preventDefault()
            console.log(linkName, linkURL)
            props.submitNewLink({linkName, linkURL})
        }}>
            <label htmlFor="LinkName"
            className="block text-sm font-medium text-slate-100 mb-1">
                Link Name:
            </label>
            <input type="text" id="linkName" name="LinkName" value={linkName} onChange={handleNameChange} 
            className="w-full px-3 py-2 bg-slate-200 border border-slate-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500" />

            <label htmlFor="LinkURL"
            className="block text-sm font-medium text-slate-100 mb-1">
                Link URL:
            </label>
            <input type="text" id="linkURL" name="LinkURL" value={linkURL} onChange={handleURLChange} 
            className="w-full px-3 py-2 bg-slate-200 border border-slate-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500" />

            <br/><br/>

            <input type="submit" value="Submit" 
            className="px-4 py-2 bg-green-600 text-white font-medium rounded-md hover:bg-green-700" />
        </form>
    )
    
}

export default Form