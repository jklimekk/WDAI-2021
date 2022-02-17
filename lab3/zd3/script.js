
let mylist = document.getElementById("list")

var counter = 0;

document.getElementById("add").onclick = function() { add() };
document.getElementById("remove").onclick = function() { remove() };

function add() {
    
    counter++;

    let el = document.createElement("li");
    el.innerHTML = "Element " + counter;
    mylist.appendChild(el);
}


function remove() {

    if(counter > 0) {
        mylist.removeChild(mylist.childNodes[1]);
        counter--;
    }
}