import dayjs from "dayjs";
import weekday from 'dayjs/plugin/weekday';
import weekOfYear from 'dayjs/plugin/weekOfYear';
dayjs.extend(weekday);
dayjs.extend(weekOfYear);

class InputDate {

    constructor() {
        this.name = 'input-date';
        this.today = dayjs();
        this.choosenDates = [];
        this.selected = {
            month: null,
            year: null,
            daysInMonth: null, 
            dates: null,
            firstDayOfMonthWeekday: null,
        };
        this.labels = {
            month: ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'],
			weekdays: ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag', 'Sonntag'],
        };
        this.elements = {
            body: document.querySelector('.body'),
            calendar: document.querySelector('.calendar'),
			dates: {
				container: document.querySelector('.calendar__dates'),
				items: null,
			},
			header: {
				close: document.querySelector('.calendar__header .header__close'),
				month: document.querySelector('.calendar__header .date__month'), 
				year: document.querySelector('.calendar__header .date__year'), 
				arrows: {
					previous: document.querySelector('.calendar__header .arrow--previous'),
					next: document.querySelector('.calendar__header .arrow--next'),
				},
			},
			input: {
				handle: document.querySelector('.input-date__input'),
				input: document.querySelector('.input-date__input'),
			}
        }
    };

    init = () => {
        if (!document.querySelector(`.${this.name}`)) return;
        this.updateCurrentMonth();
		this.addEventListeners();
    };

    updateCurrentMonth = (direction) => {
		switch (direction) {
			case 'next': {
				const updatedDate = dayjs(`${this.selected.year}-${this.selected.month}-01`).add(1, 'month');
				this.selected.month = dayjs(updatedDate).format("M");
				this.selected.year = dayjs(updatedDate).format("YYYY");
				this.printCalendar();
				break;
			}
			case 'previous': {
				const updatedDate = dayjs(`${this.selected.year}-${this.selected.month}-01`).subtract(1, 'month');
				this.selected.month = dayjs(updatedDate).format("M");
				this.selected.year = dayjs(updatedDate).format("YYYY");
				this.printCalendar();
				break;
			}
			default: {
				this.selected.month = dayjs().format("M");
				this.selected.year = dayjs().format("YYYY");
				this.printCalendar();
			}
		};
	};

    printCalendar = () => {
		this.selected.amountOfDaysInMonth = this.getAmountOfDaysOfSelectedMonth();
		this.selected.firstDayOfMonthWeekday = this.getFirstDayOfSelectedMonthWeekday();
		this.calculateDatesOfSelectedMonth();
		this.printDates();
		this.printHeader();
	};	

	addEventListeners = () => {
		this.elements.header.arrows.previous.addEventListener('click', () => this.updateCurrentMonth('previous'));
		this.elements.header.arrows.next.addEventListener('click', () => this.updateCurrentMonth('next'));
		this.elements.input.handle.addEventListener('click', this.toggleCalendar);
		this.elements.header.close.addEventListener('click', this.closeCalendar);
	};

	chooseDate = () => {
		const element = event.target;
		const date = event.target.getAttribute('data-date');
		element.classList.contains('dates__item--choosen') ? element.classList.remove('dates__item--choosen') : element.classList.add('dates__item--choosen');
		this.choosenDates.includes(date) ? this.choosenDates = this.choosenDates.filter((item) =>  item !== date) : this.choosenDates.push(date);
		this.updateInput();
	};

	updateInput = () => {
		this.elements.input.input.value = "";
		this.choosenDates.forEach((item) => this.elements.input.input.value += `${item} / `)
	}

	toggleCalendar = () => {
		this.elements.calendar.classList.contains('calendar--active') ? this.elements.calendar.classList.remove('calendar--active') : this.elements.calendar.classList.add('calendar--active');
	};

	closeCalendar = () => {
		 this.elements.calendar.classList.remove('calendar--active');
	};

	getFirstDayOfSelectedMonthWeekday = () => {
		return dayjs(`${this.selected.year}-${this.selected.month}-01`).weekday();
	}

	getAmountOfDaysOfSelectedMonth = () => {
		return dayjs(`${this.selected.year}-${this.selected.month}-01`).daysInMonth();
	};
	
	calculateDatesOfSelectedMonth = () => {
		this.selected.dates = [];
		for (let index = 1; index < this.selected.firstDayOfMonthWeekday; index++) { 
			this.selected.dates.push({ date: null, index: null }) 
		};
        if (this.selected.firstDayOfMonthWeekday === 0) {
            for (let index = 1; index < 7; index++) { 
                this.selected.dates.push({ date: null, index: null }) 
            };
        }
		for (let index = 1; index < this.selected.amountOfDaysInMonth + 1; index++) { 
            const date = dayjs(`${this.selected.year}-${this.selected.month}-${index}`).format('YYYY-MM-DD');
            const weekday = dayjs(`${this.selected.year}-${this.selected.month}-${index}`).weekday();
			this.selected.dates.push({ date: date, dayOfMonth: index, weekday: weekday }
		)};
		for (let index = this.selected.dates.length; index < 35; index++) { 
			this.selected.dates.push({ date: null, index: null }) 
		};
	};

	printDates = () => {
		this.elements.dates.container.innerHTML = '';
		this.selected.dates.map((item) => {
			const dateItem = document.createElement('p');
			const today = dayjs().format("YYYY-MM-DD");
			const daysBetweenTodayAndDate = dayjs().diff(item.date, 'day');
			dateItem.classList.add('dates__item');
				if (item.date === today) { dateItem.classList.add('dates__item--today')};
				if (daysBetweenTodayAndDate > 0) { dateItem.classList.add('dates__item--past')};
				if (daysBetweenTodayAndDate > 0) { dateItem.classList.add('dates__item--past')};
				if (item.weekday === 6 || item.weekday === 0) { dateItem.classList.add('dates__item--past')}
				if (item.dayOfMonth === null) dateItem.classList.add('dates__item--empty');
				if (item.date !== null) dateItem.innerText = item.dayOfMonth;
				if (item.date !== null) dateItem.setAttribute('data-date', item.date);
				if (item.date !== null && daysBetweenTodayAndDate <= 0 && item.weekday !== 6 && item.weekday !== 0) dateItem.addEventListener('click', this.chooseDate);
				if (this.choosenDates.includes(item.date)) dateItem.classList.add('dates__item--choosen');
			this.elements.dates.container.appendChild(dateItem);
			});
		};

		printHeader = () => {
			this.elements.header.month.innerHTML = this.labels.month[this.selected.month - 1];
			this.elements.header.year.innerHTML = this.selected.year;
		};

};

export default InputDate;