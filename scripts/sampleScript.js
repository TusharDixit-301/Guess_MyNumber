'use strict';

let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 5;
let highScore = 0;
document.querySelector('.number').textContent = secretNumber;
document.querySelector('.check').addEventListener('click', function () {
  const guessNumber = Number(document.querySelector('.guess').value);

  //! When input value is NULL
  if (!guessNumber) {
    document.querySelector('.message').textContent = 'No Input Number';
  }
  //? when there is a input number
  else {
    //* when the score is there
    if (score > 1) {
      if (guessNumber < secretNumber) {
        document.querySelector('.message').textContent = 'Too Low';
        score--;
        document.querySelector('.score').textContent = String(score);
      } else if (guessNumber > secretNumber) {
        document.querySelector('.message').textContent = 'Too High';
        score--;
        document.querySelector('.score').textContent = String(score);
      }

      //* When User Wins...
      else if (guessNumber === secretNumber) {
        document.querySelector('.score').textContent = String(score);
        document.querySelector('.message').textContent = 'Correct';
        document.querySelector('.number').textContent = String(guessNumber);
        document.querySelector('.highscore').textContent = String(highScore);
        document.querySelector('body').style.backgroundColor = 'green';
        document.querySelector('.number').style.width = '30rem';
        if (highScore < score) {
          highScore = score;
          document.querySelector('.highscore').textContent = String(highScore);
        }
      }
      console.log('Running score: ' + score);
    }

    //! When the score is Zero.
    else {
      if (guessNumber === secretNumber) {
        document.querySelector('.message').textContent = 'Correct';
        document.querySelector('.number').textContent = String(guessNumber);
        document.querySelector('.highscore').textContent = String(highScore);
        document.querySelector('body').style.backgroundColor = 'green';
        document.querySelector('.number').style.width = '30rem';
        if (highScore < score) {
          highScore = score;
          document.querySelector('.highscore').textContent = String(highScore);
        }
      } else {
        document.querySelector('.message').textContent = 'You Lost';
        document.querySelector('body').style.backgroundColor = 'red';
        document.querySelector('.number').textContent = secretNumber;
        console.log('Failed');
        document.querySelector('.score').textContent = String(score);
      }
    }
  }
});

document.querySelector('.again').addEventListener('click', function () {
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  document.querySelector('.number').textContent = secretNumber;

  score = 5;
  document.querySelector('.score').textContent = String(score);
  document.querySelector('.number').textContent = '?';
  document.querySelector('.message').textContent = 'Start guessing...';
  document.querySelector('.guess').value = '';
  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.number').style.width = '15rem';
});
