export interface elementsInterface {
	form: HTMLFormElement;
	submitButton: HTMLInputElement
	statusMessage: {
		success: HTMLParagraphElement;
		error: HTMLParagraphElement;
	};
};

export interface inputsInterface {
	[key: string]: inputElement;
	name: inputElement;
	email: inputElement;
	phone: inputElement;
	message: inputElement;
};

export interface inputElement {
	name: string;
	element: HTMLInputElement; 
	isRequired: boolean;
	validationSchema: string;
};