
// pliki sa udostepniane na roznych portach:

// Categories.json:
//   http://localhost:3000/Kategorie

// ProductsA.json:
//   http://localhost:3001/produktyA

// ProductsB.json:
//   http://localhost:3002/produktyB

// Komendy:
// json-server categories.json
// json-server -p 3001 productsA.json
// json-server -p 3002 productsB.json


let menuList = document.getElementById("menuList");
let mainList = document.getElementById("mainList");

init();

async function init() {
    let categories = await fetch("http://localhost:3000/Kategorie").then(x => x.json());
    let productsA = await fetch("http://localhost:3001/produktyA").then(x => x.json());
    let productsB = await fetch("http://localhost:3002/produktyB").then(x => x.json());

    addCategories(categories);
    addProducts(productsA);
    addProducts(productsB);
}


function addCategories(categories) {
    for (category of categories) {
        addSingleCategory(category);
    }
    
    correctCategoriesList(categories);
}

function addSingleCategory(category) {

    addToMenuList(menuList, category, "showCategoryProducts(id)");

    let arrowDiv = document.createElement("div");
    arrowDiv.setAttribute("id", "btn" + category);
    arrowDiv.setAttribute("class", "not-collapsed");
    arrowDiv.setAttribute("onclick", "showInnerList(id)");
    arrowDiv.setAttribute("style", "display: inline-block");
    arrowDiv.innerHTML= `<img class="img" src="arrow.png">`;

    document.getElementById("li" + category).prepend(arrowDiv);
    
    let list = document.createElement("ul");
    list.setAttribute("id", "ul" + category, 1);

    document.getElementById("li" + category).append(list);
}


function addProducts(products) {
    for (obj of products) {
        let category = Object.keys(obj)[0];
        let elements = obj[category];

        for(el of elements) {
            addSingleProduct(category, el.nazwa);
        }

        if(elements.length > 0) {
            document.getElementById("li" + category).style.display = "block";
        }
    }
}

function addSingleProduct(category, product) {

    let categoryElement = document.getElementById("ul" + category);
    let productElement = document.getElementById("li" + product);

    if (productElement == null || productElement.parentElement != categoryElement) {

        addToMenuList(categoryElement, product, "showProductInMainArea(id)");
        
        let listElement = document.createElement("li");
        listElement.setAttribute("id", "p" + product);
        listElement.innerHTML = product;
        listElement.style.display = "none";
        mainList.appendChild(listElement);
    }
}


function addToMenuList(list, elementToAdd, elementFunction) {

    let checkBox = document.createElement("input");
    checkBox.setAttribute("type", "checkbox");
    checkBox.setAttribute("name", elementToAdd);
    checkBox.setAttribute("id", elementToAdd);
    checkBox.setAttribute("onclick", elementFunction);

    let checkBoxLabel = document.createElement("label");
    checkBoxLabel.setAttribute("for", elementToAdd);
    checkBoxLabel.innerHTML = elementToAdd;

    let listElement = document.createElement("li");
    listElement.setAttribute("id", "li" + elementToAdd);
    listElement.appendChild(checkBox);
    listElement.appendChild(checkBoxLabel);

    list.appendChild(listElement);
}

function correctCategoriesList(categories) {
    for (category of categories) {
        document.getElementById("li" + category).style.display = "none";
    }
}


function showInnerList(id) {
    let element = document.getElementById(id);

    if (element.className == "not-collapsed") {
        element.className = "collapsed";
        document.getElementById("ul" + id.substr(3, id.length - 3)).style.display = "none";
        element.innerHTML= `<img class="img-collapsed" src="arrow.png">`;
        
    } else {
        element.className = "not-collapsed";
        document.getElementById("ul" + id.substr(3, id.length - 3)).style.display = "block";
        element.innerHTML= `<img class="img" src="arrow.png">`;
    }
}

function showCategoryProducts(id) {
    let productList = document.getElementById("ul" + id).childNodes;

    for (let i = 0; i < productList.length; i++) {

        if (document.getElementById(id).checked) {
            productList[i].childNodes[0].checked = true;
        } else {
            productList[i].childNodes[0].checked = false;
        }

        showProductInMainArea(productList[i].childNodes[0].id);
    }
}

function showProductInMainArea(id) {
    let element = document.getElementById(id);

    let category = document.getElementById(id).parentElement.parentElement.id;
    category = category.substr(2, category.length - 2);

    var count = countProductsInCategory(category);

    if (element.checked) {

        document.getElementById("p" + id).style.display = "block";

        if(count > 0 && count < document.getElementById("ul" + category).childNodes.length) {
            document.getElementById("li" + category).childNodes[1].indeterminate = true;

        } else {
            document.getElementById("li" + category).childNodes[1].indeterminate = false;
            document.getElementById("li" + category).childNodes[1].checked = true;
        }

    } else {
        
        document.getElementById("p" + id).style.display = "none";

        if(count == 0) {
            document.getElementById("li" + category).childNodes[1].indeterminate = false;
            document.getElementById("li" + category).childNodes[1].checked = false;
            showCategoryProducts(id);

        } else {
            document.getElementById("li" + category).childNodes[1].indeterminate = true;
        }
    }
}

function countProductsInCategory(category) {
    let productsList = document.getElementById("ul" + category).childNodes;
    var counter = 0;

    for (let i = 0; i < productsList.length; i++) {

        if (productsList[i].childNodes[0].checked == true) {
            counter += 1;
        }
    }

    return counter;
}
