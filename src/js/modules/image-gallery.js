
const lightbox = new PhotoSwipeLightbox({
    gallery: '#my-gallery',
    children: 'a',
    pswpModule: () => import('photoswipe')
});
lightbox.init();