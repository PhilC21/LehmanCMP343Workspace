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
            <label for="LinkName">Link Name:</label> <br/>
            <input type="text" id="linkName" name="LinkName" onChange={handleNameChange} /> <br/>

            <label for="LinkURL">Link URL:</label> <br/>
            <input type="text" id="linkURL" name="LinkURL" onChange={handleURLChange} /> <br/><br />

            <input type="submit" value="Submit" />
        </form>
    )
    
}

export default Form