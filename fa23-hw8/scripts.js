const inputTitle = document.getElementById("input-title")
const inputYear = document.getElementById("input-year")
const inputCharacter1 = document.getElementById("input-character-1")
const inputCharacter2 = document.getElementById("input-character-2")

const submitPostReq = document.getElementById("submit-post-request")
const submitGetReq = document.getElementById("submit-get-request")

const list = document.getElementById("list")

submitPostReq.addEventListener("click", async function () {
    let data = {
        "title": inputTitle.value, 
        "year": inputYear.value, 
        "characters": [inputCharacter1.value, inputCharacter2.value]
    }
    await fetch("http://localhost:3000/new", {
        method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
    })
    inputTitle.value = ""
    inputYear.value = ""
});

submitGetReq.addEventListener("click", async function () {
    list.replaceChildren()
    const response = await fetch("http://localhost:3000/animes")
    const data = await response.json()
    for (let index = 0; index < data.length; index = index + 1) {
        const bookTitle = data[index].title
        const listElement = document.createElement("li")
        listElement.textContent = bookTitle
        list.appendChild(listElement)
    }
});