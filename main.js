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

if (playGame) {
  submit.addEventListener('click', function (e) {
    e.preventDefault();
    const guess = parseInt(userInput.value);
    console.log(guess);
    validateGuess(guess);
  });
}

function validateGuess(guess) {
  if (isNaN(guess)) {
    alert('Please enter a valid number');
  } else if (guess < 1) {
    alert('Please enter a number more than 1');
  } else if (guess > 100) {
    alert('Please enter a  number less than 100');
  } else {
    prevGuess.push(guess);

    if (numGuess === 10) {
      if (guess === randomNumber) {
        displayGuess(guess);
        displayMessage(`You guessed it right. Here's your reward:-
          \nHow do you choose between brands of peas? I'm crouched over a freezer in the supermarket
          and I'm at an impasse. Every small decision now seems both trivial and insurmountable. I see
          the wrinkled, pale, ringless hand of a stranger reach from under my shoulder and pick up the
          biggest packet, so I do the same. I place it in the trolley, reverse and head towards the checkout.
          \nAs I push, I imagine the trolley as a pushchair. Danny is in there, sleeping with his thumb in his
          mouth, gently rubbing the bridge of his nose with his forefinger. I imagine that Victoria is a few
          aisles down, feeling for a perfectly ripe melon or loading a second trolley with nappies and
          formula for the baby.\n
          When I reach the tills, I join the nearest queue, waiting for my turn while the woman in front
          loads the conveyor belt with the weekly shop for her family: packet after packet of cereal,
          powder for making chocolate milk, more bags of crisps than you'd need to feed an army. She's
          moving at incredible speed, like a conveyor belt herself, grabbing three items at once and
          flinging them down. I look to my right and see that the till next to me has a much shorter queue,
          but I'm in no rush to get home.
    `);}else{
      displayGuess(guess);
      displayMessage(`Game Over. Random number was ${randomNumber}`);}
      endGame();

    } else {
      displayGuess(guess);
      checkGuess(guess);
    }
  }
}

function checkGuess(guess) {
  if (guess === randomNumber) {
    displayMessage(`You guessed it right. Here's your reward:-
      Um Ihren Besuch wie den ausruhen,
      Ein Urlaub des Lichts,
      Und alle dein Freuden sind mein Gäste.
`);
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
  numGuess+=1;
  remaining.innerHTML = `${11 - numGuess} `;
}

function displayMessage(message) {
  lowOrHi.innerHTML = `<h2 class="text-xl">${message}</h2>`;
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
    remaining.innerHTML = `${11 - numGuess} `;
    userInput.removeAttribute('disabled');
    startOver.removeChild(p);

    playGame = true;
  });
}

