const CHOICES = ["rock", "scissors", "paper"];


let humanScore = 0;
let computerScore = 0;
const WIN_SCORE = 5;

//FUNCTIONS
const displayScore = () => {
    scoreboard.innerText = `Human Score: ${humanScore}
    Computer score: ${computerScore}`;
}

const displayResult = (result) => display.innerText = result;

const getComputerChoice = () => Math.floor(Math.random() * (CHOICES.length - 1));

const resetGame = () =>{
    humanScore = 0;
    computerScore = 0;
}

const checkGameOver = () => computerScore >= WIN_SCORE || humanScore >= WIN_SCORE;

const displayGameOver = () =>{
    let result = (computerScore == humanScore)? "Game ended in a tie!" : `Winner is : ${(computerScore > humanScore)? "COMPUTER" : "HUMAN"}!`;
    displayResult(result);
}

const playRound = (choiceID) =>{
    if(!choiceID) return;
    let humanChoice = CHOICES.indexOf(choiceID);
    let computerChoice = getComputerChoice();

    let availableChoices = CHOICES.length;

    // find relative distance between the player choice and human choice
    let result = (computerChoice - humanChoice + availableChoices) % availableChoices;
    // Only half the positions forward of the current choice are vulnerable. Others are not.
    let attackingRange = Math.floor(availableChoices / 2);
    
    if(result === 0) // the distance is zero => tie
    {
        computerScore += 0.5;
        humanScore += 0.5;
        displayResult(`Tie! Both played ${CHOICES[humanChoice]}`);
    }
    else if(result <= attackingRange) // distance to computer choice is within the attacking range of the human choice
    {
        humanScore++;
        displayResult(`You win! ${CHOICES[humanChoice]} beats ${CHOICES[computerChoice]}`)
    }
    else{
        computerScore++;
        displayResult(`You loose! ${CHOICES[computerChoice]} beats ${CHOICES[humanChoice]}`)
    }

    displayScore();

    if(checkGameOver())
    {
        displayGameOver();
        resetGame();
    }
}

// DOM

const gameUI = document.querySelector('#game-ui');
const display = document.querySelector("#display");
const scoreboard = document.querySelector("#scoreboard");

displayScore();

gameUI.addEventListener('click', (event) => playRound(event.target.id));