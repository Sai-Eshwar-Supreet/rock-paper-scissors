const CHOICES = ["ROCK", "SCISSOR", "PAPER"];

const getOptionsString = () =>{
    let options = '';

    for(let i = 0; i< CHOICES.length; i ++){
        options += `\n${i+1}. ${CHOICES[i]}`;
    }

    return options;
}

const getComputerChoice = () => Math.floor(Math.random() * (CHOICES.length - 1));

const getValidIndex = (num) => (num + CHOICES.length) % CHOICES.length;

const getHumanChoice = () =>{

    let choice = prompt(`Choose an option (as number):
        ${getOptionsString()}
    Choice:`, 1);

    choice = parseInt(choice, 10);

    if(isNaN(choice) || choice < 1 || choice > CHOICES.length){
        alert(`Invalid choice! Defaulting to ${CHOICES[0]}`)
        return 0;
    }

    return choice - 1;
};

const playRound = (humanChoice, computerChoice) =>{

    let availableChoices = CHOICES.length;

    // find relative distance between the player choice and human choice
    let result = (computerChoice - humanChoice + availableChoices) % availableChoices;
    // Only half the positions forward of the current choice are vulnerable. Others are not.
    let attackingRange = Math.floor(availableChoices / 2);
    
    if(result === 0) // the distance is zero => tie
    {
        computerScore += 0.5;
        humanScore += 0.5;
        alert(`Tie! Both played ${CHOICES[humanChoice]}`);
    }
    else if(result <= attackingRange) // distance to computer choice is within the attacking range of the human choice
    {
        humanScore++;
        alert(`You win! ${CHOICES[humanChoice]} beats ${CHOICES[computerChoice]}`)
    }
    else{
        computerScore++;
        alert(`You loose! ${CHOICES[computerChoice]} beats ${CHOICES[humanChoice]}`)
    }

    console.log(`
    Human Score: ${humanScore}
    Computer score: ${computerScore}
        `);
}

let humanScore = 0;
let computerScore = 0;
const TOTAL_ROUNDS = 5;

for(let i = 0; i < TOTAL_ROUNDS; i++)
{
    let humanChoice = getHumanChoice();
    let computerChoice = getComputerChoice();
    playRound(humanChoice, computerChoice);
}

if(humanScore > computerScore) alert("Hurray! You win the tournament!");
else if(computerScore > humanScore) alert("Computer has won the tournament!");
else alert("Hmm! You have tied with the computer!");