class DesktopNavigation {

    constructor() {
        this.name = 'desktop-navigation';
        this.elements = {
            links: document.querySelectorAll('.desktop-navigation__link'),
        } 
    };

    init = () => {
        if (!document.querySelector(`.js-${this.name}`)) return;
        this.addEventListeners();
    };

    addEventListeners = () => {
        this.elements.links.forEach((link) => {
            link.addEventListener('mouseenter', (event) => {
                const target = event.target;
                this.fadeLinks();
                this.highlightLink(target);
            });
            link.addEventListener('mouseleave', (event) => {
                const target = event.target;
                this.showLinks();
            });
        });
    };

    fadeLinks = () => {
        this.elements.links.forEach((link) => {
            link.classList.add('desktop-navigation__link--faded');
        });
    };

    showLinks = () => {
        this.elements.links.forEach((link) => {
            link.classList.remove('desktop-navigation__link--faded');
        });
    };

    highlightLink = (target) => {
        target.classList.remove('desktop-navigation__link--faded');
    }


}

export default DesktopNavigation;