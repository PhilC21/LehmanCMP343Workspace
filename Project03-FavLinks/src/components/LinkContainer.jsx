import Table from "./Table"
import Form from "./Form"

function LinkContainer() {

    return (
        <div>
            <h1>My Favorite Links</h1>
            <p>Add a new link with a name and URL to the table!</p>
            
            <Table />
            
            <h1>Add New</h1>
            <Form />
        </div>
    )

}

export default LinkContainer