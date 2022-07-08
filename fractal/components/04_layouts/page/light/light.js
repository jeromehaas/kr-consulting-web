import { gsap } from 'gsap';

class Page {

	constructor() {
		this.name = 'page';
		this.elements = {
			body: document.querySelector('.page'),
			transitionLayer: document.querySelector('.page__transition-layer')
		};
	}

	init = () => {
		if (!document.querySelector(`.js-${this.name}`)) return;
		this.removeTransitionLayer();
	};

	removeTransitionLayer = () => {
		const timeline = gsap.timeline();
		timeline.to(this.elements.transitionLayer, { opacity: 0, duration: 0.6, delay: 0.2, ease: 'circ.easeOut' });
		timeline.set(this.elements.transitionLayer, { display: 'none' });
	};


};

export default Page;