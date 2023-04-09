let player = {
    name: "User",
    chips: 200
}

let cards = []
let sum = 0
let hasBlackJack = false
let isAlive = false
let gameActive = false
let message = ""
let messageEl = document.getElementById("message-el")
let sumEl = document.getElementById("sum-el")
let cardsEl = document.getElementById("cards-el")
let playerEl = document.getElementById("player-el")

getPlayerStats()

function getPlayerStats() {
    playerEl.textContent = player.name + ": $" + player.chips
}

function getRandomCard() {
    let randomNumber = Math.floor(Math.random() * 13) + 1
    if (randomNumber > 10) {
        return 10
    } else if (randomNumber === 1) {
        return 11
    } else {
        return randomNumber
    }
}

function alertMessage() {
    if (message === "Not enough credits to play" || message === "You haven't finished this round!") {
        messageEl.style.color = "red"
    } else {
        messageEl.style.color = "white"
    }
}

function startGame() {
    if (player.chips >= 10 && gameActive === false) {
        isAlive = true
        hasBlackJack = false
        gameActive = true
        let firstCard = getRandomCard()
        let secondCard = getRandomCard()
        cards = [firstCard, secondCard]
        sum = firstCard + secondCard
        renderGame()
    } else if (player.chips < 10) {
        message = "Not enough credits to play"
    } else {
        message = "You haven't finished this round!"
    }
    alertMessage()
    messageEl.textContent = message
}

function renderGame() {
    cardsEl.textContent = "Cards: "
    for (let i = 0; i < cards.length; i++) {
        cardsEl.textContent += cards[i] + " "
    }

    sumEl.textContent = "Sum: " + sum
    if (sum <= 20) {
        message = "Do you want to draw a new card?"
    } else if (sum === 21) {
        message = "You've got Blackjack!"
        player.chips += 10
        hasBlackJack = true
        gameActive = false
        getPlayerStats()
    } else {
        message = "You're out of the game!"
        player.chips -= 10
        isAlive = false
        gameActive = false
        getPlayerStats()
    }
    alertMessage()
    messageEl.textContent = message
}


function newCard() {
    if (isAlive === true && hasBlackJack === false) {
        let card = getRandomCard()
        sum += card
        cards.push(card)
        renderGame()
    }
}
