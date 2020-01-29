import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

/*
  Thread Component
  Bubble/Text box for Threads.
*/
class ThreadBlock extends Component {
  static propTypes = {
    image: PropTypes.string,
    title: PropTypes.string,
    blurb: PropTypes.string,
    user: PropTypes.shape({
      username: PropTypes.string,
      profileImg: PropTypes.string
    }).isRequired,
    date: PropTypes.string.isRequired,
    boardTag: PropTypes.string.isRequired,
    threadID: PropTypes.number.isRequired
  };

  static defaultProps = {
    image: null,
    title: null,
    blurb: ''
  };

  render() {
    const {
      threadID, boardTag, image, title, blurb, user, date
    } = this.props;
    const styles = require('./Thread.scss');
    const profileURL = `/u/${user.username}`;
    const threadURL = `/boards/${boardTag}/thread/${threadID}`;

    return (
      /*
        Needs to display Thread image(If it exist), user/profile of poster, blurb,
        and post date.
      */
      <div className={`${styles.threadWrapper} col-md-3 col-xs-6 mx-auto`}>
        <Link to={{ pathname: threadURL }}>
          <div className={`${styles.threadContent}`}>
            {image !== null && <img className={styles.threadImage} src={image} alt={user.username} />}
            <div className={`${styles.threadText} card-body`}>
              {title !== null && <p className={`${styles.threadTitle} card-title`}>{title}</p>}
              <p className={`${styles.threadBlurb} card-text`}>{blurb}</p>
              {<p className={styles.threadDate}>{date}</p>}
            </div>
            <div className={styles.threadPoster}>
              <Link to={{ pathname: profileURL }}>
                <p>
                  <img className={styles.profileAvatar} src={user.profileImg} alt={user.username} /> {user.username}
                </p>
              </Link>
            </div>
          </div>
        </Link>
      </div>
    );
  }
}

export default ThreadBlock;
