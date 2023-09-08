// Define your quiz questions and answers here
const questions = [
    {
        question: "What is 7 x 8?",
        choices: ["48", "56", "64"],
        correctAnswer: "56"
    },
    {
        question: "Which planet is known as the Red Planet?",
        choices: ["Mars", "Venus", "Jupiter"],
        correctAnswer: "Mars"
    },
    {
        question: "What is the capital of France?",
        choices: ["London", "Berlin", "Paris"],
        correctAnswer: "Paris"
    },
    {
        question: "Who wrote 'Romeo and Juliet'?",
        choices: ["Charles Dickens", "William Shakespeare", "Jane Austen"],
        correctAnswer: "William Shakespeare"
    },
    {
        question: "What is the chemical symbol for gold?",
        choices: ["Go", "Au", "Ag"],
        correctAnswer: "Au"
    },
    {
        question: "Which gas do plants absorb from the atmosphere?",
        choices: ["Oxygen", "Carbon Dioxide", "Nitrogen"],
        correctAnswer: "Carbon Dioxide"
    },
    {
        question: "What is the largest mammal in the world?",
        choices: ["Giraffe", "Elephant", "Blue Whale"],
        correctAnswer: "Blue Whale"
    },
    {
        question: "Who painted the Mona Lisa?",
        choices: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci"],
        correctAnswer: "Leonardo da Vinci"
    },
    {
        question: "What is the square root of 144?",
        choices: ["10", "12", "14"],
        correctAnswer: "12"
    },
    {
        question: "Which gas makes up the majority of Earth's atmosphere?",
        choices: ["Oxygen", "Carbon Dioxide", "Nitrogen"],
        correctAnswer: "Nitrogen"
    }
];


let currentQuestion = 0;
let timer;
let time = 0;
let score = 0; // Initialize the score


// Function to start the timer
function startTimer() {
    timer = setInterval(updateTimer, 1000);
}

// Function to update the timer display
function updateTimer() {
    time++;
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    document.getElementById("time").textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

// Function to handle next button click
document.getElementById("next").addEventListener("click", () => {
    if (currentQuestion < questions.length - 1) {
        currentQuestion++; // Move to the next question
        displayQuestion(); // Update the display
    }
});

// Function to handle previous button click
document.getElementById("prev").addEventListener("click", () => {
    if (currentQuestion > 0) {
        currentQuestion--; // Move to the previous question
        displayQuestion(); // Update the display
    }
});

//submit
document.getElementById("submit").addEventListener("click", () => {
    // Disable Next and Previous buttons
    document.getElementById("next").disabled = true;
    document.getElementById("prev").disabled = true;

    // Stop the timer
    clearInterval(timer);

    // Calculate the user's score
    const userScore = score;

    // Display the score and timer
    const resultsElement = document.getElementById("results");
    const totalTimeElement = document.getElementById("time");
    const totalQuestions = questions.length;

    // Calculate the time in minutes and seconds
    const totalSeconds = time;
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    // Create a message with the user's score and time taken
    const resultMessage = `You scored ${userScore} out of ${totalQuestions} in ${minutes} minutes and ${seconds} seconds.`;

    // Display the results message
    resultsElement.textContent = resultMessage;
    totalTimeElement.textContent = ""; // Clear the timer display
});


// Function to display quiz results
function displayResults(userScore) {
    const resultsElement = document.getElementById("results");
    const totalTimeElement = document.getElementById("time");
    const totalQuestions = questions.length;

    // Calculate the time in minutes and seconds
    const totalSeconds = time;
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    // Create a message with the user's score and time taken
    const resultMessage = `You scored ${userScore} out of ${totalQuestions} in ${minutes} minutes and ${seconds} seconds.`;

    // Display the results message
    resultsElement.textContent = resultMessage;
    totalTimeElement.textContent = ""; // Clear the timer display
}


// Start the timer and display the first question
startTimer();
displayQuestion();


// Function to display the current question
function displayQuestion() {
    const questionElement = document.getElementById("question");
    const choicesElement = document.getElementById("choices");
    const currentQ = questions[currentQuestion];

    questionElement.textContent = currentQ.question;
    choicesElement.innerHTML = "";

    currentQ.choices.forEach(choice => {
        const button = document.createElement("button");
        button.textContent = choice;
        button.addEventListener("click", checkAnswer);
        choicesElement.appendChild(button);
    });
}

// Function to check the selected answer

// function checkAnswer(event) {
//     const selectedChoice = event.target.textContent;
//     const currentQ = questions[currentQuestion];

//     if (selectedChoice === currentQ.correctAnswer) {
//         score++;
//         alert("Correct!"); // You can change this to a more user-friendly display.
//     } else {
//         alert("Incorrect!"); // You can change this to a more user-friendly display.
//     }

//     currentQuestion++;

//     if (currentQuestion < questions.length) {
//         displayQuestion();
//     } else {
//         displayResults();
//     }
// }
// Function to check the selected answer
function checkAnswer(event) {
    const selectedChoice = event.target.textContent;
    const currentQ = questions[currentQuestion];
    const feedbackElement = document.getElementById("feedback");

    if (selectedChoice === currentQ.correctAnswer) {
        score++;
        feedbackElement.textContent = "Correct!";
        feedbackElement.classList.add("text-success");
        feedbackElement.classList.remove("text-danger");
    } else {
        feedbackElement.textContent = "Incorrect!";
        feedbackElement.classList.add("text-danger");
        feedbackElement.classList.remove("text-success");
    }

    currentQuestion++;

    if (currentQuestion < questions.length) {
        displayQuestion();
    } else {
        displayResults();
    }
}



// Function to display quiz results
function displayResults() {
    const resultsElement = document.getElementById("results");
    resultsElement.textContent = `You scored ${score} out of ${questions.length}!`;
}




// Define functions for creating, displaying, and deleting notes

function generateUniqueId() {
    // Generate a unique ID using a combination of the current timestamp and a random number
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
}

function displayNoteInUI(note) {
    // Create HTML elements to display the note in the UI
    const noteList = document.getElementById("note-list");

    // Create a list item element to represent the note
    const noteElement = document.createElement("li");
    noteElement.textContent = `${note.title}: ${note.content}`;

    // Attach a click event handler to each note for editing or deleting
    noteElement.addEventListener("click", () => {
        // Handle the click event (e.g., open the note for editing)
        // You can use the note.id to identify the selected note
    });

    // Append the note element to the list
    noteList.appendChild(noteElement);
}

document.getElementById("add-note").addEventListener("click", createNote);

function createNote() {
    // Get the title and content from the input fields in your HTML
    const title = document.getElementById("note-title").value;
    const content = document.getElementById("note-content").value;

    // Create a unique ID for the note
    const noteId = generateUniqueId();

    // Create a new note object
    const note = {
        id: noteId,
        title: title,
        content: content,
    };

    // Store the note in local storage (you'll need to convert it to JSON)
    localStorage.setItem(noteId, JSON.stringify(note));

    // Display the note in the UI
    displayNoteInUI(note);

    // Clear the input fields for the next note
    document.getElementById("note-title").value = "";
    document.getElementById("note-content").value = "";
}

function displayNotes() {
    const noteList = document.getElementById("note-list");

    // Clear the existing notes in the UI (if any)
    noteList.innerHTML = "";

    // Loop through local storage and display each note
    for (let i = 0; i < localStorage.length; i++) {
        const noteId = localStorage.key(i);
        const note = JSON.parse(localStorage.getItem(noteId));

        // Display the note in the UI
        displayNoteInUI(note);
    }
}
