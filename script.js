/* jshint esversion: 6 */ 
document.addEventListener('DOMContentLoaded', (event) => { 
    let userScore = 0; 
    let computerScore = 0; 
    
    const userScoreSpan = document.getElementById('userScore'); 
    const computerScoreSpan = document.getElementById('computerScore'); 
    const resultDiv = document.createElement('div'); 
    resultDiv.id = 'result'; 
    document.getElementById('game').appendChild(resultDiv); 
    const buttons = document.querySelectorAll('#game button'); 
    
    // Soundeffects  
    const clickSound = new Audio('click.mp3'); 
    const resultSound = new Audio('result.mp3'); 

    // Hintergrundmusik laden, aber nicht automatisch abspielen 
    const backgroundMusic = new Audio('background-music.mp3'); 
    backgroundMusic.loop = true; 
    // Hintergrundmusik bei der ersten Interaktion abspielen 
    document.body.addEventListener('click', () => { 
        backgroundMusic.play(); }, { once: true });
    
    function playGame(userChoice) { 
        const choices = ['rock', 'paper', 'scissors', 'lizard', 'spock']; 
        const computerChoice = choices[Math.floor(Math.random() * choices.length)]; 
        
        const result = determineWinner(userChoice, computerChoice); updateScore(result); displayResult(userChoice, computerChoice, result); 
    } 
    function determineWinner(userChoice, computerChoice) { 
        if (userChoice === computerChoice) return 'draw'; 
        if ( 
            (userChoice === 'rock' && (computerChoice === 'scissors' || computerChoice === 'lizard')) || 
            (userChoice === 'paper' && (computerChoice === 'rock' || computerChoice === 'spock')) || 
            (userChoice === 'scissors' && (computerChoice === 'paper' || computerChoice === 'lizard')) || 
            (userChoice === 'lizard' && (computerChoice === 'spock' || computerChoice === 'paper')) || 
            (userChoice === 'spock' && (computerChoice === 'scissors' || computerChoice === 'rock')) 
        ) { 
            return 'win'; 
        } else { 
            return 'lose'; 
        } 
    } 
    
    function updateScore(result) { if (result === 'win') { 
        userScore++; 
        userScoreSpan.classList.add('score-flash'); 
        setTimeout(() => userScoreSpan.classList.remove('score-flash'), 500); } 
        else if (result === 'lose') { 
            computerScore++; 
            computerScoreSpan.classList.add('score-flash'); 
            setTimeout(() => computerScoreSpan.classList.remove('score-flash'), 500); 
        } 
        userScoreSpan.textContent = userScore; 
        computerScoreSpan.textContent = computerScore; 
    } 
    function displayResult(userChoice, computerChoice, result) { 
        const resultText = `You chose ${userChoice}, computer chose ${computerChoice}. Result: ${result}!`; 
        resultDiv.textContent = resultText; 
        resultSound.play(); 
    } 
    
    buttons.forEach(button => { 
        button.addEventListener('click', () => {
             clickSound.play(); 
             playGame(button.id); 
            }); 
        }); 
    });


