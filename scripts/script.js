'use strict';

//? Confetti animation Begins {

var maxParticleCount = 150; //set max confetti count
var particleSpeed = 2; //set the particle animation speed
var startConfetti; //call to start confetti animation
var stopConfetti; //call to stop adding confetti
var toggleConfetti; //call to start or stop the confetti animation depending on whether it's already running
var removeConfetti; //call to stop the confetti animation and remove all confetti immediately

(function () {
  startConfetti = startConfettiInner;
  stopConfetti = stopConfettiInner;
  toggleConfetti = toggleConfettiInner;
  removeConfetti = removeConfettiInner;
  var colors = [
    'DodgerBlue',
    'OliveDrab',
    'Gold',
    'Pink',
    'SlateBlue',
    'LightBlue',
    'Violet',
    'PaleGreen',
    'SteelBlue',
    'SandyBrown',
    'Chocolate',
    'Crimson',
  ];
  var streamingConfetti = false;
  var animationTimer = null;
  var particles = [];
  var waveAngle = 0;

  function resetParticle(particle, width, height) {
    particle.color = colors[(Math.random() * colors.length) | 0];
    particle.x = Math.random() * width;
    particle.y = Math.random() * height - height;
    particle.diameter = Math.random() * 10 + 5;
    particle.tilt = Math.random() * 10 - 10;
    particle.tiltAngleIncrement = Math.random() * 0.07 + 0.05;
    particle.tiltAngle = 0;
    return particle;
  }

  function startConfettiInner() {
    var width = window.innerWidth;
    var height = window.innerHeight;
    window.requestAnimFrame = (function () {
      return (
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback) {
          return window.setTimeout(callback, 16.6666667);
        }
      );
    })();
    var canvas = document.getElementById('confetti-canvas');
    if (canvas === null) {
      canvas = document.createElement('canvas');
      canvas.setAttribute('id', 'confetti-canvas');
      canvas.setAttribute(
        'style',
        'display:block;z-index:999999;position:absolute;top:0px;pointer-events:none'
      );
      document.body.appendChild(canvas);
      canvas.width = width;
      canvas.height = height;
      window.addEventListener(
        'resize',
        function () {
          canvas.width = window.innerWidth;
          canvas.height = window.innerHeight;
        },
        true
      );
    }
    var context = canvas.getContext('2d');
    while (particles.length < maxParticleCount)
      particles.push(resetParticle({}, width, height));
    streamingConfetti = true;
    if (animationTimer === null) {
      (function runAnimation() {
        context.clearRect(0, 0, window.innerWidth, window.innerHeight);
        if (particles.length === 0) animationTimer = null;
        else {
          updateParticles();
          drawParticles(context);
          animationTimer = requestAnimFrame(runAnimation);
        }
      })();
    }
  }

  function stopConfettiInner() {
    streamingConfetti = false;
  }

  function removeConfettiInner() {
    stopConfetti();
    particles = [];
  }

  function toggleConfettiInner() {
    if (streamingConfetti) stopConfettiInner();
    else startConfettiInner();
  }

  function drawParticles(context) {
    var particle;
    var x;
    for (var i = 0; i < particles.length; i++) {
      particle = particles[i];
      context.beginPath();
      context.lineWidth = particle.diameter;
      context.strokeStyle = particle.color;
      x = particle.x + particle.tilt;
      context.moveTo(x + particle.diameter / 2, particle.y);
      context.lineTo(x, particle.y + particle.tilt + particle.diameter / 2);
      context.stroke();
    }
  }

  function updateParticles() {
    var width = window.innerWidth;
    var height = window.innerHeight;
    var particle;
    waveAngle += 0.01;
    for (var i = 0; i < particles.length; i++) {
      particle = particles[i];
      if (!streamingConfetti && particle.y < -15) particle.y = height + 100;
      else {
        particle.tiltAngle += particle.tiltAngleIncrement;
        particle.x += Math.sin(waveAngle);
        particle.y +=
          (Math.cos(waveAngle) + particle.diameter + particleSpeed) * 0.5;
        particle.tilt = Math.sin(particle.tiltAngle) * 15;
      }
      if (particle.x > width + 20 || particle.x < -20 || particle.y > height) {
        if (streamingConfetti && particles.length <= maxParticleCount)
          resetParticle(particle, width, height);
        else {
          particles.splice(i, 1);
          i--;
        }
      }
    }
  }
})();
//? } Confetti Animation Ended

//! Random Number Generator
const randomNumber = function () {
  return Math.trunc(Math.random() * 20) + 1;
};

//! Display Message
const displayMessage = function (message) {
  document.querySelector('.message').textContent = message;
};

//* Animation Logic Begins {

//! Winning Animation
const winningAnimation = function () {
  const audio = new Audio('/assests/Sounds/Win.mp3');
  audio.play();
  startConfetti();
};

//! Error Audio Play
const playErrorBGM = function () {
  const audio = new Audio('/assests/Sounds/wrong.mp3');
  audio.play();
};

//! Shaking Animation CSS Added
const animationShake = function () {
  document.querySelector('body').classList.add('animate');
};

//! Shaking Animation Generator
const generateAnimation = function () {
  animationShake();
  playErrorBGM();
  const myInterval = setTimeout(clearAnimation, 400);
};

//! Clear Animation Function
const clearAnimation = function () {
  document.querySelector('body').classList.remove('animate');
};
//* Animation Logic Ended

//! Lose Animation Generator
const loseAnimation = function () {
  const audio = new Audio('assests/Sounds/lose.mp3');
  animationShake();
  audio.play();
};

//! Logic Begins Here
let secretNumber = randomNumber();
let score = 5;
let highscore = 0;

document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);

  // When there is no input
  if (!guess) {
    displayMessage('⛔️ No number!');
    generateAnimation();
  }

  //when there is input
  else if (guess === secretNumber) {
    displayMessage('🎉 Correct Number!');
    document.querySelector('.number').textContent = secretNumber;
    document.querySelector('body').style.backgroundColor = '#60b347';
    document.querySelector('.number').style.width = '30rem';
    winningAnimation();
    if (score > highscore) {
      highscore = score;
      document.querySelector('.highscore').textContent = highscore;
    }

    // When guess is wrong
  } else if (guess !== secretNumber) {
    if (score > 1) {
      displayMessage(guess > secretNumber ? '📈 Too high!' : '📉 Too low!');
      score--;
      generateAnimation();
      document.querySelector('.score').textContent = score;
    } else {
      displayMessage('💥 You lost the game!');
      document.querySelector('body').style.backgroundColor = '#EB1D36';
      document.querySelector('.number').textContent = secretNumber;
      document.querySelector('.score').textContent = 0;
      loseAnimation();
    }
  }
});

//! Again Button Reset The Game
document.querySelector('.again').addEventListener('click', function () {
  score = 5;
  secretNumber = randomNumber();
  stopConfetti();
  displayMessage('Start guessing...');
  document.querySelector('.score').textContent = score;
  document.querySelector('.number').textContent = '?';
  document.querySelector('.guess').value = '';

  document.querySelector('body').style.backgroundColor = '#4e6e81';
  document.querySelector('.number').style.width = '15rem';
});
