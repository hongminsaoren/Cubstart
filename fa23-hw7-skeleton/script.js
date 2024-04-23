frontCard = document.getElementById("frontCard")
backCard = document.getElementById("backCard")
submitBtn = document.getElementById("submit")
nextBtn = document.getElementById("next")
prevBtn = document.getElementById("prev")
deleteBtn = document.getElementById("delete")
revealBtn = document.getElementById("reveal")
randomBtn = document.getElementById("randomize")
newFrontCard = document.getElementById("newFrontCard")
newBackCard = document.getElementById("newBackCard")

localUrl = "http://localhost:3000"

submitBtn.addEventListener("click", async function () {
    await addCard(newFrontCard.value, newBackCard.value)
    allCards = await getCards()
    newFrontCard.value = ""
    newBackCard.value = ""
  });

nextBtn.addEventListener("click", async function () {
    nextCard()
});

prevBtn.addEventListener("click", async function () {
    prevCard()
});

revealBtn.addEventListener("click", async function () {
    revealCard()
});

deleteBtn.addEventListener("click", async function () {
    deleteCard()
});

randomBtn.addEventListener("click", async function () {
    randomCard()
});

var cardIndex = -1
var allCards = []

async function initializeCards() {
    revealBtn.style.visibility = "hidden";
    deleteBtn.style.visibility = "hidden";
    randomBtn.style.visibility = "hidden";
    allCards = await getCards();
}

initializeCards()

function nextCard() {
    revealBtn.style.visibility = "visible";
    deleteBtn.style.visibility = "visible";
    randomBtn.style.visibility = "visible";
    cardIndex += 1
    if (cardIndex == allCards.length) {
        cardIndex = 0
    }
    backCard.innerHTML = ""
    frontCard.innerHTML = allCards[cardIndex].front
}

function prevCard() {
    cardIndex -= 1
    if (cardIndex == -1) {
        cardIndex = allCards.length - 1
    }
    backCard.innerHTML = ""
    frontCard.innerHTML = allCards[cardIndex].front
}

function revealCard() {
    backCard.innerHTML = allCards[cardIndex].back
}

async function deleteCard() {
    await deleteCardById(allCards[cardIndex]._id)
    allCards = await getCards()
    backCard.innerHTML = ""
    frontCard.innerHTML = allCards[cardIndex].front
}

function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

async function randomCard() {
    cardIndex = randomInteger(0, allCards.length - 1)
    backCard.innerHTML = ""
    frontCard.innerHTML = allCards[cardIndex].front
}

async function apiCall(url, front=null, back=null) {
    if (front && back) {
        let data = {
            "front": front,
            "back": back
        }
        var response = await fetch(url, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(data),
                    });
    } else {
        var response = await fetch(url)
    }
    let responseData = await response.json()
    return responseData
}

async function getCards() {
    let formattedUrl = localUrl + "/cards"
    let allCards = await apiCall(formattedUrl)
    return allCards
}

async function getCardById(id) {
    let formattedUrl = localUrl + "/card/" + id
    let card = await apiCall(formattedUrl)
    return card
}

async function addCard(front, back) {
    let formattedUrl = localUrl + "/new"
    let status = await apiCall(formattedUrl, front, back)
    return status
}

async function deleteCardById(id) {
    let formattedUrl = localUrl + "/delete/" + id
    let card = await apiCall(formattedUrl)
    return card
}