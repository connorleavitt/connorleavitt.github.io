const inputs = document.querySelectorAll('input');

const patterns = {
    username: /^[a-z\d]{5,12}$/i,
    email: /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/,
    password: /^[\w@-]{8,20}$/i,
    telephone: /^[(]?\d{3}[)]?-?\d{3}-?\d{4}$/,
    slug: /^[a-z\d-]{8,20}$/,
    numGuess: /^([1-9]|[1-9][0-9]|100)$/
}


function validate(field, regex) {
    if(regex.test(field.value)) {
        field.className = 'valid';
    } else {
        field.className = 'invalid';
    }
};

// inputs.forEach((input) => {
//     input.addEventListener('keyup', (e) => {
//         // console.log(e.target.attribute.name.value);
//         validate(e.target, patterns[e.target.attributes.name.value])
//     });
// });


// function downup() {
//     let input = 'cowboy';
//     for (let i = 0; i < input.length; i++) {
//         let result = input.slice(0,input.length-i);
//         console.log(result);
//         if (result.length === 1) {
//             for (let i = 1; i < input.length; i++) {
//                 let result2 = input.slice(0,result.length+i);
//                 console.log(result2);
//             };
//         };
//     };
// }

// downup();

// when numberGuess
// generate random number between 1 - 100
// user inputs guess (fail if not a number)
// compare against randomally generated number from above
// inform user if guess is too high or low
// record result w/ message
// allow user to guess again (loop for 10 times)
// if successful guess, msg
// if fail, msg

let randomNumber = Math.floor(Math.random()*100) + 1;

const guesses = document.querySelector('.guesses');
const lastResult = document.querySelector('.lastResult');
const lowOrHi = document.querySelector('.lowOrHi');
const guessSubmit = document.querySelector('.guessSubmit');
const guessField = document.querySelector('.guessField');
console.log(lowOrHi);

let guessCount = 1;
let resetButton;

function checkGuess() {

  const userGuess = Number(guessField.value);
  if(guessCount === 1) {
    guesses.textContent = 'Previous guesses: ';
  }
  guesses.textContent += userGuess + ' ';

  if(userGuess === randomNumber) {
    lastResult.textContent = 'Congratulations! You got it right!';
    lastResult.style.backgroundColor = 'green';
    lowOrHi.textContent = '';
    setGameOver();
  } else if(guessCount === 10) {
    lastResult.textContent = '!!!GAME OVER!!!';
    setGameOver();
  } else {
    lastResult.textContent = 'Wrong!';
    lastResult.style.backgroundColor = 'red';
    if(userGuess < randomNumber) {
      lowOrHi.textContent = 'Last guess was too low!';
    } else if(userGuess > randomNumber) {
      lowOrHi.textContent = 'Last guess was too high!';
    }
  }

  guessCount++;
  guessField.value = '';
  guessField.focus();
}
guessSubmit.addEventListener('click', checkGuess);

function setGameOver() {
    guessField.disabled = true;
    guessSubmit.disabled = true;
    resetButton = document.createElement('button');
    resetButton.textContent = 'Start new game';
    document.body.appendChild(resetButton);
    resetButton.addEventListener('click', resetGame);
}

function resetGame() {
    guessCount = 1;

  const resetParas = document.querySelectorAll('.resultParas p');
  for (const resetPara of resetParas) {
    resetPara.textContent = '';
  }
    resetButton.parentNode.removeChild(resetButton);

    guessField.disabled = false;
    guessSubmit.disabled = false;
    guessField.value = '';
    guessField.focus();

    lastResult.style.backgroundColor = 'white';

    randomNumber = Math.floor(Math.random()*100) + 1;
}
