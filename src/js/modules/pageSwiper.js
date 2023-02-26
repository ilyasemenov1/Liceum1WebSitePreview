import Swiper, { Navigation, Pagination, Autoplay } from 'swiper';
import '../../../node_modules/swiper/swiper.min.css';
    
Swiper.use([Navigation, Pagination, Autoplay]);

var mainSwiper = new Swiper(".mainSwiper", {
    slidesPerView: 1,
    navigation: {
        nextEl: '.right',
        prevEl: '.left'
    },
    spaceBetween: 10,
    pagination: {
        clickable: true,
        el: ".swiper-pagination",
        dynamicBullets: true
    },
    autoplay: {
        delay: 4000
    }
});

mainSwiper.on("slideChange", () => {
    slidesInit();
});

window.addEventListener("load", () => {
    slidesInit();
});

const slidesInit = () => {
    let swiperPagimationAdaptivity = new SwiperPagimationAdaptivity(mainSwiper.activeIndex);
    swiperPagimationAdaptivity.crearClasses();
    swiperPagimationAdaptivity.initClasses();
}

class SwiperPagimationAdaptivity {
    constructor(slideNum) {
        this.slides = document.querySelectorAll(".mainSwiper_wrapper>div");
        this.container = document.querySelector(".mainSwiper_pagination");
        this.slideNum = slideNum;
    }

    initClasses() {
        if (this.slideNum == 0) {this.container.classList.add("first")}
        if (this.slideNum == 1) {this.container.classList.add("second")}
        if (this.slideNum == this.slides.length - 2) {this.container.classList.add("pre-last")}
        if (this.slideNum == this.slides.length - 1) {this.container.classList.add("last")}
        if (this.slides.length < 5) {this.container.classList.add(`length-${this.slides.length}`)}
    }

    crearClasses() {
        this.container.classList.remove("first", "second", "pre-last", "last");
    }
}