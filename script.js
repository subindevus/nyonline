function getQueryParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

async function fetchData() {
    const response = await fetch('data.json');
    const data = await response.json();
    return data;
}

function findAnswer(question, data) {
    const result = data.find(item => item.question.toLowerCase() === question.toLowerCase());
    return result ? result.answer : "Em hok hiểu anh nói gì hết !!";
}

async function main() {
    const question = getQueryParameter('question');
    if (question) {
        const data = await fetchData();
        const answer = findAnswer(question, data);
        document.body.innerText = JSON.stringify({ answer: answer });
    } else {
        document.body.innerText = "Created By Subin Dev";
    }
}

main();
