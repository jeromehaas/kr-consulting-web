import cookies from 'js-cookie';

class LoginForm {

  constructor() {
    this.name = "login-form";
    this.dial = {
      input: '',
    },
    this.elements = {
      dial: document.querySelector('.login-form__form .dial' ),
      dialButtons: document.querySelectorAll('.login-form .dial__button'),
      dots: document.querySelector('.login-form .dots'),
      dotsItems: document.querySelectorAll('.login-form__form .dots__item')
    };
  };

  init = () => {
    if ( !document.querySelector(`.js-${this.name}`) ) return;
    this.addEventListener();
  };

  addEventListener = () => {
    this.elements.dialButtons.forEach((item) => {
      item.addEventListener('click', (event) => { 
        const value = event.target.getAttribute('data-value');
        this.updateInput(value); 
        this.updateDots();
      });
    });
  };

  updateInput = (value) => {
    this.dial.input += value;
    if (this.dial.input.length === 6) this.checkInput();
  };

  updateDots = () => {
    const progress = this.dial.input.length - 1;
    const test = this.elements.dotsItems[progress];
    test.classList.add('dots__item--active');
  }

  checkInput = () => {
    const code = process.env.DEVELOPMENT_LOGIN_CODE;
    if ( this.dial.input === code ) {
      this.showSuccess();
      this.startSession();
      this.redirect();
    } else {
      this.showError();
    };
    this.resetInput();
  };

  resetInput = () => {
    setTimeout(() => {
      this.dial.input = '';
      this.elements.dotsItems.forEach((item) => item.classList.remove('dots__item--active'));
      this.elements.dots.classList.remove('form__dots--error');
      this.elements.dots.classList.remove('form__dots--success');
    }, 2000);
  };

  startSession = () => {
    const code = process.env.DEVELOPMENT_LOGIN_CODE;
    cookies.set('session', code);
  };

  showError = () => {
    this.elements.dots.classList.add('form__dots--error');
  };
 
  showSuccess = () => {
    this.elements.dots.classList.add('form__dots--success');
  };

  redirect = () => {
    setTimeout(() => {
      window.location.href = "/";
    }, 1000);
  };

};

export default LoginForm;