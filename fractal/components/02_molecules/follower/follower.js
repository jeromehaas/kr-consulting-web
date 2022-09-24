class Follower {

    constructor() {
        this.name = 'follower';
        this.elements = {
            follower: document.querySelector('.follower'),
            icon: document.querySelector('.follower__icon'),
        }
    };

    init = () => {
        if (!document.querySelector(`.js-${this.name}`)) return;
        this.showFollower();
    };

    showFollower = () => {
        setTimeout(() => {  
            this.elements.follower.classList.remove('follower--hidden');
        }, 5000);
    };

};

export default Follower;
