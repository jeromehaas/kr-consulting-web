import { gsap } from 'gsap';
import Swiper, { Autoplay, EffectFade  } from 'swiper';

class Hero {
	name: string;
	elements: any;
	slider: any;

	constructor() {
		this.name = 'hero';
		this.slider = null;
		this.elements = {
			scroller: document.querySelector('.panel__scroller'),
		};
	}

	init = () => {
		if (!document.querySelector(`.js-${this.name}`)) return;
		this.createSlider();
		this.animateScroller();
		this.addEventListener();
		this.showNextSlide();
	};

	addEventListener = () => {
		this.elements.scroller.addEventListener('click', this.setupScroller);
		this.slider.on('click', this.showNextSlide);
	};

	createSlider = () => {
		this.slider = new Swiper('.hero .showcase__swiper', {
			modules: [ Autoplay, EffectFade ],
			speed: 1500,
			freeMode: false,
			loop: true,
			spaceBetween: 30,
			effect: 'fade',
			autoplay: {
				delay: 15000,
				disableOnInteraction: false,
			}
		});
	};

	animateScroller = () => {
		gsap.fromTo(this.elements.scroller, 
			{ y: 0 },
			{ y: 16, repeat: -1, yoyo: true, repeatDelay: 0.3, duration: 0.6, ease: 'power4.easeInOut' }
		);
	};


	setupScroller = () => {
		gsap.to(window, { scrollTo: '.intro', ease: 'power2.easeInOut', duration: 1 });
	};

	showNextSlide = () => {
		this.slider.slideNext();
	};

}

export default Hero;