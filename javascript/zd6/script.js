
document.querySelector('.add-button').addEventListener('click', addNewRecord);
document.querySelector('.button').addEventListener('click', remove);

var phonebook = document.querySelector(".phonebook");

// imię i nazwisko zaczyna się pojedynczą wielką literą, po któej występują tylko małe litery (0 lub więcej)
var name_pattern = /^[A-Z][a-z]*$/;

// numer teleofnu skłąda się z 9 cyfr
var phone_pattern = /^[0-9]{9}$/;


function addNewRecord(event) {

    event.preventDefault();

    var name = document.getElementById("name");
    var phone = document.getElementById("phone");

    if(name.value == "") {
        showAlert("Brak wymaganych danych - uzupełnij pole 'Imie i nazwisko'");

    } else if (phone.value == "") {
        showAlert("Brak wymaganych danych - uzupełnij pole 'Telefon'");

    } else {
        if(correct_data(name.value, phone.value)) {
            insertRecord(name, phone);
        }
    }
}

function showAlert(message) {
    alert(message);
}

function insertRecord(name, phone) {

    var record = document.createElement("div");
    record.classList.add("record")

    record.innerHTML = `
        <div class="content">
            <p class="name">${name.value}</p>
            <p>${phone.value}</p>
        </div>
        <button class="button">
            <i class="fas fa-trash-alt"></i>
        </button>
        `;
    
    const removeBtn = record.querySelector('.button');
    removeBtn.addEventListener('click', remove);

    phonebook.appendChild(record);

    clearForm(name, phone);
}

function clearForm(name, phone) {
    name.value = "";
    phone.value = "";
}


function correct_data(name, phone) {

    if(check_name(name) && check_phone(phone)) {
        return true;

    } else {
        return false;
    }
}

function check_name(name) {

    var words = name.split(" ");

    if(words.length !=  2) {
        showAlert("Błędny format danych - W polu 'Imię i nazwisko' muszą znajdować się 2 słowa (imię i nazwisko) rozdzielone spacją");
        return false;
        
    } else {
        for(var word of words){

            if(word.match(name_pattern)) {
            
            } else {
                showAlert("Błędny format danych - Imię i nazwisko muszą zaczynać się wielką literą i nie mogą zawierać cyfr ani innych specjalnych znaków");
                return false;
            }
        }
    }

    return true;
}

function check_phone(phone) {
        
    if(phone.match(phone_pattern)) {
        return true;

    } else {
        showAlert("Błędny format danych - Numer telefonu musi składać się z 9 cyfr")
        return false;
    }
}

function remove(event) {
    const element = event.currentTarget.parentElement;
    phonebook.removeChild(element);
}
