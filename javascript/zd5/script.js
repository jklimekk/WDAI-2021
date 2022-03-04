
let result = document.getElementById("result");
let oneButton = document.getElementById("one");
let twoButton = document.getElementById("two");
let fiveButton = document.getElementById("five");
let propagationButton = document.getElementById("propagation");
let resetButton = document.getElementById("reset");
var comments = document.querySelector(".comments");

oneButton.addEventListener('click', addOne);
twoButton.addEventListener('click', addTwo);
fiveButton.addEventListener('click', addFive);
propagationButton.addEventListener('click', switchPropagation);
resetButton.addEventListener('click', reset);


let clickCount = 0;
let propagation = false;


function switchPropagation() {

    if(propagation) {
        propagation = false;
        document.getElementById("propagation").innerHTML = "Start Propagation";

    } else {
        propagation = true;
        document.getElementById("propagation").innerHTML = "Stop Propagation";
    }
}

function reset() {
    clickCount = 0;
    result.innerHTML = clickCount;
    
    twoButton.setAttribute("style", "background: red");
    twoButton.addEventListener('click', addTwo);
    fiveButton.setAttribute("style", "background: yellow");
    fiveButton.addEventListener('click', addFive);
}


function addFive(event) {

    if(clickCount <= 50) {
        clickCount += 5;
        result.innerHTML = clickCount;
        
        showAlert("Nacisnąłeś żółty o wartości 5");

        if(!propagation){
            event.stopPropagation();
        }
        
        checkClickCount();

    } else {
        checkClickCount();
    }
}

function addTwo(event) {

    if(clickCount <= 30) {
        clickCount += 2;
        result.innerHTML = clickCount;
        
        showAlert("Nacisnąłeś czerwony o wartości 2");

        if(!propagation) {
            event.stopPropagation();
        }
        
        checkClickCount();
        
    } else {
        checkClickCount();
    }
}

function addOne(event) {
    clickCount += 1;
    result.innerHTML = clickCount;
    
    showAlert("Nacisnąłeś niebieski o wartości 1");

    checkClickCount();
}

function showAlert(message) {
    alert(message);
}

function checkClickCount() {

    if(clickCount > 30) {
        twoButton.setAttribute("style", "background: gray");
        twoButton.removeEventListener('click', addTwo);
    }

    if(clickCount > 50) {
        fiveButton.setAttribute("style", "background: gray");
        fiveButton.removeEventListener('click', addFive);
    }
}
