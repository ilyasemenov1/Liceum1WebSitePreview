import Swiper, {Navigation} from 'swiper';
import '../../../node_modules/swiper/swiper.min.css';
    
Swiper.use([Navigation]);

var mainSwiper = new Swiper(".mainSwiper", {
    slidesPerView: 1,
    navigation: {
        nextEl: '.right',
        prevEl: '.left'
    },
    spaceBetween: 10,
    pagination: {
        el: ".swiper-pagination",
        dynamicBullets: true
    },
});