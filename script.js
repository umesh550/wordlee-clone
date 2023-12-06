let wordlee = [
  "TIGER",
  "SMILE",
  "CREEK",
  "WATCH",
  "BLAZE",
  "JUMBO",
  "CIDER",
  "AMBER",
  "HORSE",
  "VITAL",
  "OASIS",
  "PLUSH",
  "TRAMP",
  "GIDDY",
  "PLUTO",
  "FABLE",
  "CHIRP",
  "MIRTH",
  "SNAIL",
  "BLISS",
  "FLOCK",
  "FLUTE",
  "ORBIT",
  "POUCH",
  "STORK",
  "LATCH",
  "JOUST",
  "QUEST",
  "RADAR",
  "FROST",
  "YACHT",
  "OLIVE",
  "GLOOM",
  "SPARK",
  "QUIRK",
  "SWEEP",
  "GRAVY",
  "QUOTA",
  "YODEL",
  "NUDGE",
  "BLUSH",
  "JOLLY",
  "ABYSS",
  "SURGE",
  "SNARE",
  "QUILL",
  "MIRTH",
  "BLIMP",
  "RAZOR",
  "GREET",
  "AMBER",
  "ZEBRA",
  "FUDGE",
  "SWING",
  "GLIDE",
  "FORGE",
  "COWER",
  "BRISK",
  "CRISP",
  "CHIME",
  "PRISM",
  "FLARE",
  "PUPIL",
  "LATCH",
  "DIVER",
  "SWOOP",
  "ZESTY",
  "STUMP",
  "CHIRP",
  "PLUME",
  "HINGE",
  "OLIVE",
  "FABLE",
  "QUIRK",
  "LEDGE",
  "SNOUT",
  "ABYSS",
  "PIXEL",
  "QUEST",
  "JOUST",
  "VOWEL",
  "QUOTA",
  "GRAVY",
  "BADGE",
  "COMET",
  "JUMBO",
  "SHRUB",
  "FROWN",
  "YACHT",
  "POUCH",
  "GLIMP",
  "GLIDE",
  "QUIRK",
  "BLIMP",
  "PRAWN",
  "FOLLY",
  "GRIME",
  "MOUND",
  "PLUSH",
  "PLAID",
  "POWER",
  "SORRY",
];

let attempt = 0;
let words = [];
let tileNumber = 1;
let word = "";
let randomWord;
let checkWin = false;
let checkLost = false;
const MAX_WORD_LENGTH = 5;

const getRandomWord = (wordArray) => {
  const randomIndex = Math.floor(Math.random() * wordArray.length);
  return wordArray[randomIndex];
};

const checkAnswer = (data) => {
  checkWin = data === words[attempt - 1];
  checkLost = attempt === 6;
};

const initializeGame = () => {
  randomWord = getRandomWord(wordlee).toUpperCase();
};

const incorrectLetter = () => {
  const targetWord = words[attempt - 1];
  targetWord.split("").forEach((letter, i) => {
    if (!randomWord.includes(letter)) {
      const tile_number = i + 1 + (attempt - 1) * 5;
      applyLetterStyles(letter, tile_number, "IncorrectLetter");
    }
  });
};

const misplacedLetter = () => {
  const targetWord = words[attempt - 1];
  targetWord.split("").forEach((letter, i) => {
    if (randomWord.includes(letter)) {
      const tile_number = i + 1 + (attempt - 1) * 5;
      applyLetterStyles(letter, tile_number, "MisplacedLetter");
    }
  });
};

const correctPositionLetter = () => {
  const targetWord = words[attempt - 1];
  targetWord.split("").forEach((letter, i) => {
    if (randomWord[i] === letter) {
      const tile_number = i + 1 + (attempt - 1) * 5;
      applyLetterStyles(letter, tile_number, "CorrectPositionLetter");
    }
  });
};

const applyLetterStyles = (letter, tile_number, style) => {
  const tileElement = document.querySelector(`.tile-${tile_number}`);
  const keypadElement = document.querySelector(`[data-key="${letter}"]`);
  keypadElement.classList.add(style);
  tileElement.classList.add(style);

  if (
    style === "CorrectPositionLetter" &&
    tileElement.classList.contains("MisplacedLetter")
  ) {
    tileElement.classList.remove("MisplacedLetter");
    keypadElement.classList.remove("MisplacedLetter");
  }
};

const updateTile = (key) => {
  if (!checkWin && !checkLost) {
    const currentTile = document.querySelector(`.tile-${tileNumber}`);
    const uppercaseKey = key.toUpperCase();

    if (isValidKey(uppercaseKey) && word.length < MAX_WORD_LENGTH) {
      updateTileContent(currentTile, uppercaseKey);
      currentTile.classList.add("animation");
      setTimeout(() => {
        currentTile.classList.remove("animation");
      }, 100);
    } else if (isBackspaceKey(key) && tileNumber > 1) {
      handleBackspace();
    } else if (isEnterKey(key) && word.length === MAX_WORD_LENGTH) {
      handleEnter();
    }
  }
};

const isValidKey = (key) => /^[A-Z]$/.test(key);

const isBackspaceKey = (key) => key === "Backspace";

const isEnterKey = (key) => key === "Enter";

const updateTileContent = (tile, content) => {
  tile.innerText = content;
  tileNumber += 1;
  word += content;
};

const handleBackspace = () => {
  if (!(word.length === 0)) {
    tileNumber -= 1;
    const currentTile = document.querySelector(`.tile-${tileNumber}`);
    if (currentTile) {
      currentTile.innerHTML = "";
    }
    word = word.slice(0, -1);
  }
};

const handleEnter = () => {
  if (wordlee.includes(word)) {
    words.push(word);
    word = "";
    attempt = words.length;
    incorrectLetter();
    misplacedLetter();
    correctPositionLetter();
    checkAnswer(randomWord);
    setTimeout(() => {
      if (checkWin) {
        alert("You Won!🏆");
      } else if (checkLost) {
        alert("You Lost the game!🤕\n The Word is " + randomWord);
      }
    }, 500); // Adjust the delay time as needed
  } else {
    alert("Not in word List");
  }
};

const alphabetKeys = document.querySelectorAll(".key");

alphabetKeys.forEach((key) => {
  key.addEventListener("click", () => {
    const keyValue = key.innerText;
    updateTile(keyValue);
    if (key.classList.contains("enter")) {
      handleEnter();
    } else if (key.classList.contains("backspace")) {
      handleBackspace();
    }
  });
});

// ... (remaining code remains unchanged)

const handleKeyDown = (e) => {
  const pressedKey = e.key;
  updateTile(pressedKey);
};

window.addEventListener("keydown", handleKeyDown);

// Call initializeGame to start the game
initializeGame();
