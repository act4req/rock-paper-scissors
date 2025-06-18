 // Global variables to keep track of scores
        let humanScore = 0;
        let computerScore = 0;
        const WINNING_SCORE = 5; // First to 5 points wins the game

        // Get references to DOM elements
        const scoreDisplay = document.getElementById('scoreDisplay');
        const resultsDisplay = document.getElementById('resultsDisplay');
        const winnerDisplay = document.getElementById('winnerDisplay');
        const rockBtn = document.getElementById('rockBtn');
        const paperBtn = document.getElementById('paperBtn');
        const scissorsBtn = document.getElementById('scissorsBtn');
        const resetButton = document.getElementById('resetBtn');

        /**
         * Generates a random choice for the computer (rock, paper, or scissors).
         * @returns {string} The computer's choice.
         */
        function getComputerChoice() {
            const randomNumber = Math.floor(Math.random() * 3);
            if (randomNumber === 0) {
                return "rock";
            } else if (randomNumber === 1) {
                return "paper";
            } else {
                return "scissors";
            }
        }

        /**
         * Plays a single round of Rock-Paper-Scissors.
         * Updates scores and displays results in the DOM.
         * Checks for a game winner after each round.
         * @param {string} humanChoice The human player's choice (rock, paper, or scissors).
         */
        function playRound(humanChoice) {
            // If a winner has already been declared, prevent further play until reset
            if (humanScore >= WINNING_SCORE || computerScore >= WINNING_SCORE) {
                return;
            }

            const computerChoice = getComputerChoice();
            const normalizedHumanChoice = humanChoice.toLowerCase();

            // Capitalize first letter for display purposes
            const humanDisplay = normalizedHumanChoice.charAt(0).toUpperCase() + normalizedHumanChoice.slice(1);
            const computerDisplay = computerChoice.charAt(0).toUpperCase() + computerChoice.slice(1);

            let roundResultText = "";

            if (normalizedHumanChoice === computerChoice) {
                roundResultText = `It's a tie! Both chose ${humanDisplay}.`;
            } else if (
                (normalizedHumanChoice === "rock" && computerChoice === "scissors") ||
                (normalizedHumanChoice === "paper" && computerChoice === "rock") ||
                (normalizedHumanChoice === "scissors" && computerChoice === "paper")
            ) {
                humanScore++;
                roundResultText = `You win! ${humanDisplay} beats ${computerDisplay}.`;
            } else {
                computerScore++;
                roundResultText = `You lose! ${computerDisplay} beats ${humanDisplay}.`;
            }

            // Update the results display
            resultsDisplay.textContent = roundResultText;
            // Update the score display
            scoreDisplay.textContent = `Human: ${humanScore} | Computer: ${computerScore}`;

            // Check if a player has reached the winning score
            checkForWinner();
        }

        /**
         * Checks if either player has reached the winning score.
         * If a winner is found, updates the winner display, disables choice buttons,
         * and shows the reset button.
         */
        function checkForWinner() {
            if (humanScore >= WINNING_SCORE) {
                winnerDisplay.textContent = `Congratulations! You win the game ${humanScore} to ${computerScore}!`;
                disableChoiceButtons();
                resetButton.classList.remove('hidden');
            } else if (computerScore >= WINNING_SCORE) {
                winnerDisplay.textContent = `Sorry! The Computer wins the game ${humanScore} to ${computerScore}.`;
                disableChoiceButtons();
                resetButton.classList.remove('hidden');
            }
        }

        /**
         * Disables the Rock, Paper, and Scissors choice buttons.
         */
        function disableChoiceButtons() {
            rockBtn.disabled = true;
            paperBtn.disabled = true;
            scissorsBtn.disabled = true;
        }

        /**
         * Enables the Rock, Paper, and Scissors choice buttons.
         */
        function enableChoiceButtons() {
            rockBtn.disabled = false;
            paperBtn.disabled = false;
            scissorsBtn.disabled = false;
        }

        /**
         * Resets the game state (scores, displays, and button states).
         */
        function resetGame() {
            humanScore = 0;
            computerScore = 0;
            scoreDisplay.textContent = `Human: ${humanScore} | Computer: ${computerScore}`;
            resultsDisplay.textContent = "Make your choice to start!";
            winnerDisplay.textContent = ""; // Clear winner message
            resetButton.classList.add('hidden'); // Hide reset button
            enableChoiceButtons(); // Re-enable choice buttons
        }

        // Add event listeners to the choice buttons
        rockBtn.addEventListener('click', () => playRound('rock'));
        paperBtn.addEventListener('click', () => playRound('paper'));
        scissorsBtn.addEventListener('click', () => playRound('scissors'));

        // Add event listener to the reset button
        resetButton.addEventListener('click', resetGame);

        // Initial setup on page load
        // No need for a separate playGame function to start the loop,
        // as clicks will drive the game.
        // We ensure buttons are enabled initially and reset button is hidden.
        window.onload = function() {
            enableChoiceButtons();
            resetButton.classList.add('hidden');
            scoreDisplay.textContent = `Human: ${humanScore} | Computer: ${computerScore}`;
            resultsDisplay.textContent = "Make your choice to start!";
        };