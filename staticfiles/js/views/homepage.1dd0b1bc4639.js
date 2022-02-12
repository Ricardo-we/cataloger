// const sliderButtons = document.getElementsByClassName('slider-btn');
const allSlides = document.getElementsByClassName('slide');
const allSlidesContainer = document.getElementById('all-slides-container');
let slideDistance = allSlides[0].clientWidth + parseFloat(getComputedStyle(allSlides[0]).marginLeft) + parseFloat(getComputedStyle(allSlides[0]).marginRight);
console.log(slideDistance)
let actualSlide = 0;

function moveSlides(){
    const actualSlideRef = actualSlide;
    if(actualSlide != actualSlideRef) return;
    if(actualSlide > 0) allSlidesContainer.style.transform ='translateX(' + -(slideDistance * actualSlide) + 'px)';
    else allSlidesContainer.style.transform = 'translateX(' + -slideDistance + 'px)';
    if(actualSlide > allSlides.length - 1){
        actualSlide = 0;
        allSlidesContainer.style.transform ='translateX(0px)'
    }

    actualSlide += 1
}

function openCardDetails(elementId, buttonId){
    const wraper = document.getElementById(elementId);
    wraper.classList.toggle('open-details');
    // wraper.classList.toggle('close-details');
    const button = document.getElementById(buttonId);
    button.classList.toggle('button-open');
}

document.addEventListener('DOMContentLoaded', () => {
    window.onresize = () => {
        slideDistance = allSlides[0].clientWidth + parseFloat(getComputedStyle(allSlides[0]).marginLeft) + parseFloat(getComputedStyle(allSlides[0]).marginRight);
    }

    
    setInterval(() => {
        moveSlides()
    }, 5000)
})

// function moveOneSlide(){
//     if(actualSlide <= 0 || actualSlide > allSlides.length - 1 || actualSlide == 0){
//         allSlidesContainer.style.transform = `translateX(0px)`
//         actualSlide = 0;
//     }

//     if(actualSlide > 0) allSlidesContainer.style.transform = `translateX(${-(slideDistance * actualSlide)}px)`;
//     else allSlidesContainer.style.transform = 'translateX(' + -slideDistance + 'px)';
// }

// const prevButton = sliderButtons[0];    
// const nextButton = sliderButtons[1];    

// prevButton.addEventListener('click', () => {
//     if(actualSlide > 0) actualSlide -= 1
//     console.log(actualSlide)
//     moveOneSlide()
// })

// nextButton.addEventListener('click', () => {
//     if(actualSlide < allSlides.length) actualSlide += 1
//     moveOneSlide()
// })