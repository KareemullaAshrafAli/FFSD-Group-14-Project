let searchfrom=document.querySelector('.search-from');
document.querySelector('#search-btn').onclick=()=>{
    searchfrom.classList.toggle('active');
    
    searchcart.classList.remove('active');
    navbar.classList.remove('active');
}





let searchcart=document.querySelector('.container');
document.querySelector('#cart-btn').onclick=()=>{
    searchcart.classList.toggle('active');
    searchfrom.classList.remove('active');
   
    navbar.classList.remove('active');
}




 let navbar=document.querySelector('.navbar');
document.querySelector('#menu-btn').onclick=()=>{
    navbar.classList.toggle('active');
    searchfrom.classList.remove('active');
    searchcart.classList.remove('active');
    
}




window.onscroll=()=>{
    searchfrom.classList.remove('active');
    searchcart.classList.remove('active');
    navbar.classList.remove('active');
}





var timeOut = 100;
var slideIndex = 0;
var autoOn = true;

autoSlides();

function autoSlides() {
    timeOut = timeOut - 20;

    if (autoOn == true && timeOut < 0) {
        showSlides();
    }
    setTimeout(autoSlides, 20);
}






function prevSlide() {

    timeOut = 5000;

    var slides = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("dot");

    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slideIndex--;

    if (slideIndex > slides.length) {
        slideIndex = 1
    }
    if (slideIndex == 0) {
        slideIndex = 4
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}







function showSlides() {

    timeOut = 5000;

    var slides = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("dot");

    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slideIndex++;

    if (slideIndex > slides.length) {
        slideIndex = 1
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}





let mybutton = document.getElementById("myBtn");

window.onscroll = function() {scrollFunction()};
  
function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      mybutton.style.display = "block";
    } else {
      mybutton.style.display = "none";
    }
}


function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}


