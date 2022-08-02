// getComputerChoice -> function to randomally return a Rock, Paper, or Scissors
// playerSelection -> parameter (case-insensitive)
// computerSelection -> parameter

/*

When player plays
player selects choice (playerSelection)
computer generates random choice (computerSelection)
compare computerSelection and playerSelection
set playerScore / computerScore = 0;

play until score of any === 5
    endScore === 5;
    if (playerScore === endScore) {
        you won it all!
    } 
    if (computerScore === endScore) {
        you lost it all!
    } else {
        keep playing

        return win or lose based off choice
            increase round number (round++)
            if ((playerSelection === rock && computerSelection === paper) 
                || (playerSelection === paper && computerSelection === scissors)
                || (playerSelection === scissors && computerSelection === rock))
                return roundLost; 
            
            else if ((playerSelection === rock && computerSelection === scissors) 
                || (playerSelection === paper && computerSelection === rock)
                || (playerSelection === scissors && computerSelection === paper))
                return "You won this round! ${playerSelection} beats ${computerSelection}!"
            else {
                return `You both chose ${playerSelection}, so it's a draw!`
            }
        add score to specific player
            if (roundLost) {
                console log - "You lost this round! ${computerSelection} beats ${playerSelection}!"
                computerScore++;
            }
            if (roundWon) {
                console log - "You won this round! ${playerSelection} beats ${computerSelection}!"
                plaerScore++;
            }

    }
return overall winner or loser
*/

const options = document.querySelectorAll(".options");
let playerScore = 0;
let computerScore = 0;
let gameRound = 0;
let roundInfo;
let winningMessage;

options.forEach((option) => {
    option.addEventListener("click", function () {
        const playerSelection = this.textContent;
    
        const computerOptions = ["Rock", "Paper", "Scissors"];
        let computerSelection = computerOptions[Math.floor(Math.random() * 3)];
        
        playRound(playerSelection, computerSelection);
        updateScore();
        checkWinner();
    });
});


function playRound(playerSelection, computerSelection) {
    if (playerSelection === computerSelection) {
        roundInfo = `Last round: You both chose ${playerSelection}, so it's a draw!`;
    } else if ((playerSelection === "Rock" && computerSelection === "Paper") 
            || (playerSelection === "Paper" && computerSelection === "Scissors")
            || (playerSelection === "Scissors" && computerSelection === "Rock")) {
        roundInfo = `Last round: Ah! ${computerSelection} beats ${playerSelection}!`;
        computerScore++;
    } else if ((playerSelection === "Rock" && computerSelection === "Scissors") 
            || (playerSelection === "Paper" && computerSelection === "Rock")
            || (playerSelection === "Scissors" && computerSelection === "Paper")) {
        roundInfo = `Last round: Nice! ${playerSelection} beats ${computerSelection}!`;
        playerScore++;
    }
    gameRound++;
}

function updateScore() {
    document.getElementById("playerScore").textContent = playerScore;
    document.getElementById("computerScore").textContent = computerScore;
    document.getElementById("gameRound").textContent = gameRound;
    document.getElementById("roundInfo").textContent = roundInfo;
}

function checkWinner() {
    if (playerScore === 5 || computerScore === 5) {
        const winner = 
            playerScore === 5 
            ? `After ${gameRound} rounds, you won!`
            : `After ${gameRound} rounds, you lost!`;
        document.getElementById("winningMessage").textContent = winner;
        document.getElementById("rockButton").disabled = true; 
        document.getElementById("paperButton").disabled = true; 
        document.getElementById("scissorsButton").disabled = true; 
        return true;
    }
    return false;
}