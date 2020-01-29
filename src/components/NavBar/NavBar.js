import React, { Component } from 'react';
import { Link, NavLink, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import ProfileButton from 'components/ProfileButton/ProfileButton';
import SVG from 'react-inlinesvg';

/*
  NavBar Component

  Navigation bar used for site.

*/
class NavBar extends Component {
  static propTypes = {
    location: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      show: false
    };
  }

  // changes state to toggle showing dropdown links
  showDropdown() {
    const { show } = this.state;
    this.setState({
      show: !show
    });
  }

  hideDropdown() {
    this.setState({
      show: false
    });
  }

  render() {
    const styles = require('./NavBar.scss');
    const { location } = this.props;
    const { show } = this.state;
    const cube = require('./cube.svg');
    const hamburger = require('./hamburger.svg');
    // conditional to add of styling classes on click
    const iconClicked = show ? styles.iconClicked : null;
    const menuBgClicked = show ? styles.navbarDropdownMenu : null;
    // conditional to render of dropdown links
    const dropdown = show ? (
      <div className={styles.links}>
        <div className="main-links">
          <NavLink className={`${styles.mainLink} nav-hover-orange`} to="/streams" onClick={() => this.hideDropdown()}>
            streams
          </NavLink>
          <br />
          <NavLink className={`${styles.mainLink} nav-hover-blue`} to="/boards" onClick={() => this.hideDropdown()}>
            boards
          </NavLink>
          <br />
          <NavLink className={`${styles.mainLink} nav-hover-green`} to="/works" onClick={() => this.hideDropdown()}>
            works
          </NavLink>
          <br />
        </div>
        <br />
        <div className="sub-links">
          <NavLink to="/about" onClick={() => this.hideDropdown()}>
            about
          </NavLink>
          <br />
          <NavLink to="/contribute" onClick={() => this.hideDropdown()}>
            contribute
          </NavLink>
        </div>
        {/* overlay allows user to click anywhere to hide dropdown */}
        <div
          role="button"
          className={styles.overlay}
          onClick={() => this.hideDropdown()}
          onKeyDown={() => this.hideDropdown()}
          tabIndex={0}
        />
      </div>
    ) : null;

    // const color = location.pathname;
    if (location.pathname === '/') {
      /*
        IF at Home page:
          Don't display NavBar.

      */
      return <div className="u-cf" />;
    }

    // else if (this.props.location.pathname === '/about') {
    //   /*
    //     If at About page:
    //       Display NavBar without the brand logo.
    //   */
    //   return (
    //     <div className={styles.navbar}>
    //       <div className={styles.navbarNav}>
    //         <a className={styles.navbarBackbutton} onClick={this.goBack}>
    //           <img src={backbutton} alt="backbutton" />
    //         </a>
    //       </div>
    //     </div>
    //   );
    // }
    /*
      Else:
        Display basic NavBar.
    */
    return (
      <div className={`${styles.navbar}`}>
        {/* conditionally adds class to show bg */}
        <div className={`${styles.navbarDropdown} ${menuBgClicked}`}>
          <span className={styles.navbarMenu} role="button" tabIndex={0}>
            <div className={styles.icons}>
              <button
                type="button"
                className={`${styles.hamburger} ${styles.icon} ${iconClicked}`}
                onClick={() => this.showDropdown()}
              >
                {/* conditionally adds class to change icon color */}
                <SVG src={hamburger} alt="hamburger" />
              </button>
              <Link
                className={`${styles.navbarButton} ${styles.icon} ${iconClicked}`}
                to="/"
                onClick={() => this.hideDropdown()}
              >
                {/* conditionally adds class to change icon color */}
                <SVG className={`${styles.brandimg}`} src={cube} alt="cube" />
              </Link>
            </div>
            {dropdown}
          </span>
        </div>
        <div
          className={styles.profileButton}
          role="button"
          onKeyDown={() => this.hideDropdown()}
          onClick={() => this.hideDropdown()}
          tabIndex={0}
        >
          <ProfileButton />
        </div>
        <div className="u-cf" />
      </div>
    );
  }
}

export default withRouter(NavBar);
