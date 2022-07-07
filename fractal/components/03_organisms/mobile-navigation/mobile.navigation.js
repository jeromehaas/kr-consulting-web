import lottieWeb from 'lottie-web';

class MobileNavigation {

	constructor() {
		this.name = 'mobile-navigation';
		this.elements = {
			hamburger: document.querySelector('.mobile-navigation .bar__hamburger'),
			bar: document.querySelector('.mobile-navigation .bar'),
			menu: document.querySelector('.mobile-navigation .mobile-navigation__menu'),
		};
		this.status = {
			isActive: false,
			scrollDirection: 'down',
			scrollPosition: 0
		};
		this.hamburger = {
			element: null,
			container: this.elements.hamburger,
		};
	};
	
	init = () => {
		if (!document.querySelector(`.js-${this.name}`)) return;
		this.setupHamburger();
		this.setupEventListeners();
	};

	setupEventListeners = () => {
		window.addEventListener('scroll', () => {
			this.setNavigationVisibility();
			this.setNavigationOpacity();
		});
	};

	setupHamburger = () => {
		this.hamburger.element = lottieWeb.loadAnimation({
			container: this.elements.hamburger,
			renderer: 'svg',
			loop: false,
			autoplay: false,
			path: '/media/lotties/hamburger.json'
		});
		this.hamburger.element.setSpeed(3);
		this.elements.hamburger.addEventListener('click', () => this.toggleStatus());
	};

	toggleStatus = () => {
		this.status.isActive = !this.status.isActive;
		if (this.status.isActive) {
			this.activateHamburger();
			this.activateMenu();
		} else {
			this.deactivateHamburger();
			this.deactivateMenu();
		}
	};

	deactivateHamburger = () => {
		this.hamburger.element.setDirection(-1);
		this.hamburger.element.play();
	};

	activateHamburger = () => {
		this.hamburger.element.setDirection(1);
		this.hamburger.element.play();
	};

	activateMenu = () => {
		this.elements.menu.classList.add('mobile-navigation__menu--active');
	};

	deactivateMenu = () => {
		this.elements.menu.classList.remove('mobile-navigation__menu--active');
	}

	setNavigationVisibility = () => {
		if (window.pageYOffset > 60 && this.status.isActive === false && window.pageYOffset > this.status.scrollPosition ) {
			this.elements.bar.classList.add('mobile-navigation__bar--hidden');
		} else {
			this.elements.bar.classList.remove('mobile-navigation__bar--hidden');
		}
		this.status.scrollPosition = window.pageYOffset;
	};

	setNavigationOpacity = () => {
		console.log(window.pageYOffset);
		if (window.pageYOffset < 120 && this.status.isActive === false) {
			setTimeout(() => {
				this.elements.bar.classList.add('mobile-navigation__bar--transparent');
			}, 600);
		} else {
			this.elements.bar.classList.remove('mobile-navigation__bar--transparent');
		}
	};

};

export default MobileNavigation;