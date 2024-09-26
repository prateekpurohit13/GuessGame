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

//const hiddenMessage1 = 'SG93IGRvIHlvdSBjaG9vc2UgYmV0d2VlbiBicmFuZHMgb2YgcGVhcz8gSSdtIGNyb3VjaGVkIG92ZXIgYSBmcmVlemVyIGluIHRoZSBzdXBlcm1hcmtldCBhbmQgdGhlcmUncyBubyBnb2luZyBiYWNrLiBBcyBJIHB1c2gsIEkgY2FudCBzdG9wIGltYWdpbmluZyB0aGUgdHJvbGxleSBhcyBhIHB1c2hjYWlyLg==';
const hiddenMessage1 = 'WW91IEd1ZXNzZWQgaXQgcmlnaHQhIEhlcmUncyB5b3VyIHJld2FyZDotCkhvdyBkbyB5b3UgY2hvb3NlIGJldHdlZW4gYnJhbmRzIG9mIHBlYXM/IEknbSBjcm91Y2hlZCBvdmVyIGEgZnJlZXplciBpbiB0aGUgc3VwZXJtYXJrZXQgYW5kIEknbSBhdCBhbiBpbXBhc3NlLiBFdmVyeSBzbWFsbCBkZWNpc2lvbiBub3cgc2VlbXMgYm90aCB0cml2aWFsIGFuZCBpbnN1cm1vdW50YWJsZS4gSSBzZWUgdGhlIHdyaW5rbGVkLCBwYWxlLCByaW5nbGVzcyBoYW5kIG9mIGEgc3RyYW5nZXIgcmVhY2ggZnJvbSB1bmRlciBteSBzaG91bGRlciBhbmQgcGljayB1cCB0aGUgYmlnZ2VzdCBwYWNrZXQsIHNvIEkgZG8gdGhlIHNhbWUuIEkgcGxhY2UgaXQgaW4gdGhlIHRyb2xsZXksIHJldmVyc2UgYW5kIGhlYWQgdG93YXJkcyB0aGUgY2hlY2tvdXQuCgpBcyBJIHB1c2gsIEkgaW1hZ2luZSB0aGUgdHJvbGxleSBhcyBhIHB1c2hjaGFpci4gRGFubnkgaXMgaW4gdGhlcmUsIHNsZWVwaW5nIHdpdGggaGlzIHRodW1iIGluIGhpc21vdXRoLCBnZW50bHkgcnViYmluZyB0aGUgYnJpZGdlIG9mIGhpcyBub3NlIHdpdGggaGlzIGZvcmVmaW5nZXIuIEkgaW1hZ2luZSB0aGF0IFZpY3RvcmlhIGlzIGEgZmV3IGFpc2xlcyBkb3duLCBmZWVsaW5nIGZvciBhIHBlcmZlY3RseSByaXBlIG1lbG9uIG9yIGxvYWRpbmcgYSBzZWNvbmQgdHJvbGxleSB3aXRoIG5hcHBpZXMgYW5kIGZvcm11bGEgZm9yIHRoZSBiYWJ5LgoKV2hlbiBJIHJlYWNoIHRoZSB0aWxscywgSSBqb2luIHRoZSBuZWFyZXN0IHF1ZXVlLCB3YWl0aW5nIGZvciBteSB0dXJuIHdoaWxlIHRoZSB3b21hbiBpbiBmcm9udCBsb2FkcyB0aGUgY29udmV5b3IgYmVsdCB3aXRoIHRoZSB3ZWVrbHkgc2hvcCBmb3IgaGVyIGZhbWlseTogcGFja2V0IGFmdGVyIHBhY2tldCBvZiBjZXJlYWwsIHBvd2RlciBmb3IgbWFraW5nIGNob2NvbGF0ZSBtaWxrLCBtb3JlIGJhZ3Mgb2YgY3Jpc3BzIHRoYW4geW91J2QgbmVlZCB0byBmZWVkIGFuIGFybXkuIFNoZSdzIG1vdmluZyBhdCBpbmNyZWRpYmxlIHNwZWVkLCBsaWtlIGEgY29udmV5b3IgYmVsdCBoZXJzZWxmLCBncmFiYmluZyB0aHJlZSBpdGVtcyBhdCBvbmNlIGFuZCBmbGluZ2luZyB0aGVtIGRvd24uIEkgbG9vayB0byBteSByaWdodCBhbmQgc2VlIHRoYXQgdGhlIHRpbGwgbmV4dCB0byBtZSBoYXMgYSBtdWNoIHNob3J0ZXIgcXVldWUsIGJ1dCBJJ20gaW4gbm8gcnVzaKB0b6BnZXSgaG9tZS4=';

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
        displayMessage(atob(hiddenMessage1));
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
    displayMessage(atob(hiddenMessage1));
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
  lowOrHi.innerHTML = `<h2 class="text-xl">${message}</h2>`;
}

function endGame() {
  userInput.value = '';
  userInput.setAttribute('disabled', '');z
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
