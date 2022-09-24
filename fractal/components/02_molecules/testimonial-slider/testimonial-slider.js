import { Swiper, Navigation, Autoplay, Pagination } from 'swiper';

class TestimonialSlider {

    constructor() {
        this.name = 'testimonial-slider';
        this.elements = {
            arrows: {
                up: document.querySelector('.testimonial-slider .arrow--up'),
                down: document.querySelector('.testimonial-slider .arrow--down'),
            },
            counters: {
                current: document.querySelector('.testimonial-slider .counter--current'),
                total: document.querySelector('.testimonial-slider .counter--total'),
            },
            items: document.querySelectorAll('.testimonial-slider .slider__item')
        },
        this.slider = {
            element: null,
            configs: {
                modules: [Navigation, Autoplay, Pagination],
                speed: 400,
                loop: false,
                slidesPerView: 1,
                spaceBetween: 320,
                autoplay: {
					delay: 6000,
					pauseOnMouseEnter: true,
                    stopOnLastSlide: true,
				},
        		navigation: {
					nextEl: '.testimonial-slider .arrow--next',
					prevEl: '.testimonial-slider .arrow--previous',
                    disabledClass: 'arrow--disabled'
				},
            },
        };
    };

    init = () => {
		if (!document.querySelector(`.js-${this.name}`)) return;
        this.createCarousel();
        this.setupCounter();
        this.updateCounter();
    };
    
    updateCounter = () => {
        this.slider.element.on('slideChange', () => {
            const index = this.slider.element.activeIndex + 1;
            this.elements.counters.current.innerText = `0${index}`;
        });
    };

    setupCounter = () => {
        const amoutnOfSlides = this.elements.items.length;
        this.elements.counters.total.innerText = `0${amoutnOfSlides}`  
    }


    createCarousel = () => {
        this.slider.element = new Swiper('.testimonial-slider', this.slider.configs);
    };


}

export default TestimonialSlider;