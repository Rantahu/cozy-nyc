import React, { Component } from 'react';
// import { Link, browserHistory } from 'react-router-dom';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as profileActions from 'redux/modules/profile';

@connect(
  state => ({ profile: state.profile.active }),
  { ...profileActions }
)
class Profile extends Component {
  static propTypes = {
    profile: PropTypes.shape({
      username: PropTypes.string
      // profileImg: PropTypes.string
    }),
    match: PropTypes.shape({
      params: PropTypes.shape({
        username: PropTypes.string.isRequired
      })
    }),
    getProfile: PropTypes.func.isRequired
  };

  static defaultProps = {
    profile: null,
    match: null
  };

  componentDidMount() {
    const { getProfile, match } = this.props;
    getProfile(match.params.username);
  }

  componentDidUpdate(prevProps) {
    const { getProfile, match, profile } = this.props;
    if ((profile && !(match.params.username === profile.username)) || !prevProps.profile) {
      getProfile(match.params.username);
    }
  }

  render() {
    const { profile } = this.props;
    const styles = require('./Profile.scss');
    return (
      <div className={styles.profileWrapper}>
        {profile && (
          <div className={styles.profileHeader}>
            <Helmet title={profile.username} />
            <img className={styles.profileAvatar} src={profile.profileImg} alt={profile.username} />
            <span className={styles.profileInfo}>
              <h1>{`@${profile.username}`}</h1>
              <p>[Bio Here]</p>
            </span>
          </div>
        )}
        {!profile && (
          <div className={styles.profileHeader}>
            <Helmet title="noot" />
            <h1>NOOT</h1>
          </div>
        )}
      </div>
    );
  }
}

export default Profile;
