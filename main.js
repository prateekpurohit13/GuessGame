let randomNumber = parseInt(Math.random() * 100 + 1);

const submit = document.querySelector('#subt');
const userInput = document.querySelector('#guessField');
const guessSlot = document.querySelector('.guesses');
const remaining = document.querySelector('.lastResult');
const lowOrHi = document.querySelector('.lowOrHi');
const startOver = document.querySelector('.resultParas');

const p = document.createElement('p');

let prevGuess = [];
let numGuess = 1;
let playGame = true;

// Full message you want to display on correct guess, encoded in Base64
const hiddenMessage1 = 'SG93IGRvIHlvdSBjaG9vc2UgYmV0d2VlbiBicmFuZHMgb2YgcGVhcz8gSSdtIGNyb3VjaGVkIG92ZXIgYSBmcmVlemVyIGluIHRoZSBzdXBlcm1hcmtldCBhbmQgdGhlcmUncyBubyBnb2luZyBiYWNrLiBBcyBJIHB1c2gsIEkgY2FudCBzdG9wIGltYWdpbmluZyB0aGUgdHJvbGxleSBhcyBhIHB1c2hjYWlyLgoKQXMgSSBwdXNoLCBJIGltYWdpbmUgdGhlIHRyb2xsZXkgYXMgYSBwdXNoY2hhaXIuIERhbm55IGlzIGluIHRoZXJlLCBzbGVlcGluZyB3aXRoIGhpcyB0aHVtYiBpbiBoaXMgbW91dGgsIGdlbnRseSBydWJiaW5nIHRoZSBicmlkZ2Ugb2YgaGlzIG5vc2Ugd2l0aCBoaXMgZm9yZWZpbmdlci4gSSBpbWFnaW5lIHRoYXQgVmljdG9yaWEgaXMgYSBmZXcgYWlzbGVzIGRvd24sIGZlZWxpbmcgZm9yIGEgcGVyZmVjdGx5IHJpcGUgbWVsb24gb3IgbG9hZGluZyBhIHNlY29uZCB0cm9sbGV5IHdpdGggbmFwcGllcyBhbmQgZm9ybXVsYSBmb3IgdGhlIGJhYnkuCgpXaGVuIEkgcmVhY2ggdGhlIHRpbGxzLCBJJ2xsIGpvaW4gdGhlIG5lYXJlc3QgcXVldWUsIHdhaXRpbmcgZm9yIG15IHR1cm4gd2hpbGUgdGhlIHdvbWFuIGluIGZyb250IGxvYWRzIHRoZSBjb252ZXlvciBiZWx0IHdpdGggdGhlIHdlZWtseSBzaG9wIGZvciBoZXIgZmFtaWx5OiBwYWNrZXQgYWZ0ZXIgcGFja2V0IG9mIGNlcmVhbCwgcG93ZGVyIGZvciBtYWtpbmcgY2hvY29sYXRlIG1pbGssIG1vcmUgYmFncyBvZiBjcmlzcHMgdGhhbiB5b3UndCBuZWVkIHRvIGZlZWQgYW4gYXJteS4gU2hlJ3MgbW92aW5nIGF0IGluY3JlZGlibGUgc3BlZWQsIGxpa2UgYSBjb252ZXlvciBiZWx0IGhlcnNlbGYsIGdyYWJiaW5nIHRocmVlIGl0ZW1zIGF0IG9uY2UuIEkgbG9vayB0byBteSByaWdodCBhbmQgc2VlIHRoYXQgdGhlIHRpbGwgbmV4dCB0byBtZSBpcyBhIG11Y2ggc2hvcnRlciBxdWV1ZSwgYnV0IEknIGluIG5vIHJ1c2ggdG8gZ2V0IGhvbWUu';

if (playGame) {
  submit.addEventListener('click', function (e) {
    e.preventDefault();
    const guess = parseInt(userInput.value);
    console.log(guess); // Debugging (can be removed)
    validateGuess(guess);
  });
}

function validateGuess(guess) {
  if (isNaN(guess)) {
    alert('Please enter a valid number');
  } else if (guess < 1) {
    alert('Please enter a number more than 1');
  } else if (guess > 100) {
    alert('Please enter a number less than 100');
  } else {
    prevGuess.push(guess);

    if (numGuess === 10) {
      if (guess === randomNumber) {
        displayGuess(guess);
        displayMessage(atob(hiddenMessage1)); // Decode and display hidden message 1
      } else {
        displayGuess(guess);
        displayMessage(`Game Over. Random number was ${randomNumber}`);
      }
      endGame();
    } else {
      displayGuess(guess);
      checkGuess(guess);
    }
  }
}

function checkGuess(guess) {
  if (guess === randomNumber) {
    displayMessage(atob(hiddenMessage1)); // Decode and display hidden message 1
    endGame();
  } else if (guess < randomNumber) {
    displayMessage(`Your Number is low`);
  } else if (guess > randomNumber) {
    displayMessage(`Your Number is High`);
  }
}

function displayGuess(guess) {
  userInput.value = '';
  guessSlot.innerHTML += `${guess}, `;
  numGuess += 1;
  remaining.innerHTML = `${11 - numGuess}`;
}

function displayMessage(message) {
  const paragraphs = message.split('\n\n'); // Split message into paragraphs by double newline
  lowOrHi.innerHTML = ''; // Clear previous content
  paragraphs.forEach((paragraph) => {
    const paraElement = document.createElement('p');
    paraElement.className = 'text-xl mb-4'; // Add any necessary styling here
    paraElement.textContent = paragraph;
    lowOrHi.appendChild(paraElement); // Add each paragraph as a new <p> element
  });
}

function endGame() {
  userInput.value = '';
  userInput.setAttribute('disabled', '');
  p.classList.add('button');
  p.innerHTML = `<h2 id="newGame" class="mt-4 border border-gray-400 rounded px-4 py-2 text-green-300 w-40 h-10 flex items-center justify-center mx-auto">Start new Game</h2>`;
  startOver.appendChild(p);
  playGame = false;
  newGame();
}

function newGame() {
  const newGameButton = document.querySelector('#newGame');
  newGameButton.addEventListener('click', function (e) {
    randomNumber = parseInt(Math.random() * 100 + 1);
    prevGuess = [];
    numGuess = 1;
    guessSlot.innerHTML = '';
    remaining.innerHTML = `${11 - numGuess}`;
    userInput.removeAttribute('disabled');
    startOver.removeChild(p);

    playGame = true;
  });
}
