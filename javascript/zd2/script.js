
const src = ["resources/gory.jpg", "resources/morze.jpg"];
const border = ["8px solid red", "8px solid blue"]
const size = 2;

var counter = 0;

document.getElementById("btn").onclick = function() { change() };

function change(){

    let photo = document.getElementById("photo")

    counter++;

    photo.setAttribute("src", src[counter % size]);
    photo.setAttribute("style", "border: " + border[counter % size]);
}