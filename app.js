const letters = document.querySelector(".letters");
const wrongLettersEL = document.querySelector(".wrong-letter");
const lines = document.querySelectorAll(".figure-part");

const msgFinal = document.querySelector(".msg-final");
const msgFinalLost = document.querySelector(".msg-final-lost");

const playAgain = document.querySelector(".play-again");
const playAgainLost = document.querySelector(".play-again-lost");

const content = document.querySelector(".content");
const notification = document.querySelector(".notification");

var myArray = [
  "montre",
  "application",
  "voiture",
  "maison",
  "table",
  "fenetre",
];

var correctLetters = [];
var wrongLetters = [];

var lost = 0;
var word;

function randomWord() {
  var selectedWord = myArray[Math.floor(Math.random() * myArray.length)];
  word = selectedWord;
  create(word);
}
randomWord();

function create(word) {
  for (var i = 0; i < word.length; i++) {
    var span = document.createElement("span");
    span.classList.add("correct-letters");
    span.innerHTML = "_";
    letters.appendChild(span);
  }
}

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

var playable = true;

function reset() {
  playable = true;
  var theWordWas = document.querySelector(".msg-final-lost span");
  //theWordWas.remove();
  removeAllChildNodes(letters);
  removeAllChildNodes(wrongLettersEL);
  msgFinal.classList.add("hide");
  correctLetters = [];
  wrongLetters = [];
  countLines = 0;
  count = 0;
  playAgain.classList.add("play-again");
  playAgainLost.classList.add("play-again");
  msgFinalLost.classList.add("hide");
  content.classList.add("hide");
  lines.forEach(function (line) {
    if (!line.classList.contains("figure-part")) {
      line.classList.add("figure-part");
    }
  });
  randomWord();
}

var count = 0;
var countLines = 0;

window.addEventListener("keypress", function (e) {
  if (playable) {
    var alph = /^[A-Za-z]+$/;
    var key = e.key.toLowerCase();
    if (e.key.match(alph)) {
      var contains = word.includes(key);
      var compare = isEqual(word.split(""), correctLetters);
      if (count == 12) {
        if (compare) {
          playAgain.classList.remove("play-again");
          msgFinal.classList.remove("hide");
        } else {
          playAgain.classList.remove("play-again");
        }
      } else {
        if (contains) {
          var spans = document.querySelectorAll(".correct-letters");
          if (!correctLetters.includes(key)) {
            count++;
            for (var i = 0; i < word.length; i++) {
              if (word[i] === key) {
                correctLetters.push(key);
                spans[i].innerHTML = key;
              }
            }
          } else {
            showNotification();
          }
          compare = isEqual(word.split(""), correctLetters);
          if (compare) {
            content.classList.remove("hide");
            playAgain.classList.remove("play-again");
            msgFinal.classList.remove("hide");
            playable = false;
          }
        } else {
          if (!wrongLetters.includes(key)) {
            lines[countLines].classList.remove("figure-part");
            countLines++;

            wrongLetters.push(key);

            var wrongSpan = document.createElement("span");
            wrongSpan.innerHTML =
              wrongSpan.innerHTML == ""
                ? key + ","
                : wrongSpan.innerHTML + "," + key;
            wrongLettersEL.appendChild(wrongSpan);
          } else {
            showNotification();
          }
          if (wrongLetters.length == 6) {
            content.classList.remove("hide");
            playAgainLost.classList.remove("play-again");
            msgFinalLost.classList.remove("hide");
            playable = false;
            var leMot = document.createElement("span");
            leMot.style.display = "block";
            leMot.innerHTML = "The word was: " + word;
            msgFinalLost.appendChild(leMot);
          }
        }
      }
    }
  }
});

// Show notification
function showNotification() {
  notification.classList.remove("hide");
  setTimeout(() => {
    notification.classList.add("hide");
  }, 2000);
}

//Function to compare two arrays (we have to sort the "correctLetters" array)

function isEqual(tab, tab2) {
  var bool = true;
  if (tab.length == 0 || tab2.length == 0) {
    return false;
  } else if (tab.length != tab2.length) {
    return false;
  } else {
    for (var i = 0; i < tab.length; i++) {
      //order both arrays
      tab = tab.sort(function (a, b) {
        if (a < b) {
          return -1;
        } else if (a > b) {
          return 1;
        } else {
          return 0;
        }
      });
      tab2 = tab2.sort(function (a, b) {
        if (a < b) {
          return -1;
        } else if (a > b) {
          return 1;
        } else {
          return 0;
        }
      });
      for (var j = 0; j < tab.length; j++) {
        if (tab[i] != tab2[i]) {
          bool = false;
          return bool;
        }
      }
    }
  }
  return bool;
}

playAgain.addEventListener("click", reset);
playAgainLost.addEventListener("click", reset);
