
let leftButton = document.getElementById("left");
let rightButton = document.getElementById("right");
let randomButton = document.getElementById("random");
let slides = document.getElementsByClassName("mySlides");

leftButton.addEventListener('click', function() { changeSlide(-1) });
rightButton.addEventListener('click', function() { changeSlide(1) });
randomButton.addEventListener('click', randomSlide);


var currentSlide = 1;

showSlide(currentSlide);

function changeSlide(n) {
  showSlide(currentSlide += n);
}

function randomSlide() {
    var index = Math.floor(Math.random() * 4) + 1;

    while(index == currentSlide) {
        index = Math.floor(Math.random() * 4) + 1;
    }
    
    // alert(index);
    currentSlide = index;
    showSlide(currentSlide);
}

function showSlide(n) {
    var i;

    if (n > slides.length) {
        currentSlide = 1;

    } else if (n < 1) {
        currentSlide = slides.length;
    }

    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }

    slides[currentSlide - 1].style.display = "block";
}