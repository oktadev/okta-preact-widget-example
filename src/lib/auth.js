import {h} from 'preact';
import { route } from 'preact-router';
import OktaSignIn from '@okta/okta-signin-widget/dist/js/okta-sign-in.min.js';
import '@okta/okta-signin-widget/dist/css/okta-sign-in.min.css';
import '@okta/okta-signin-widget/dist/css/okta-theme.css';

class Auth {
  constructor() {
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);

    this.widget = new OktaSignIn({
      baseUrl: 'https://dev-846291.oktapreview.com/',
      clientId: '0oabxj5fe6tpEAxam0h7',
      redirectUri: 'http://localhost:8080',
      authParams: {
        responseType: ['id_token', 'token'],
        scopes: ['openid', 'email', 'profile']
      }
    });
  }

  isAuthenticated() {
    // Checks if there is a current accessToken in the TokenManger.
    return !!this.widget.tokenManager.get('accessToken');
  }

  getCurrentUser(){
    return this.widget.tokenManager.get('idToken');
  }

  login() {
    // Redirect to the login page
    route('/login/');
  }

  async logout() {
    this.widget.tokenManager.clear();
    await this.widget.signOut();
    location = '/';
  }

  handleAuthentication(tokens) {
    for (let token of tokens) {
      if (token.idToken) {
        this.widget.tokenManager.add('idToken', token);
      } else if (token.accessToken) {
        this.widget.tokenManager.add('accessToken', token);
      }
    }
  }
}

// create a singleton
const auth = new Auth();
export const withAuth = WrappedComponent => props =>
  <WrappedComponent auth={auth} {...props} />;