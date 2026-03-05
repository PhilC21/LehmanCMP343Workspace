function Form() {

    return (
        <form action="">
            <label for="LinkName">Link Name:</label> <br/>
            <input type="text" name="LinkName" value="" /> <br/>

            <label for="LinkURL">Link URL:</label> <br/>
            <input type="text" name="LinkURL" value="" /> <br/><br />

            <input type="submit" value="Submit" />
        </form>
    )
    
}

export default Form