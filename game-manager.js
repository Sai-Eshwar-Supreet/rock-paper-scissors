const CHOICES = ["rock", "scissors", "paper"];

const state = {
    human: 0,
    computer: 0,
    winScore: 5
};


//FUNCTIONS
const displayScore = () => {
    scoreboard.innerText = `Human Score: ${state.human}
    Computer score: ${state.computer}`;
}

const displayResult = (result) => display.innerText = result;

const getComputerChoice = () => Math.floor(Math.random() * CHOICES.length);

const resetGame = () =>{
    state.human = 0;
    state.computer = 0;
}

const checkGameOver = () => state.computer >= state.winScore || state.human >= state.winScore;

const displayGameOver = () =>{
    let result = (state.computer == state.human)? "Game ended in a tie!" : `Winner is : ${(state.computer > state.human)? "COMPUTER" : "HUMAN"}!`;
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
        state.computer += 0.5;
        state.human += 0.5;
        displayResult(`Tie! Both played ${CHOICES[humanChoice]}`);
    }
    else if(result <= attackingRange) // distance to computer choice is within the attacking range of the human choice
    {
        state.human++;
        displayResult(`You win! ${CHOICES[humanChoice]} beats ${CHOICES[computerChoice]}`)
    }
    else{
        state.computer++;
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

gameUI.addEventListener('click', (event) => playRound(event.target.dataset.choice));