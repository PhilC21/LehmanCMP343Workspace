// Section 1: TODOs
// TODO: Register submissions from the user on the form.
// TODO: Determine the value of the data submitted and add it to a JavaScript array calle
// TODO: Call the render function to update the table with the new tasks.

// Section 2: App State Variables
let tasks = [];

const taskForm = document.getElementById("taskForm")
// const taskTable = document.getElementById("taskTable")
const taskTableBody = document.getElementById("taskTableBody");


// console.log("taskForm:", taskForm);
// console.log("taskTable:", taskTable);

// Function to handle form submissions
function handleSubmission(event) {
    event.preventDefault(); // this function stops our form from reloading the page

    // TODO: Get form input values
    const taskName = document.getElementById('taskName').value
    const taskDescription = document.getElementById('taskDescription').value
    const taskDeadline = document.getElementById('taskDeadline').value

    // TODO: Validate input fields
    if (taskName == "" || taskDeadline == "") {
        alert('Task name and deadline are required!')
        return // Exit the function here if requirements are not met
    }

    // TODO: Update the tasks array
    tasks.push({ name: taskName, description: taskDescription, deadline: taskDeadline })

    render();
}

// Function to render tasks in the table
function render() {
    // TODO: Use array methods to create a new table row of data for each item in the arr
    taskTableBody.innerHTML = tasks.map((task, index) => `
        <tr${task.completed ? ' class="completed"' : ''}>
            <td>${task.name}</td>
            <td>${task.description}</td>
            <td>${task.deadline}</td>
            <td><button onclick="markTaskComplete(${index})" ${task.completed ? 'disabled' : ''}>Complete</button></td>
            <td><button onclick="removeTask(${index})">Remove</button></td>
        </tr>
    `).join('');
    // console.log("tasks:", tasks);
}

// Function to mark a task as complete
function markTaskComplete(index) {
    if (confirm(`Are you sure that this task has been completed?`)) {
        tasks[index].completed = true;
        render();
    }
}

// Function to remove a task
function removeTask(index) {
    if (confirm(`Are you sure you want to remove this task from the list?`)) {
        tasks.splice(index, 1);
        render();
    }
}

// Function to initialize the table
function init() {
    taskTableBody.innerHTML = ''; // Clear the table
    tasks = []; // Reset the tasks array
    render(); // Call the render function
}

// Event listener for form submission
taskForm.addEventListener('submit', handleSubmission);

// Call the init function to set up the initial state of the app
init();