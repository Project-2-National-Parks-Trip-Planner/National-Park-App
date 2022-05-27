const body = document.body;
const homeImages = document.querySelectorAll('.homeImage');
const leftBtn = document.getElementById('left');
const rightBtn = document.getElementById('right');

let activeImage = 0;


rightBtn.addEventListener('click', () => {
    activeImage++

    if(activeImage > homeImages.length - 1) {
        activeImage = 0
    }

    setBackground();
    setActiveImage();
})

leftBtn.addEventListener('click', () => {
    activeImage--

    if(activeImage < 0) {
        activeImage = homeImages.length - 1
    }

    setBackground();
    setActiveImage();
})


setBackground();

function setBackground() {
    body.style.backgroundImage = homeImages[activeImage].style.backgroundImage;
    console.log(body.style.backgroundImage);
    
}

function setActiveImage() {
    homeImages.forEach((homeImage) => {
        homeImage.classList.remove('active')
    })
    homeImages[activeImage].classList.add('active')
}