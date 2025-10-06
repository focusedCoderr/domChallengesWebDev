const cardWrapper = document.querySelectorAll(".cardWrapper");
const allEmoji = document.querySelectorAll(".emoji");
const movesValue = document.querySelector(".movesValue");
const timerSpan = document.querySelector(".timer");
const allActiveEmojis = document.getElementsByClassName("active");
const restartBtn = document.querySelector("button");

restartBtn.addEventListener("click", () => {
	moves = 0;
	timeCounter = 0;
	movesValue.innerText = moves;
	timerSpan.innerText = "00:00";
	clearInterval(intervalStamp);
	const allActiveCardWrapper = [...allActiveEmojis];
	allActiveCardWrapper.forEach((activeCardWrapper) => {
		activeCardWrapper.classList.remove("active");
	});

	placeRandomEmojis();

	cardWrapper.forEach((each) => {
		each.addEventListener("click", clickListener);
	});
});

let clickCounter = 0;
let moves = 0;
let compareArr = [];
let timeCounter = 0;
let intervalStamp;

function doSomething(clickedWrapper) {
	clickCounter++;
	if (clickCounter === 2) {
		clickCounter = 0;
		moves++;
		movesValue.innerText = moves;

		const prevClikedWrapper = compareArr[0];
		compareArr = [];

		const newEmojiClicked = clickedWrapper.firstElementChild.innerText;
		const prevEmoji = prevClikedWrapper.firstElementChild.innerText;

		if (newEmojiClicked === prevEmoji) {
			clickedWrapper.removeEventListener("click", clickListener);
			prevClikedWrapper.removeEventListener("click", clickListener);
			if (allActiveEmojis.length === 16) {
				setTimeout(() => {
					alert("Well Done!");
					clearInterval(intervalStamp);
				}, 500);
			}
		} else {
			setTimeout(() => {
				prevClikedWrapper.classList.remove("active");
				clickedWrapper.classList.remove("active");
			}, 500);
		}
	} else {
		compareArr.push(clickedWrapper);
	}
}

const emojiArr = [
	"🐶",
	"🐱",
	"🐭",
	"🐹",
	"🐰",
	"🦊",
	"🐻",
	"🐼",
	"🐶",
	"🐱",
	"🐭",
	"🐹",
	"🐰",
	"🦊",
	"🐻",
	"🐼",
];

function placeRandomEmojis() {
	const randomEmojiArr = createRandomEmojiArr();
	for (let i = 0; i < randomEmojiArr.length; i++) {
		allEmoji[i].innerText = randomEmojiArr[i].emoji;
	}
}

function createRandomEmojiArr() {
	const randomEmojiArr = [];
	populateRandomEmojiArr(randomEmojiArr);

	for (let i = 0; i < emojiArr.length; i++) {
		const emojiToBePlaced = emojiArr[i];
		let whereToPlace = generateRandomIndex();

		while (randomEmojiArr[whereToPlace].present) {
			whereToPlace = generateRandomIndex();
		}
		randomEmojiArr[whereToPlace].present = true;
		randomEmojiArr[whereToPlace].emoji = emojiToBePlaced;
	}
	return randomEmojiArr;
}

function populateRandomEmojiArr(randomEmojiArr) {
	for (let i = 0; i < emojiArr.length; i++) {
		const emojiObj = {
			present: false,
			emoji: "",
		};

		randomEmojiArr[i] = emojiObj;
	}
}

function generateRandomIndex() {
	const randomIndex = Math.floor(Math.random() * 16);

	return randomIndex;
}

placeRandomEmojis();

cardWrapper.forEach((each) => {
	each.addEventListener("click", clickListener);
});

function clickListener(e) {
	timeCounter++;
	if (timeCounter == 1) {
		startCounter();
	}
	e.currentTarget.classList.add("active");

	doSomething(this);
}

function startCounter() {
	let seconds = 0;
	let minutes = 0;
	intervalStamp = setInterval(() => {
		seconds++;
		if (seconds === 60) {
			seconds = 0;
			minutes++;
		}
		let displaySeconds = String(seconds).padStart(2, "0");
		let displayMinutes = String(minutes).padStart(2, "0");
		timerSpan.innerText = `${displayMinutes}:${displaySeconds}`;
	}, 1000);
}
