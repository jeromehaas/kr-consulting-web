class ContactShortcuts {

    constructor() {
        this.name = 'contact-shortcuts';
        this.elements =  {
            contactShortcuts: document.querySelector('.contact-shortcuts'),
        }
    };

    init = () => {
        if (!document.querySelector(`.js-${this.name}`)) return;
        this.showContactShortcuts();
    };

    showContactShortcuts = () => {
        setTimeout(() => {
            this.elements.contactShortcuts.classList.remove('contact-shortcuts--hidden'); 
        }, 5000);
    };
    
};

export default ContactShortcuts;