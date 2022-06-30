import cookies from 'js-cookie';

class SessionCheck {

  constructor() {
    this.name = 'session-check';
  };

  init = () => {
    if ( process.env.MODE === 'production') return;
    if ( window.location.href === '/login') return;
    this.validateSession();
  };

  validateSession() {
    const sessionCode = cookies.get('session');
    const code = process.env.DEVELOPMENT_LOGIN_CODE;
    if ( code !== sessionCode ) {
      window.location.href = '/login';
    };
  };

};

export default SessionCheck;