import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

class Services {

	constructor() {
		this.name = 'services';
		this.elements = {
			links: document.querySelectorAll('.services .sub-navigation__item'),
			articles: document.querySelectorAll('.services .container__article'),
		};

	};
	
	init = () => {
		if (!document.querySelector(`.js-${this.name}`)) return false;
		this.setupScrollTrigger();
		this.setupLinkObserver();
	};

	setupScrollTrigger = () => {
		const links = gsap.utils.toArray(this.elements.links);
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

	setupLinkObserver = () => {
		const articles = gsap.utils.toArray(this.elements.articles);
		const links = gsap.utils.toArray(this.elements.links);

		console.log(articles);
		articles.forEach((article, i) =>  {
			ScrollTrigger.create({
				trigger: article, 
				start: "top 75%",
				end: "top 75%",
				markers: false,
				onEnter: () => {
					this.removeAcvitveLink();
					this.setActiveLink(this.elements.links[i]);
				},
				onEnterBack: () => {
					this.removeAcvitveLink();
					this.setActiveLink(links[i - 1])	
				}
			});
		});
	};

	removeAcvitveLink = () => {
		this.elements.links.forEach((link) => link.classList.remove('sub-navigation__item--active'));
	};

	setActiveLink = (link) => {
		if (link) link.classList.add('sub-navigation__item--active');
	}

};

export default Services;