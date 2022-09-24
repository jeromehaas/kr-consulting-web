import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

class Counters {

    constructor () {
        this.name = 'counters';
        this.elements = document.querySelectorAll('.counters .item__value');
    };

    init = () => {
		if (!document.querySelector(`.js-${this.name}`)) return;
        this.setupScrollTrigger();
    };

    setupScrollTrigger = () => {
        ScrollTrigger.create({
            trigger: '.stats', 
            start: 'top bottom',
            markers: false, 
            once: true,
            onEnter: this.countUp

        })
    }

    countUp = () => {
        this.elements.forEach((item) => {
            const value = item.getAttribute('data-value');
            gsap.to(item, { innerText: value, duration: value * 0.05, delay: 0.5,  ease: 'Power4.easeOut', snap: 'innerText' })
        });
    }

};

export default Counters;
