// Function to get the value of a query parameter
function getQueryParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// Function to fetch data from data.json
async function fetchData() {
    const response = await fetch('data.json');
    const data = await response.json();
    return data;
}

// Function to find the answer to the given question
function findAnswer(question, data) {
    const result = data.find(item => item.question.toLowerCase() === question.toLowerCase());
    return result ? result.answer : "Question not found";
}

// Main function to process the question and display the answer
async function main() {
    const question = getQueryParameter('question');
    if (question) {
        const data = await fetchData();
        const answer = findAnswer(question, data);
        document.getElementById('response').textContent = JSON.stringify({ answer: answer }, null, 2);
    } else {
        document.getElementById('response').textContent = JSON.stringify({ answer: "No question provided" }, null, 2);
    }
}

// Run the main function on page load
main();
