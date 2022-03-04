
document.getElementById("btn").onclick = function() { promptName() };

function promptName() {
    let name = window.prompt("Podaj swoje imie:")
    let nameSpace = document.getElementById("name")
    nameSpace.innerHTML = name;
}