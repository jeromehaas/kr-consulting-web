import emailjs from '@emailjs/browser';

class ContactForm {

	constructor() {
		this.name = 'contact-form';
		this.elements = {
			form: document.querySelector('.contact-form'),
			submitButton: document.querySelector('.contact-form__input-submit'),
			statusMessage: {
				success: document.querySelector('.status-message--success'),
				error: document.querySelector('.status-message--error'),
			}
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
			message: {
				name: 'message',
				element: document.querySelector('.contact-form__input-textarea--message textarea'),
				isRequired: true,
				validationSchema: '^.{2,500}$',
			}
		};
	};


	init = () => {
		if (!document.querySelector(`.js-${this.name}`)) return;
		console.log(this.inputs);
		this.elements.submitButton.addEventListener('click', (event) => {
			event.preventDefault();
			this.validateInputs();
			this.send();
		});
	};

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
			const res = await emailjs.send('yellowreach','lautissimi',{
				name: this.inputs.name.element.value,
				email: this.inputs.email.element.value,
				phone: this.inputs.phone.element.value,
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
		this.elements.statusMessage.error.classList.remove('status-message--active');
		this.elements.statusMessage.success.classList.add('status-message--active');
	};

	showErrorMessage = () => {
		this.elements.statusMessage.success.classList.remove('status-message--active');
		this.elements.statusMessage.error.classList.add('status-message--active');
	};

	resetForm = () => {
		this.elements.form.reset();
	};

};

export default ContactForm;