const gridContainer = document.querySelector(".grid-container");
let cards = [];
let firstCard, secondCard;
let lockBoard = false;
let score = 0;

document.querySelector(".score").textContent = score;

var cardsArray = [[
    {
        "image": "../assets/images/crab.png",
        "name": "crab"
    },

    {
        "image": "../assets/images/cow.png",
        "name": "cow"
    },

    {
        "image": "../assets/images/chick.png",
        "name": "chick"
    },

    {
        "image": "../assets/images/dog.png",
        "name": "dog"
    },

    {
        "image": "../assets/images/fox.png",
        "name": "fox"
    },

    {
        "image": "../assets/images/grey.monkey.png",
        "name": "grey.monkey"
    },

    {
        "image": "../assets/images/hamster.png",
        "name": "hamster"
    },

    {
        "image": "../assets/images/horse.png",
        "name": "horse"
    },

    {
        "image": "../assets/images/ladybug.png",
        "name": "ladybug"
    },

    {
        "image": "../assets/images/lion.png",
        "name": "lion"
    },

    {
        "image": "../assets/images/monkey.png",
        "name": "monkey"
    },

    {
        "image": "../assets/images/owl.png",
        "name": "owl"
    },

    {
        "image": "../assets/images/pig.png",
        "name": "pig"
    },

    {
        "image": "../assets/images/puffin.png",
        "name": "puffin"
    },

    {
        "image": "../assets/images/python.png",
        "name": "python"
    },

    {
        "image": "../assets/images/seal.png",
        "name": "seal"
    },

    {
        "image": "../assets/images/turket.png",
        "name": "turkey"
    },

    {
        "image": "../assets/images/whale.png",
        "name": "whale"
    },
]]
    .then((res) => res.json())
    .then((data) => {
        cards = [...data, ...data];
    shuffleCards();
    generateCards();
    });

function shuffleCards() {
    let currentIndex = cards.length,
        randomIndex,
        temporaryValue;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = cards[currentIndex];
        cards[currentIndex] = cards[randomIndex];
        cards[randomIndex] = temporaryValue;
    }
}

function generateCards() {
    for (let card of cards) {
        const cardElement = document.createElement("div");
        cardElement.classList.add("card");
        cardElement.setAttribute("data-name", card.name);
        cardElement.innerHTML = `
            <div class="front">
                <img class="front-image" src=${card.image} />
            </div>
            <div class="back"></div>
        `;
        gridContainer.appendChild(cardElement);
        cardElement.addEventListener("click", flipCard);
    }
}

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add("flipped");

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    score++;
    document.querySelector(".score").textContent = score;
    lockBoard = true;

    checkForMatch();
}

function checkForMatch() {
    let isMatch = firstCard.dataset.name === secondCard.dataset.name;

    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);

    resetBoard();
}

function unflipCards() {
    setTimeout(() => {
        firstCard.classList.remove("flipped");
        secondCard.classList.remove("flipped");
        resetBoard();
    }, 1000);
}

function resetBoard() {
    firstCard = null;
    secondCard = null;
    lockBoard = false;
}

function restart() {
    resetBoard();
    shuffleCards();
    score = 0;
    document.querySelector(".score").textContent = score;
    gridContainer.innerHTML = "";
    generateCards();
}

