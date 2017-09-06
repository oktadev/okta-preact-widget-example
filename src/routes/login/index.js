import { h, Component } from 'preact';
import Redirect from '../../lib/Redirect';
import OktaSignInWidget from '../../lib/OktaSignInWidget';
import { withAuth } from '../../lib/auth';

export default withAuth(class Login extends Component {
  state = {
    redirectToReferrer: false
  };

  componentWillMount() {
    this.onSuccess = this.onSuccess.bind(this);
    this.onError = this.onError.bind(this);
  }

  onSuccess(tokens) {
    this.props.auth.handleAuthentication(tokens);
    this.setState({
      redirectToReferrer: true
    });
  }

  onError(err) {
    console.log('error logging in', err);
  }

  render({location, auth}, {redirectToReferrer}) {
    let from;
    if (location && location.state) {
      from = location.state;
    } else {
      from = { pathname: '/' };
    }

    if (auth.isAuthenticated() || redirectToReferrer) {
      return <Redirect to={from} />;
    }

    return (
      <OktaSignInWidget
        widget={auth.widget}
        onSuccess={this.onSuccess}
        onError={this.onError} />
    );
  }
});