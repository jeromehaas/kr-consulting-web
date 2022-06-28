import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

class Intro {
	name: string;
	clipping: any;
	timeline: any;
	elements: any;

	constructor() {
		this.name = 'intro';
		this.elements = {
			container: document.querySelector('.intro__image'),
			image: document.querySelector('.intro__image')
		};
		this.clipping = {
			top: 50,
			right: 0,
			bottom: 0,
			left: 0,
			showFullImage: false
		};
		this.timeline = null; 
	}

	init = () => {
		if (!document.querySelector(`.js-${this.name}`)) return;
		this.createTimeline();
		this.addeventlistener();
	};

	addeventlistener = () => {
		this.elements.image.addEventListener('click', this.showFullImage);
	};

	createTimeline = () => {
		this.timeline = gsap.timeline({
			scrollTrigger: {
				trigger: '.intro',
				markers: false, 
				start: 'top center',
				end: 'bottom center',
				onUpdate: ({ progress }) => {
					this.slide(progress);
				}
			}
		});
	};

	showFullImage = () => {
		this.clipping.showFullImage = true;
		this.elements.image.style.clipPath = 'inset(0% 0% 0% 0%)';
	};

	slide = (progress: number) => {
		if (!this.clipping.showFullImage) {
			// this.elements.image.style.clipPath = `inset(0% ${50 - (progress * 50)}% 0% ${0 + (progress * 50)}% )`;
			this.elements.image.style.clipPath = `inset(0% ${50 - (progress * 50)}% 0% 0% )`;
		};
	};

}

export default Intro;