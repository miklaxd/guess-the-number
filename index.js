const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);

function ask(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

// Function to generate a random number for the computer to guess
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to play the game
async function playGame() {
  console.log("Please think of a number between 1 and 100 (inclusive).");
  console.log("I will try to guess it!\n");

  let lowRange = 1;
  let highRange = 100;

  let computerGuess;
  let userResponse;

  do {
    computerGuess = getRandomNumber(lowRange, highRange);

    userResponse = await ask(`Is it ${computerGuess}? (Y/N) `);

    if (userResponse.toUpperCase() === 'Y') {
      console.log(`Your number was ${computerGuess}!`);
      break;
    } else if (userResponse.toUpperCase() === 'N') {
      let higherOrLower = await ask("Is it higher (H), or lower (L)? ");
      if (higherOrLower.toUpperCase() === 'H') {
        lowRange = computerGuess + 1;
        // Cheat detector
        if (computerGuess + 1 > highRange) {
          console.log(`You said it was lower than ${computerGuess}, so it can't also be higher than ${highRange}!`);
          continue;
        }
      } else if (higherOrLower.toUpperCase() === 'L') {
        highRange = computerGuess - 1;
        // Cheat detector
        if (computerGuess - 1 < lowRange) {
          console.log(`You said it was higher than ${computerGuess}, so it can't also be lower than ${lowRange}!`);
          continue;
        }
      } else {
        console.log("Invalid input. Please enter 'H' or 'L'.");
      }
    } else {
      console.log("Invalid input. Please enter 'Y' or 'N'.");
    }
  } while (true);

  rl.close();
}

// Start the game
playGame();
