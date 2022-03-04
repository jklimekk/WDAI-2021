// json-server cities.json

fetch(`http://localhost:3000/cities`)
.then(response => { return response.json() })
.then(data => { showData(data) })

var pattern = /(a|A).*(a|A)/;
var patternP = /^p/;


function showData(json) {
    a(json);
    b(json);
    c(json);
    d(json);
    e(json);
    f(json);
}


function a(json) {
    var a = document.getElementById("a");

    var malopolskaCities = "";

    for(var obj of json){
        if(obj.province == "małopolskie") {
            malopolskaCities += "Name: " + obj.name + " - Province: " + obj.province + `<br>`;
        }
    }

    a.innerHTML  = malopolskaCities; 
}


function b(json) {
    var b = document.getElementById("b");

    var doubleACities = "";

    for(var obj of json){
        if(obj.name.match(pattern)) {
            doubleACities += "Name: " + obj.name + `<br>`;
        }
    }

    b.innerHTML  = doubleACities;
}


function c(json) {
    var c = document.getElementById("c");
    
    var sortedCitiesArray = json.sort((a, b) => a.dentensity < b.dentensity ? 1 : -1)

    var sortedCities = "Name: " + sortedCitiesArray[5].name + " - Dentensity: " + sortedCitiesArray[5].dentensity;

    c.innerHTML = sortedCities;
}


function d(json) {
    var d = document.getElementById("d");
    
    var cities = "";

    for(var obj of json){
        if(obj.people > 100000) {
            cities += "Name: " + obj.name + " City - People: " + obj.people + `<br>`;
        }
    }

    d.innerHTML = cities;
}


function e(json) {
    var e = document.getElementById("e");

    var text = "";
    
    var moreThan = 0;
    var lessThan = 0;

    for(var obj of json){

        if(obj.people > 80000) {
            moreThan = moreThan + 1;

        } else if(obj.people < 80000) {
            lessThan = lessThan + 1;
        }
    }

    text += "Miast powyżej 80tys: " + moreThan + `<br>`;
    text += "Miast poniżej 80tys: " + lessThan + `<br>`;
    text += "Więcej jest ";

    if(moreThan > lessThan) {
        text += "miast powyżej 80tys" + `<br>`;

    } else {
        text += "miast poniżej 80tys" + `<br>`;
    }

    e.innerHTML = text;
}


function f(json) {
    var f = document.getElementById("f");
    
    var sum = 0;
    var count = 0;
    var cities = "";

    for(var obj of json){
        if(obj.township.match(patternP)) {
            // cities += "Name: " + obj.name + " Township: " + obj.township + `<br>`;
            sum += obj.area;
            count += 1;
        }
    }

    // cities += "Area: " + sum + " Count: " + count + `<br>`;

    cities += "Średnia powierzchnia: " + sum/count;

    f.innerHTML = cities;
}
