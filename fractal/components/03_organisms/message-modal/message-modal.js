import emailjs from '@emailjs/browser';

class MessageModal {

	constructor() {
		this.name = 'message-modal';
		this.elements = {
			modal: document.querySelector('.message-modal'),
			form: document.querySelector('.contact-form'),
			submitButton: document.querySelector('.contact-form__input-submit'),
			statusMessage: {
				success: document.querySelector('.status-message__item--success'),
				error: document.querySelector('.status-message__item--error'),
			}, 
			triggers: document.querySelectorAll('[data-trigger="message-modal"]'),
			closeIcon: document.querySelector('.message-modal__close-icon'),
			navigation: {
				bar: document.querySelector('.mobile-navigation .bar'),
			},
		};
		this.errors = [];
		this.inputs = {
			firstname: {
				name: 'firstname',
				element: document.querySelector('.contact-form__input-text--firstname input'),
				isRequired: true,
				validationSchema: '^.{2,50}$',
			},
			lastname: {
				name: 'lastname',
				element: document.querySelector('.contact-form__input-text--lastname input'),
				isRequired: true,
				validationSchema: '^.{2,50}$',
			},
			email: {
				name: 'email',
				element: document.querySelector('.contact-form__input-text--email input'),
				isRequired: true,
				validationSchema: '[a-z0-9]+@[a-z]+.[a-z]{2,3}',
			},
			phone: {
				name: 'phone',
				element: document.querySelector('.contact-form__input-text--phone input'),
				isRequired: false,
				validationSchema: '',
			},
			date: {
				name: 'date',
				element: document.querySelector('.contact-form__input-date--date input'),
				isRequired: false,
				validationSchema: '',
			},
			course: {
				name: 'course',
				element: document.querySelector('.contact-form__input-checkbox--course input'),
				isRequired: false,
				validationSchema: '',
			},
			message: {
				name: 'message',
				element: document.querySelector('.contact-form__input-textarea--message textarea'),
				isRequired: true,
				validationSchema: '.{2,1000}$',
			}
		};
	};


	init = () => {
		if (!document.querySelector(`.js-${this.name}`)) return;
		this.addEventListeners();
	};
	
	addEventListeners = () => {
		this.elements.submitButton.addEventListener('click', (event) => {
			event.preventDefault();
			this.validateInputs();
			this.send();
		});
		this.elements.triggers.forEach((item) => {
			item.addEventListener('click', (event) => {
				event.preventDefault();
				this.showModal();
			});
		});		
		this.elements.closeIcon.addEventListener('click', () => {
			this.hideModal();
		});
	};

	showModal = () => {
		this.elements.modal.classList.add('message-modal--visible');
		this.elements.navigation.bar.classList.add('mobile-navigation__bar--hidden');
	};

	hideModal = () => {
		this.elements.modal.classList.remove('message-modal--visible');
	}

	validateInputs = () => {
		this.errors = [];
		for (const input in this.inputs) {
			const name = this.inputs[input].name;
			const element = this.inputs[input].element;
			const value = this.inputs[input].element.value;
			const validationSchema = this.inputs[input].validationSchema;
			const regex = new RegExp(validationSchema);
			const res = regex.test(value);
			if (res === false && this.inputs[input].isRequired) {
				this.errors.push(name);
				this.addErrorStyle(element);
			} else {
				this.removeErrorStyle(element);
			}
		};
	};

	addErrorStyle = (element) => {
		switch(element.tagName) {
		case 'INPUT': {
			element.classList.add('input-text__input--error');
			break;
		};
		case 'TEXTAREA': {
			element.classList.add('input-textarea__input--error');
			break;
		};
		};
	};

	removeErrorStyle = (element) => {
		switch(element.tagName) {
		case 'INPUT': {
			element.classList.remove('input-text__input--error');
			break;
		};
		case 'TEXTAREA': {
			element.classList.remove('input-textarea__input--error');
			break;
		};
		};
	};

	send = async () => {
		if (this.errors.length === 0) {
			const res = await emailjs.send('krconsulting','krconsulting',{
				firstname: this.inputs.firstname.element.value,
				lastname: this.inputs.lastname.element.value,
				email: this.inputs.email.element.value,
				phone: this.inputs.phone.element.value,
				date: this.inputs.date.element.value,
				course: this.inputs.course.element.checked ? 'Ja' : 'Nein',
				message: this.inputs.message.element.value,
			}, process.env.EMAILJS_PUBLICKEY);
			if (res.status === 200) {
				this.showSuccessMessage();
				this.resetForm();
			} else {
				this.showErrorMessage();
			};
		};
	};

	showSuccessMessage = () => {
		this.elements.statusMessage.error.classList.remove('status-message__item--active');
		this.elements.statusMessage.success.classList.add('status-message__item--active');
	};

	showErrorMessage = () => {
		this.elements.statusMessage.success.classList.remove('status-message__item--active');
		this.elements.statusMessage.error.classList.add('status-message__item--active');
	};

	resetForm = () => {
		this.elements.form.reset();
	};

};

export default MessageModal;