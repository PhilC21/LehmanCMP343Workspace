import { useState } from "react"

function Form(props) {
    const [linkName, setLinkName] = useState("")
    const [linkURL, setLinkURL] = useState("")

    const [nameError, setNameError] = useState("")
    const [urlError, setUrlError] = useState("")

    const handleNameChange = (event) => {
        // console.log(event.target.value)
        setLinkName(event.target.value)
        setNameError("") // clears error when user begins to type
    }

    const handleURLChange = (event) => {
        // console.log(event.target.value)
        setLinkURL(event.target.value)
        setUrlError("") // clears error when user begins to type
    }

    return (
        <form onSubmit={(event) => {
            event.preventDefault()
            // console.log(linkName, linkURL)

            // set error message(s) if text field is empty or white space only
            setNameError(!linkName.trim() ? "Please enter a link name" : "")
            setUrlError(!linkURL.trim() ? "Please enter a URL" : "")

            if (!linkName.trim() || !linkURL.trim()) {
                return // if fields are empty or white space, do not submit
            }

            props.submitNewLink({linkName, linkURL})
        }}>
            <label htmlFor="LinkName"
            className="block text-sm font-medium text-slate-100 mb-1">
                Link Name:
            </label>
            <input type="text" id="linkName" name="LinkName" value={linkName} onChange={handleNameChange}
            className="w-full px-3 py-2 bg-slate-200 border border-slate-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500" />
            <span>
                {nameError && (
                    <p className="text-red-500 text-sm mt-1">{nameError}</p>
                )}
            </span>

            <label htmlFor="LinkURL"
            className="block text-sm font-medium text-slate-100 mb-1 mt-1">
                Link URL:
            </label>
            <input type="text" id="linkURL" name="LinkURL" value={linkURL} onChange={handleURLChange} 
            className="w-full px-3 py-2 bg-slate-200 border border-slate-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500" />
            <span>
                {urlError && (
                    <p className="text-red-500 text-sm mt-1">{urlError}</p>
                )}
            </span>

            <input type="submit" value="Submit" 
            className="px-4 py-2 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 mt-4" />
        </form>
    )
    
}

export default Form