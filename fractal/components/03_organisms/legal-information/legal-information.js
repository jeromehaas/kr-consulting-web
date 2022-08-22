import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

class LegalInformation {

	constructor() {
		this.name = 'legal-information';
		this.elements = {
			links: document.querySelectorAll('.legal-information .sub-navigation__item'),
			articles: document.querySelectorAll('.legal-information .container__article'),
		}
	}
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
		gsap.to(window, { scrollTo: hash, duration: 1.3, ease: 'Power4.easeInOut' });
	};

		setupLinkObserver = () => {
		const articles = gsap.utils.toArray(this.elements.articles);
		const links = gsap.utils.toArray(this.elements.links);

		articles.forEach((article, i) =>  {
			ScrollTrigger.create({
				trigger: article, 
				start: "top 160px",
				end: "top 160px",
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

export default LegalInformation;