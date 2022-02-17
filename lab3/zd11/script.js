
let wrapper = document.getElementById("wrapper");
let yourNick = document.getElementById("yourNick");
let yourResultBox = document.getElementById("yourResultBox");
let playAgainBtn = document.getElementById("playAgainBtn");

playAgainBtn.addEventListener('click', playAgain);

var scoreValue = document.querySelector('.score');
var gameArea = document.querySelector('.gameArea');

var interval;
var score = 0;
var fails = 0;
var nick = "";

playAgain();

function playAgain(event) {
    
    wrapper.style.visibility = "hidden";
    yourNick.style.visibility = "hidden";
    yourResultBox.style.visibility = "hidden";
    playAgainBtn.style.visibility = "hidden";

    score = 0;
    fails = 0;
    
    scoreValue.innerText = score;
    
    while(nick == "") {
        nick = prompt("Podaj swój nick: ")
    }
    
    startGame();
    event.stopPropagation();
}
   
function startGame() {
    gameArea.addEventListener('click', onClickFunction);
    interval = setInterval(generate, 400);
}

function generate() {

    var zombie = document.createElement('div');
    zombie.classList.add('zombie');
    
    // wielkośc zombie
    var height = 0.8 + Math.random();
    zombie.style.transform = "scale(" + height + ")";

    // liczba trafień potrzebna do zabicia zombie
    zombie.live = 1;

    // pozycja zombie
    var position = Math.floor(-50 + Math.random() * 100);
    zombie.style.bottom = position + 'px';
    zombie.style.zIndex = 150 - position;

    // predkosc poruszania
    var maximumSpeed = 20;
    var minimumSpeed = 10;
    var speed = Math.floor(Math.random() * (maximumSpeed - minimumSpeed + 1) + minimumSpeed);
    var duration = "0.5s," + speed + "s";
    zombie.style.animationDuration = duration;

    gameArea.appendChild(zombie);

    zombie.addEventListener('animationend', function(e) {
        if(e.animationName === "walking") {
            fails += 1;
            this.remove();

            if(fails >= 3) {
                endGame(e);
            }
        }

        scoreValue.innerText = score;

    })
}

function onClickFunction(event) {
    if (event.target.classList.contains ('zombie')) {

        event.target.live--;

        if(event.target.live <= 0 ) {
            score += 12;
            event.target.remove();
        }

        scoreValue.innerText = score;

    } else {
        score -= 6;
        scoreValue.innerText = score;
    }
}

async function endGame() {
    
    clearInterval(interval);
    gameArea.removeEventListener('click', onClickFunction);

    let zombies = document.getElementsByClassName("zombie");
    for (let zombie of zombies) {
        zombie.style.display = "none";
    }

    showHighscores();
}


function showHighscores(){

    wrapper.style.visibility = "visible";
    yourNick.style.visibility = "visible";
    yourResultBox.style.visibility = "visible";
    playAgainBtn.style.visibility = "visible";

    yourNick.textContent = "Game over";
    yourResultBox.textContent = "Twój wynik " + nick + " to: " + score;
}
