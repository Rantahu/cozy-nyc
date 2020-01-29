import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import LoginForm from 'components/LoginForm/LoginForm';
import * as authActions from 'redux/modules/auth';
import * as notifActions from 'redux/modules/notifs';

@connect(
  state => ({ user: state.auth.user }),
  { ...notifActions, ...authActions }
)
@withRouter
class Login extends Component {
  static propTypes = {
    user: PropTypes.shape({
      username: PropTypes.string
    }),
    login: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
    notifSend: PropTypes.func.isRequired
    // history: PropTypes.objectOf(PropTypes.any).isRequired
  };

  static defaultProps = {
    user: null
  };

  onLogin = async data => {
    const { login } = this.props;
    try {
      const result = await login(data);
      this.successLogin();
      return result;
    } catch (error) {
      this.errorLogin(error);
    }
  };

  successLogin = () => {
    const { notifSend } = this.props;

    notifSend({
      message: "You're logged in now !",
      kind: 'success',
      dismissAfter: 2000
    });
  };

  errorLogin = error => {
    const { notifSend } = this.props;

    notifSend({
      message: `Login error:\n${error.detail}`,
      kind: 'danger',
      dismissAfter: 2000
    });
  };

  render() {
    const { user, logout } = this.props;

    return (
      <div className="container">
        <Helmet title="Login" />
        <h1>Login</h1>
        {!user && (
          <div>
            <LoginForm onSubmit={this.onLogin} />
            <p>This will "log you in" as this user, storing the username in the session of the API server.</p>
          </div>
        )}
        {user && (
          <div>
            <p>You are currently logged in as {user.username}.</p>

            <div>
              <button type="button" className="btn btn-danger" onClick={logout}>
                <i className="fa fa-sign-out" /> Log Out
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Login;
