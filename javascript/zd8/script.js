
let balloonContainer = document.getElementById("container");
let balloon = document.getElementById("balloon");
let menu = document.getElementById("menu");

var minSize = parseInt(balloonContainer.style.fontSize);
var maxSize = 10 * parseInt(balloonContainer.style.fontSize);

document.onclick = hideContextMenu;
document.addEventListener("keydown", checkKey);
balloon.addEventListener("contextmenu", showContextMenu);

function checkKey(event) {

    if(event.keyCode == '38') {
        pumpUp(event);

    } else if(event.keyCode == '40') {
        pumpDown(event);
    }
};

function pumpUp(event) {
    let size = parseInt(balloonContainer.style.fontSize);

    if(size * 1.1 <= maxSize) {
        var textSize = 1.1 * size + "px";
        balloonContainer.style.fontSize = textSize;

    } else {
        boom(event);
    }
}

function pumpDown(event) {
    let size = parseInt(balloonContainer.style.fontSize);

    if(size * 0.9 >= minSize) {
        var textSize = 0.9 * size + "px";
        balloonContainer.style.fontSize = textSize;
    }
}

function boom(event) {
    let emoji = document.getElementById("balloon");
    emoji.innerHTML = "&#128165";
    document.removeEventListener("keydown", checkKey);
    balloon.removeEventListener("contextmenu", showContextMenu);
}

function showContextMenu(event) {

    if (window.event.ctrlKey) {
        event.preventDefault();
        menu.className = "show";
        menu.style.left = mouseX(event) + 'px';
        menu.style.top = mouseY(event) + 'px';
        menu.innerHTML = "Rozmiar balona: " + balloonContainer.style.fontSize;
    }
}

function hideContextMenu() {
    menu.className = "hide";
}

function mouseX(event) {
    if (event.pageX) {
      return event.pageX;

    } else if (event.clientX) {
      return event.clientX;

    } else {
      return null;
    }
  }
  
  function mouseY(event) {
    if (event.pageY) {
      return event.pageY;

    } else if (event.clientY) {
      return event.clientY;

    } else {
      return null;
    }
  }
