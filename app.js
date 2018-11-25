var scores = [0, 0];
var roundScore = 0;
var activePlayer = 0;
var winner = false;
var finalScore = document.querySelector('#maxScore').value;
var playerPanels = document.getElementsByClassName('panel');
var diceDOM = document.getElementsByClassName('dice');
var die1DOM = document.querySelector('#die1');
var die2DOM = document.querySelector('#die2');

// Set score values with JS
// document.querySelector('#score-0').textContent = scores[0]
// document.querySelector('#score-1').textContent = scores[1]

// Hide dice
function hideDice() {
  var i;
  for (i = 0; i < diceDOM.length; i++) {
      diceDOM[i].style.display = 'none';
  }
};
hideDice();

// Switch player and CSS
function switchPlayer() {
  // Toggle active class amongs panels
  var i;
  for (i = 0; i < playerPanels.length; i++) {
      playerPanels[i].classList.toggle("active");
  }

  // Switch player value
  if (activePlayer === 0) {
    activePlayer = 1;
  } else {
    activePlayer = 0;
  }
};

// Reset game
function resetGame() {
  // Remove 'Winner!' and set player names
  var playerNames = document.getElementsByClassName('player-name');
  var i;
  for (i = 0; i < playerNames.length; i++) {
      playerNames[i].textContent = 'Player ' + [i+1];
  }

  // Set new score (if there is one)
  finalScore = document.querySelector('#maxScore').value;

  // Reset scores
  scores = [0, 0];
  document.querySelector('#score-0').textContent = scores[0]
  document.querySelector('#score-1').textContent = scores[1]

  // Reset roundScore
  roundScore = 0;
  document.querySelector('#current-' + activePlayer).textContent = roundScore;

  // Default player
  activePlayer = 0;
  var firstPlayer = document.getElementById('player-0-panel');
  firstPlayer.classList.add("active");
  var secondPlayer = document.getElementById('player-1-panel');
  secondPlayer.classList.remove("active");

  hideDice();
};

// Check if there is a winner to reset game on any button click
function checkWinner() {
  if (winner == true) {
    resetGame();
    winner = false;
  }
}

// New Game Btn
document.querySelector('.btn-new').addEventListener('click', resetGame);

// Roll Btn
document.querySelector('.btn-roll').addEventListener('click', function() {
  checkWinner();

  // Roll a 6 sided die
  function diceRoll() {
    return Math.floor(Math.random() * 6) + 1;
  };

  var die1Roll = diceRoll();
  var die2Roll = diceRoll();
  // Total die sum
  var totalRoll = die1Roll + die2Roll;

  // Change dice picture to show amount rolled
  die1DOM.src = 'img/dice-' + die1Roll + '.png';
  die2DOM.src = 'img/dice-' + die2Roll + '.png';

  // Check if one of the dice is a 1
  if (die1Roll === 1 || die2Roll === 1) {
    // Lose all roundScore and change player turn
    hideDice();
    roundScore = 0;
    document.querySelector('#current-' + activePlayer).textContent = roundScore;
    switchPlayer();
  } else {
    // Add roll sum to current round score
    roundScore = roundScore + totalRoll;

    document.querySelector('#current-' + activePlayer).textContent = roundScore;

    // Show all dice images
    var i;
    for (i = 0; i < diceDOM.length; i++) {
      diceDOM[i].style.display = 'block';
    }
  };
});

// Hold Btn
document.querySelector('.btn-hold').addEventListener('click', function() {
  checkWinner();
  // Add and set round score and total player score
  scores[activePlayer] = roundScore + scores[activePlayer];
  document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer]

  // Check if winner after point sum
  if (scores[activePlayer] >= finalScore) {
    // Set winner var to true, so next time a button is clicked, game is reseted
    winner = true;

    // Announce player won
    document.querySelector('#name-' + activePlayer).innerHTML = "<span style='color: #EB4D4D; font-weight: bold;'>WINNER!</span>";
  } else {
    // Erase and set round score (because it adds up)
    roundScore = 0;
    document.querySelector('#current-' + activePlayer).textContent = roundScore;

    // Next players turn
    switchPlayer();
  }

  hideDice();
});




































