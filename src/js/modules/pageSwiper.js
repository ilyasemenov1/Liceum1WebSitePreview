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
        el: ".swiper-pagination"
    },
    autoplay: {
        delay: 4000
    },
});