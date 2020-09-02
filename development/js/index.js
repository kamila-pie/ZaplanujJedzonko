document.addEventListener("DOMContentLoaded", function() {

    class Carousel{
        constructor(root){
            this.root = document.querySelector(root);
            this.slides = document.querySelector(root).firstElementChild;
            this.images = document.querySelector(root).querySelectorAll(".slide");
            this.counter = 1;
            this.init();
        }
        init(){
            const prev = document.getElementById("prev");
            const next = document.getElementById("next");
            let slideWidth = 1000;

            window.addEventListener('resize', ()=> {
                slideWidth = this.images[0].clientWidth;
            });

            this.slides.style.transform = `translateX(${-slideWidth * this.counter}px)`;

            next.addEventListener('click', event => {
                if(this.counter >= 4){
                    return
                }
                this.slides.style.transition = `all .5s ease-in-out`;
                this.counter++;
                this.slides.style.transform = `translateX(${-slideWidth * this.counter}px)`;
            })

            prev.addEventListener('click', event => {
                if(this.counter <= 0){
                    return
                }
                this.slides.style.transition = `all .5s ease-in-out`;
                this.counter--;
                this.slides.style.transform = `translateX(${-slideWidth * this.counter}px)`;
            })

            this.slides.addEventListener('transitionend', ()=> {
                if(this.images[this.counter].classList.contains("clone-first")){
                    this.slides.style.transition = "none";
                    this.counter = 1;
                    this.slides.style.transform = `translateX(${-slideWidth * this.counter}px)`;
                } else if(this.images[this.counter].classList.contains("clone-last")){
                    this.slides.style.transition = "none";
                    this.counter = 3;
                    this.slides.style.transform = `translateX(${-slideWidth * this.counter}px)`;
                }
            })
        }
    }

    const carousel = new Carousel(".carousel-container");

});