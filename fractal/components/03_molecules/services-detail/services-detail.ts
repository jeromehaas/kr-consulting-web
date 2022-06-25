import { gsap } from 'gsap';
import Swiper, { Autoplay, EffectFade, Navigation, Pagination, Zoom } from 'swiper';

class ReferenceDetail {
	name: string;
	elements: any;
	slider: any;

	constructor() {
		this.name = 'reference-detail';
		this.slider = null;
		this.elements = {
			slider: document.querySelector('.reference-detail__showcase')
		};
	}

	init = () => {
		if (!document.querySelector(`.js-${this.name}`)) return;
		this.createSlider();
		this.showNextSlide();
	};

	showNextSlide = () => {
		this.slider.on('click', () => { this.slider.slideNext(); });
	};

	createSlider = () => {
		this.slider = new Swiper('.reference-detail__showcase .swiper', {
			modules: [ Autoplay, EffectFade, Navigation, Pagination ],
			speed: 600,
			freeMode: false,
			loop: true,
			spaceBetween: 0,
			effect: 'fade',
			navigation: {
				nextEl: '.reference-detail__showcase .controls__angle--next',
				prevEl: '.reference-detail__showcase .controls__angle--previous ',
			},
			pagination: {
				el: '.reference-detail__showcase .controls__pagination',
			},
		});
	};

}

export default ReferenceDetail;