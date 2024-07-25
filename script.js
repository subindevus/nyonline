function getQueryParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

async function fetchData(fileName) {
    const response = await fetch(fileName);
    const data = await response.json();
    return data;
}

function findAnswer(question, data) {
    const result = data.find(item => item.question.toLowerCase() === question.toLowerCase());
    return result ? result.answer : null;
}

async function updateKeyUsage(key) {
    const keyData = await fetchData('key.json');
    if (keyData[key] > 0) {
        keyData[key]--;
        await fetch('key.json', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(keyData)
        });
        return true;
    }
    return false;
}

async function main() {
    const question = getQueryParameter('question');
    const key = getQueryParameter('key');

    if (!key) {
        document.body.innerText = JSON.stringify({ status: 400, message: "Thiếu key !" });
        return;
    }

    const keyData = await fetchData('key.json');

    if (!(key in keyData)) {
        document.body.innerText = JSON.stringify({ status: 403, message: "Key sai !" });
        return;
    }

    if (keyData[key] <= 0) {
        document.body.innerText = JSON.stringify({ status: 429, message: "Key đã hết số lượt dùng !" });
        return;
    }

    if (!question) {
        document.body.innerText = "Created By Subin Dev";
        return;
    }

    const data = await fetchData('data.json');
    const answer = findAnswer(question, data);

    if (answer) {
        const updated = await updateKeyUsage(key);
        if (updated) {
            document.body.innerText = JSON.stringify({ status: 200, answer: answer });
        } else {
            document.body.innerText = JSON.stringify({ status: 500, message: "Lỗi !" });
        }
    } else {
        document.body.innerText = JSON.stringify({ status: 404, message: "Em hog hiểu anh đang nói gì !" });
    }
}

main();
