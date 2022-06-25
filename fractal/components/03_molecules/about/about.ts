class About {
	name: string;
	teamMembers: NodeList;
	links: NodeList;
	activeTeamMember: null | string;
	closeButtons: NodeList; 

	constructor() {
		this.name = 'about';
		this.teamMembers = document.querySelectorAll('.team-member');
		this.links = document.querySelectorAll('.about .links__item');
		this.activeTeamMember = null;
		this.closeButtons = document.querySelectorAll('.text-content__close-button');
	};


	init = () => {
		if (!document.querySelector(`.js-${this.name}`)) return;
		this.addEventlistener();
	};

	addEventlistener = () => {
		this.links.forEach((link) => {
			link.addEventListener('click', (event: any) => {
				event.preventDefault();
				const link = event.target.closest('.links__item');
				const name = link.getAttribute('data-name');
				this.activeTeamMember = name;
				this.showTeamMember();
			});
		});
		this.closeButtons.forEach((button) => {
			button.addEventListener('click', (event) => {
				event.preventDefault();
				this.hideTeamMember();
			});
		});
	};

	showTeamMember = () => {
		const target = document.querySelector(`.team-member[data-name="${this.activeTeamMember}"]`);
		target.classList.add('team-member--active');
	};

	hideTeamMember = () => {
		const target = document.querySelector(`.team-member[data-name="${this.activeTeamMember}"]`);
		target.classList.remove('team-member--active');
	};



}

export default About;