function getComputerChoice() {
    let randomNumber = Math.floor(Math.random() * 3);
    if (randomNumber === 0) {
        return "rock";   
    } else if (randomNumber === 1) {
        return "paper";
    } else {
        return "scissors";
    }
}
function getHumanChoice() {
    let humanChoice = prompt("Enter rock, paper, or scissors:").toLowerCase();
    if (humanChoice !== "rock" && humanChoice !== "paper" && humanChoice !== "scissors") {
        alert("Invalid choice! Please enter rock, paper, or scissors.");
        return getHumanChoice();
    }
    return humanChoice;
}
function playGame() {
    let HumanScore = 0;
    let ComputerScore = 0;

   function playRound(humanChoice, computerChoice) {
    let normalizedHumanChoice = humanChoice.toLowerCase();
    let HumanDisplay = normalizedHumanChoice.charAt(0).toUpperCase() + normalizedHumanChoice.slice(1);
    let ComputerDisplay = computerChoice.charAt(0).toUpperCase() + computerChoice.slice(1);
   
    if (normalizedHumanChoice === computerChoice) {
        alert(`It's a tie! Both chose ${HumanDisplay}.`);
        return "tie";
    } if (
        (normalizedHumanChoice === "rock" && computerChoice === "scissors") ||
        (normalizedHumanChoice === "paper" && computerChoice === "rock") ||
        (normalizedHumanChoice === "scissors" && computerChoice === "paper")
    ) {
        HumanScore++;
        alert(`You win! ${HumanDisplay} beats ${ComputerDisplay}.`);
        return "human";
    } else {
        ComputerScore++;
        alert(`You lose! ${ComputerDisplay} beats ${HumanDisplay}.`);
        return "computer";
    }
}
    playRound(getHumanChoice(), getComputerChoice());
    playRound(getHumanChoice(), getComputerChoice());
    playRound(getHumanChoice(), getComputerChoice());
    playRound(getHumanChoice(), getComputerChoice());
    playRound(getHumanChoice(), getComputerChoice());

    console.log(`Final Score: You ${HumanScore} - Computer ${ComputerScore}`);
    if (HumanScore > ComputerScore) {
        alert(`Congratulations! You win the game with a score of ${HumanScore} to ${ComputerScore}.`);
    } else if (ComputerScore > HumanScore) {
        alert(`Sorry! You lose the game with a score of ${HumanScore} to ${ComputerScore}.`);
    } else {
        alert(`It's a tie! Both scored ${HumanScore}.`);
    }
}

playGame();