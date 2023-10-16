//---------- Navbar ----------//

window.addEventListener('scroll', function(){
    let navbar = document.getElementById("navbar");
    navbar.classList.toggle('fixed', this.window.scrollY > 0)
})



// Review Carousel
$('.owl-carousel').owlCarousel({
    loop:true,
    margin:10,
    responsive:{
        0:{
            items:1
        },
        600:{
            items:1
        },
        1200:{
            items:2
        }
    }
})




// Access And store the testimonial cards
let reviewCards = document.querySelectorAll('.reviewCardsWrapper .reviewCard');
// Access and store the next and prev buttons
let next = document.querySelector('.reviewBtns .next');
let prev = document.querySelector('.reviewBtns .prev');
// Access and store the cards indicators
let dots = document.querySelectorAll('.reviewCardsIndicators .dot');

var counter = 0;

// Code for the next button
next.addEventListener('click', slideNext);
function slideNext(){
	reviewCards[counter].style.animation = 'next1 0.4s ease-in forwards';
	if(counter >= reviewCards.length - 1){
		counter = 0;
	}
	else{
		counter ++;
	}
	reviewCards[counter].style.animation = 'next2 0.4s ease-in forwards';
	indicators();
}

// Code for the prev button
prev.addEventListener('click', slidePrev);
function slidePrev(){
	reviewCards[counter].style.animation = 'prev1 0.4s ease-in forwards';
	if(counter == 0){
		counter = reviewCards.length - 1;
	}
	else{
		counter --;
	}
	reviewCards[counter].style.animation = 'prev2 0.4s ease-in forwards';
	indicators();
}

// Auto Sliding 
function autoSliding(){
	deleteInterval = setInterval(timer, 3000);
	function timer(){
		slideNext();
		indicators();
	}
}
autoSliding();

// Add and remove active class from the indicators
function indicators(){
	for(let i = 0; i < dots.length; i++){
		dots[i].className = dots[i].className.replace(' active', '');
	}
	dots[counter].className += ' active';
}

// Stop auto sliding when mouse is over the buttons
const indicatorsBox = document.querySelector('.reviewCardsIndicators');
indicatorsBox.addEventListener('mouseover', stopAutoSliding);
next.addEventListener('mouseover', stopAutoSliding);
prev.addEventListener('mouseover', stopAutoSliding);

function stopAutoSliding(){
	clearInterval(deleteInterval);
}

// Resume auto sliding when mouse is out
indicatorsBox.addEventListener('mouseout', autoSliding);
next.addEventListener('mouseout', autoSliding);
prev.addEventListener('mouseout', autoSliding);

// Add click event to the indicators
for(let i = 0; i < dots.length; i++){
	dots[i].addEventListener('click', switchCard);
}
function switchCard(){
	this.classList.add('active');
	var dataNumber = this.getAttribute('data-number');
	if(dataNumber > counter){
		reviewCards[counter].style.animation = 'next1 0.4s ease-in forwards';
		counter = dataNumber;
		reviewCards[counter].style.animation = 'next2 0.4s ease-in forwards';
	}
	else if(dataNumber == counter){
		return;
	}
	else{
		reviewCards[counter].style.animation = 'prev1 0.4s ease-in forwards';
		counter = dataNumber;
		reviewCards[counter].style.animation = 'prev2 0.4s ease-in forwards';
	}
	indicators();
}