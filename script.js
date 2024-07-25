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
    return result ? result.answer : "Em hok hiểu anh nói gì !!";
}

async function main() {
    const question = getQueryParameter('question');
    if (question) {
        const data = await fetchData();
        const answer = findAnswer(question, data);
        document.getElementById('response').textContent = JSON.stringify({ answer: answer }, null, 2);
    } else {
        document.getElementById('response').textContent = "Created By Subin Dev <3";
    }
}

main();
