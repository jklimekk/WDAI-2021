
let adding_button = document.getElementById("increment")
let switching_button = document.getElementById("switch")
let document_count = document.getElementById("count");

switching_button.onclick = function() { change_btn_state() };
adding_button.addEventListener('click', add);

let disabled = false;
let click_counter = 0;

function change_btn_state() {

    if(disabled) {
        adding_button.addEventListener('click', add);

        adding_button.setAttribute("style", "background-color: rgb(0, 200, 0)");
        switching_button.innerHTML = "wyłącz przycisk";
        
        disabled = false;

    } else {
        adding_button.removeEventListener('click', add);
        adding_button.setAttribute("style", "background-color: lightgray");
        switching_button.innerHTML = "włącz przycisk";

        click_counter = 0;
        document_count.innerHTML = click_counter;
        
        disabled = true;
    }

}

function add() {
    click_counter++;
    document_count.innerHTML = click_counter;
}
