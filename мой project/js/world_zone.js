// ЛОКАЦИИ

const prevButton = document.querySelector("#btn-prev");
const nextButton = document.querySelector("#btn-next");
const cardBlock = document.querySelector(".card");

const description = document.querySelector(".inner_block");

let cardIndex = 0;
let images = [];

const loadImages = () => {
  fetch("../data/world_zone.json")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log("Загруженные данные:", data);
      images = data;
      showImage(cardIndex);
    })

    .catch((error) => {
      console.error("Ошибка:", error);
      cardBlock.innerHTML = `<p>Не удалось загрузить изображения</p>`;
    });
};

const showImage = (index) => {
  if (images.length === 0) return;

  const currentImage = images[index];

  cardBlock.innerHTML = `
    <img src="${currentImage.url}" alt="${currentImage.description}" style="width:660px; height:355px; border-radius:10px; ">
  `;

  description.innerHTML = `
    <p>${currentImage.description}</p>
  `;
};

prevButton.onclick = () => {
  cardIndex = (cardIndex - 1 + images.length) % images.length;
  showImage(cardIndex);
};

nextButton.onclick = () => {
  cardIndex = (cardIndex + 1) % images.length;
  showImage(cardIndex);
};

let autoSwitchInterval;

const startAutoSwitch = () => {
  autoSwitchInterval = setInterval(() => {
    cardIndex = (cardIndex + 1) % images.length;
    showImage(cardIndex);
  }, 5000);
};

loadImages();
startAutoSwitch();

// ЗМЕЙКА

const parentBlock = document.querySelector(".parent_block");
const scoreDisplay = document.getElementById("score");
const btnStart = document.getElementById("btnstart");
const blockSize = 50;

let snake = [{ x: 0, y: 0 }];
let direction = { x: 1, y: 0 };
let food = { x: 250, y: 250 };
let score = 0;
let gameInterval;

function createFood() {
  const foodElement = document.createElement("div");
  foodElement.style.position = "absolute";
  foodElement.style.width = `${blockSize}px`;
  foodElement.style.height = `${blockSize}px`;
  foodElement.style.backgroundColor = "green";
  foodElement.style.borderRadius = "20px";
  foodElement.style.left = `${food.x}px`;
  foodElement.style.top = `${food.y}px`;
  foodElement.classList.add("food");
  parentBlock.appendChild(foodElement);
}

function moveFood() {
  const foodElement = document.querySelector(".food");
  if (foodElement) foodElement.remove();

  food.x = Math.floor(Math.random() * 10) * blockSize;
  food.y = Math.floor(Math.random() * 10) * blockSize;

  createFood();
}

function drawSnake() {
  parentBlock.innerHTML = "";
  snake.forEach((segment) => {
    const segmentElement = document.createElement("div");
    segmentElement.style.position = "absolute";
    segmentElement.style.width = `${blockSize}px`;
    segmentElement.style.height = `${blockSize}px`;
    segmentElement.style.backgroundColor = "red";
    segmentElement.style.borderRadius = "10px";
    segmentElement.style.left = `${segment.x}px`;
    segmentElement.style.top = `${segment.y}px`;
    parentBlock.appendChild(segmentElement);
  });

  createFood();
}

function moveSnake() {
  const head = {
    x: snake[0].x + direction.x * blockSize,
    y: snake[0].y + direction.y * blockSize,
  };

  if (
    head.x < 0 ||
    head.x >= parentBlock.clientWidth ||
    head.y < 0 ||
    head.y >= parentBlock.clientHeight ||
    snake.some((segment) => segment.x === head.x && segment.y === head.y)
  ) {
    alert("Game Over");
    clearInterval(gameInterval);
  }

  if (head.x === food.x && head.y === food.y) {
    score++;
    scoreDisplay.textContent = `Score: ${score}`;
    moveFood();
  } else {
    snake.pop();
  }

  snake.unshift(head);
}

function changeDirection(event) {
  event.preventDefault();
  switch (event.key) {
    case "ArrowUp":
      if (direction.y === 0) direction = { x: 0, y: -1 };
      break;
    case "ArrowDown":
      if (direction.y === 0) direction = { x: 0, y: 1 };
      break;
    case "ArrowLeft":
      if (direction.x === 0) direction = { x: -1, y: 0 };
      break;
    case "ArrowRight":
      if (direction.x === 0) direction = { x: 1, y: 0 };
      break;
  }
}

function gameLoop() {
  moveSnake();
  drawSnake();
}

function startGame() {
  snake = [{ x: 0, y: 0 }];
  direction = { x: 1, y: 0 };
  food = { x: 250, y: 250 };
  score = 0;
  scoreDisplay.textContent = `Score: ${score}`;

  createFood();

  parentBlock.focus();

  clearInterval(gameInterval);
  gameInterval = setInterval(gameLoop, 200);
}

btnStart.addEventListener("click", startGame);

parentBlock.addEventListener("keydown", changeDirection);
parentBlock.setAttribute("tabindex", "0");

// СЕКУНДОМЕР

const buttonStart = document.getElementById("start");
const btnStop = document.getElementById("stop");
const btnReset = document.getElementById("reset");
const secondsDisplay = document.getElementById("seconds");

let counter = 0;
let intervalId = null;

function startTimer() {
  if (!intervalId) {
    intervalId = setInterval(() => {
      counter++;
      secondsDisplay.textContent = counter;
    }, 1000);
  }
}
function stopTimer() {
  clearInterval(intervalId);
  intervalId = null;
}
function resetTimer() {
  stopTimer();
  counter = 0;
  secondsDisplay.textContent = counter;
}

buttonStart.addEventListener("click", startTimer);
btnStop.addEventListener("click", stopTimer);
btnReset.addEventListener("click", resetTimer);
