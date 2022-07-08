import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

class Services {

	constructor() {
		this.name = 'services';
		this.links = document.querySelectorAll('.sub-navigation__item');
	};
	
	init = () => {
		if (!document.querySelector(`.js-${this.name}`)) return false;
		this.setupScrollTrigger()
	};

	setupScrollTrigger = () => {
		const links = gsap.utils.toArray(this.links);
		links.forEach((link) => {
			if (link.hash) {
				link.addEventListener('click', (event) => this.scrollToSection(event, link.hash));
			};
		});
	};

	scrollToSection = (event, hash) => {
		event.preventDefault();
		gsap.to( window, { scrollTo: hash, duration: 1.3, ease: 'Power4.easeInOut' });
	};

};

export default Services;