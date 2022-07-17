import { gsap } from 'gsap';
import { Swiper, Navigation, Autoplay } from 'swiper';

class ServicesSlider {

	constructor() {
		this.name = 'services-slider';
		this.elements = {
			background: {
				image: document.querySelectorAll('.services-slider .background__image')
			},
			arrows: {
				left: document.querySelector('.services-slider .arrows__icon--left'),
				right: document.querySelector('.services-slider .arrows__icon--right'),
			}
		},
		this.slider = {
			element: null,
			configs: {
				modules: [Navigation, Autoplay],
				speed: 400,
				loop: true,
				slidesPerView: 1,
				spaceBetween: 0,
				navigation: {
					nextEl: '.swiper-button-next',
					prevEl: '.swiper-button-prev'
				},
				scrollbar: {
					el: '.swiper-scrollbar',
					draggable: true,
				},
				autoplay: {
					delay: 6000,
					pauseOnMouseEnter: true,
				},
				breakpoints: {
					350: { slidesPerView: 1, spaceBetween: 0 },
					650: { slidesPerView: 1.5, spaceBetween: 0 },
					950: { slidesPerView: 2.5, spaceBetween: 0 },
					1250: { slidesPerView: 3.5, spaceBetween: 0 },
					1440: { slidesPerView: 4, spaceBetween: 0 },
				},	

			}
		};
	};

	init = () => {
		if (!document.querySelector(`.js-${this.name}`)) return;
		this.createCarousel();
		this.changeBackgroundImage();
		this.updateBackgroundImage();
	};

	createCarousel = () => {
		this.slider.element = new Swiper('.services-slider', this.slider.configs);
	};

	changeBackgroundImage = () => {
		const items = document.querySelectorAll('.services-slider .slider__item');
		const images = document.querySelectorAll('.services-slider .background__image')
		items.forEach((item) =>  {
			item.addEventListener('mouseenter', () => {
				images.forEach((image) => gsap.to(image, { opacity: 0, delay: 0.3 }));
				images.forEach((image) => {
					if (image.getAttribute('data-key') === item.getAttribute('data-key')) {
						gsap.to(image, { opacity: 0.3, delay: 0.3 });
					};
				});
			});
		});
	};

	updateBackgroundImage = () => {
		this.slider.element.on('slideChange', () => {
			const items = document.querySelectorAll('.services-slider .slider__item');
			const images = gsap.utils.toArray(document.querySelectorAll('.services-slider .background__image'));
			const index = this.slider.element.activeIndex;
			const activeItem = items[index];
			const imageKey = activeItem.getAttribute('data-key');
			images.forEach((image) => gsap.to(image, { opacity: 0, delay: 0.15 } ));
			images.forEach((image) => {
				if (image.getAttribute( 'data-key' ) === imageKey) {
					gsap.to(image, { opacity: 0.3, delay: 0.15 });
				};
			} );
		});
	};

};

export default ServicesSlider;