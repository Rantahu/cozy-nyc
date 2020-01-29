import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// import config from 'config';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import ProfileButton from 'components/ProfileButton/ProfileButton';
import SVG from 'react-inlinesvg';

@connect(state => ({
  online: state.online
}))
class Home extends Component {
  // static propTypes = {
  //   online: PropTypes.bool.isRequired
  // };

  render() {
    // const { online } = this.props;
    const styles = require('./Home.scss');
    // require the logo image both from client and server
    const fullLogo = require('./full-logo.svg');

    return (
      <div className={`${styles.homeContent} container-fluid`}>
        <Helmet title="home" />

        <div className="row">
          <div className={`${styles.homeFeatured} col-md-8`}>
            <SVG className={styles.logo} src={fullLogo} alt="cube" />
          </div>

          <div id="homeSidebar" className={`${styles.homeSidebar} col-md-4`}>
            <div className={styles.profileButton}>
              <ProfileButton />
            </div>

            <div className={styles.mainLinks}>
              <Link className={styles.navLinkPeach} to="streams">
                streams
              </Link>
              <Link className={styles.navLinkBlue} to="boards">
                boards
              </Link>
              <Link className={styles.navLinkGreen} to="works">
                works
              </Link>
            </div>

            <div className={styles.subLinks}>
              <Link to="about">about</Link>
              <Link to="contribute">contribute</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
