import data from './data.json';

// Define the questions arrays
let usedQuestions: string[] = [];
let remainingQuestions: string[] = [];

// Function to initialize remaining questions from data.json
function initializeRemainingQuestions() {
    // Check if data is available
    if (data && Array.isArray(data) && data.length > 0) {
        remainingQuestions = [...data];
    }
}

// Function to get a random question and remove it from remaining questions
export function getRandomQuestion(): string | undefined {
    if (remainingQuestions.length === 0) {
        // If all questions are used, prompt a modal
        console.log("Keep up with the Naughtiness");
        return undefined;
    }
    const randomIndex = Math.floor(Math.random() * remainingQuestions.length);
    const question = remainingQuestions[randomIndex];
    usedQuestions.push(question);
    remainingQuestions.splice(randomIndex, 1);
    return question;
}

// Initialize remaining questions from data.json
initializeRemainingQuestions();
