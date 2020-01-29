import _ from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { push } from 'react-router-redux';
import { renderRoutes } from 'react-router-config';
import { provideHooks } from 'redial';
// import { IndexLinkContainer, LinkContainer } from 'react-router-bootstrap';
// import Navbar from 'react-bootstrap/lib/Navbar';
// import Nav from 'react-bootstrap/lib/Nav';
// import NavItem from 'react-bootstrap/lib/NavItem';
import { Alert } from 'react-bootstrap';
import Helmet from 'react-helmet';
import qs from 'qs';
import { isLoaded as isInfoLoaded, load as loadInfo } from 'redux/modules/info';
import { isLoaded as isAuthLoaded, load as loadAuth, logout as logoutAction } from 'redux/modules/auth';
import { Notifs } from 'components';
import config from 'config';
import NavBar from 'components/NavBar/NavBar';

@provideHooks({
  fetch: async ({ store: { dispatch, getState } }) => {
    if (!isAuthLoaded(getState())) {
      await dispatch(loadAuth()).catch(() => null);
    }
    if (!isInfoLoaded(getState())) {
      await dispatch(loadInfo()).catch(() => null);
    }
  }
})
@connect(
  state => ({
    notifs: state.notifs
  }),
  { logout: logoutAction, pushState: push }
)
@withRouter
class App extends Component {
  static propTypes = {
    route: PropTypes.objectOf(PropTypes.any).isRequired,
    location: PropTypes.objectOf(PropTypes.any).isRequired,
    notifs: PropTypes.shape({
      global: PropTypes.array
    }).isRequired,
    logout: PropTypes.func.isRequired,
    pushState: PropTypes.func.isRequired
  };

  static contextTypes = {
    store: PropTypes.objectOf(PropTypes.any).isRequired
  };

  static defaultProps = {
    // user: null
  };

  state = {
    // user: this.props.user, // eslint-disable-line react/destructuring-assignment
    prevProps: this.props // eslint-disable-line react/no-unused-state
  };

  componentDidMount() {
    this.setTheme();
  }

  componentDidUpdate(prevProps) {
    const { location } = this.props;

    if (location !== prevProps.location) {
      window.scrollTo(0, 0);
      this.setTheme();
    }
  }

  static getDerivedStateFromProps(props, state) {
    const { prevProps } = state;
    // Compare the incoming prop to previous prop
    const user = !_.isEqual(prevProps.user, props.user) ? props.user : state.user;

    if (!prevProps.user && props.user) {
      const query = qs.parse(props.location.search, { ignoreQueryPrefix: true });
      props.pushState(query.redirect || '/login-success');
    } else if (prevProps.user && !props.user) {
      // logout
      props.pushState('/');
    }

    return {
      user,
      // Store the previous props in state
      prevProps: props
    };
  }

  setTheme() {
    const { location } = this.props;
    if (location.pathname.includes('boards')) {
      if (location.pathname.includes('thread')) {
        document.body.className = 'creamBoardsTheme';
      } else {
        document.body.className = 'boardsTheme';
      }
    } else if (location.pathname.includes('streams')) {
      if (location.pathname.includes('watch')) {
        document.body.className = 'creamStreamsTheme';
      } else {
        document.body.className = 'streamsTheme';
      }
    } else if (location.pathname.includes('works')) {
      if (location.pathname.includes('yaya')) {
        document.body.className = 'creamWorksTheme';
      } else {
        document.body.className = 'worksTheme';
      }
    } else {
      document.body.removeAttribute('class');
    }
  }

  handleLogout = event => {
    const { logout } = this.props;

    event.preventDefault();
    logout();
  };

  render() {
    const { notifs, route } = this.props;
    const styles = require('./App.scss');
    return (
      <div className={styles.appContent}>
        <NavBar />
        <Helmet {...config.app.head} />
        {notifs.global && (
          <Notifs
            className={styles.notifs}
            namespace="global"
            NotifComponent={props => <Alert bsStyle={props.kind}>{props.message}</Alert>}
          />
        )}
        <div className="container">{renderRoutes(route.routes)}</div>
      </div>
    );
  }
}

export default App;
