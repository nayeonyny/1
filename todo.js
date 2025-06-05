// script.js

// Get references to HTML elements
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

/**
 * Adds a new task to the list.
 * @param {string} taskText - The text content of the task.
 */
function addTask(taskText) {
    if (taskText.trim() === '') {
        // Display a message if the input is empty instead of an alert
        const messageContainer = document.createElement('div');
        messageContainer.textContent = "Please enter a task! 😉";
        messageContainer.className = "text-red-500 mb-4 text-center";
        taskList.prepend(messageContainer); // Add message before tasks
        setTimeout(() => messageContainer.remove(), 2000); // Remove after 2 seconds
        return;
    }

    // Create new list item
    const listItem = document.createElement('li');

    // Create span for task text
    const taskTextSpan = document.createElement('span');
    taskTextSpan.classList.add('task-text');
    taskTextSpan.textContent = taskText;

    // Create buttons container
    const buttonsContainer = document.createElement('div');
    buttonsContainer.classList.add('task-buttons');

    // Create check button
    const checkBtn = document.createElement('button');
    checkBtn.classList.add('check-btn');
    // Add SVG checkmark icon
    checkBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
        </svg>
    `;
    checkBtn.setAttribute('aria-label', 'Mark task as complete'); // Accessibility for icon button

    // Create remove button
    const removeBtn = document.createElement('button');
    removeBtn.classList.add('remove-btn');
    removeBtn.textContent = 'Remove';

    // Append task text and buttons to the list item
    listItem.appendChild(taskTextSpan);
    buttonsContainer.appendChild(checkBtn);
    buttonsContainer.appendChild(removeBtn);
    listItem.appendChild(buttonsContainer);

    // Append the new list item to the task list
    taskList.appendChild(listItem);

    // Clear the input field
    taskInput.value = '';
}

// Event listener for adding tasks
addTaskBtn.addEventListener('click', () => {
    addTask(taskInput.value);
});

// Allow adding tasks by pressing Enter key in the input field
taskInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        addTask(taskInput.value);
    }
});

// Event delegation for check and remove buttons
taskList.addEventListener('click', (event) => {
    const target = event.target;

    // Check if the clicked element is a 'Check' button or its SVG child
    const checkButton = target.closest('.check-btn');
    if (checkButton) {
        const listItem = checkButton.closest('li'); // Get the parent <li> element
        if (listItem) {
            listItem.classList.toggle('completed'); // Toggle the 'completed' class
        }
    }

    // Check if the clicked element is a 'Remove' button
    if (target.classList.contains('remove-btn')) {
        const listItem = target.closest('li'); // Get the parent <li> element
        if (listItem) {
            listItem.remove(); // Remove the entire list item
        }
    }
});
