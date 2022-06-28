import { gsap } from 'gsap';
import { Swiper, Navigation, Autoplay } from 'swiper';

class ServicesSlider {

	constructor() {
		this.name = 'services-slider';
		this.elements = {
			slider: {
				items: document.querySelectorAll('.services-slider .slider__item') 
			}, 
			background: {
				image: document.querySelectorAll('.services-slider .background__image')
			}
		},
		this.slider = {
			element: null,
			configs: {
				modules: [Navigation, Autoplay],
				speed: 400,
				loop: true,
				slidesPerView: 3,
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
					delay: 8000
				}

			}
		};
	};

	init = () => {
		this.createCarousel();
		this.changeBackgroundImage();
	};

	createCarousel = () => {
		this.slider.element = new Swiper('.services-slider', this.slider.configs);
	};

	changeBackgroundImage = () => {
		const items = gsap.utils.toArray(this.elements.slider.items);
		const images = gsap.utils.toArray(this.elements.background.image);
		items.forEach((item) =>  {
			item.addEventListener('pointerenter', () => {
				images.forEach((image) => {
					gsap.to(image, { opacity: 0 });
				});
				const itemKey = item.getAttribute('data-key');
				console.log(itemKey);
				const imageTarget = images.find((image) => {
					if (image.getAttribute('data-key') === itemKey) return image;
				});
				console.log(imageTarget);
				gsap.to(imageTarget, { opacity: 0.3 });
				// this.elements.background.image.src = imageUrl;
			});
		});

	};

	setItemEventListener = () => {
		// const items = gsap.utils.toArray(this.elements.slider.items);
		// items.forEach((item) =>  {
		// 	item.addEventListener('pointerenter', () => {
		// 		this.showItemDetail(item);
		// 	});
		// 	item.addEventListener('pointerleave', () => {
		// 		this.hideItemDetail();
		// 	})
		// });
	};

	showItemDetail = (item) => {
		// console.log('show item:', item);
		// const heading = item.querySelector('.item__heading');
		// const text = item.querySelector('.item__text');
		// const square = item.querySelector('.item__square');
		// const timeline = gsap.timeline();
		// timeline.to(heading, { y: -32 } );
		// timeline.to(text, { y: -32, opacity: 1 }, '-=0' );
		// timeline.to(square, { x: 16 }, '-=0' );
	};

	hideItemDetail = () => {
		// const items = gsap.utils.toArray(this.elements.slider.items);
		// const timeline = gsap.timeline();
		// items.forEach((item) => {
		// 	const heading = item.querySelector('.item__heading');
		// 	const text = item.querySelector('.item__text');
		// 	const square = item.querySelector('.item__square');
		// 		timeline.to(square, { x: -16 }, '-=0' );
		// 		timeline.to(text, { y: +32, opacity: 0 }, '-=0' );
		// 		timeline.to(heading, { y: +32 } );
		// 	})
	}

};

export default ServicesSlider;