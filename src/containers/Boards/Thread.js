import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
import Helmet from 'react-helmet';
import PostBlock from 'components/Boards/PostBlock';
import NotAvailable from 'components/NotAvailable/NotAvailable';
import * as BoardsActions from 'redux/modules/boards';
import PostForm from 'components/Boards/Forms/PostForm';
import * as notifActions from 'redux/modules/notifs';

/*
  Thread Page

  Displays a thread which is an OP post followed by replies.
*/
/* queryset: Query that holds all Threads in the order based off their
latestReplyTime
serializer_class: The ThreadListSerializer is used
permission_classes: anyone is allowed to call ThreadList even those
who are not authenticated users
search_fields: Allow searched to be based off the following fields
title,
poster,
board
example: http://example.com/thread/title?search=Treyway
ordering_fields: Allow search query to be ordered in reverse latestReplyTime

*/

// tODO: also needs to send thread info frm store or url
@connect(
  state => ({
    // Needs to check if there
    // ie. Board ID/Tag, Thread Title, Thread ID, Posts, Stats(Number of replies and images)
    currentThread: state.boards.currentThread,
    auth: state.auth
  }),
  /* needs action to call data from API to see if the thread exist and the thread info */
  { ...notifActions, ...BoardsActions }
)
class Thread extends Component {
  static propTypes = {
    // Define the proptyes being used here.
    currentThread: PropTypes.shape({
      id: PropTypes.number.isRequired,
      posts: PropTypes.array,
      board: PropTypes.number
    }),
    auth: PropTypes.objectOf(PropTypes.any).isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({
        threadId: PropTypes.string.isRequired
      })
    }),
    getThread: PropTypes.func.isRequired,
    notifSend: PropTypes.func.isRequired
  };

  static defaultProps = {
    // Define any defaults like Thread ID
    currentThread: null,
    match: null
  };

  constructor(props) {
    super(props);
    this.state = { showPopupForm: false };
  }

  componentDidMount() {
    // Call Thread action and gets data based on URL/Location ie. ThreadID
    const { match, getThread } = this.props;
    getThread(match.params.threadId);
  }

  componentDidUpdate(prevProps) {
    const { match, getThread, currentThread } = this.props;
    if ((currentThread && !(match.params.threadId === `${currentThread.id}`)) || !prevProps.currentThread) {
      getThread(match.params.threadId);
    }
  }

  successSubmit = () => {
    const { notifSend } = this.props;

    notifSend({
      message: 'Post submitted !',
      kind: 'success',
      dismissAfter: 2000
    });
  };

  errorSubmit = error => {
    const { notifSend } = this.props;

    notifSend({
      message: `Post submit error:\n${error.detail}`,
      kind: 'danger',
      dismissAfter: 2000
    });
  };

  createPost = async data => {
    this.toggleForm();
    const { createPost } = this.props;
    try {
      const result = await createPost(data);
      this.successSubmit();
      return result;
    } catch (error) {
      this.errorSubmit(error);
    }
  };

  toggleForm() {
    const { showPopupForm } = this.state;
    this.setState({
      showPopupForm: !showPopupForm
    });
  }

  render() {
    const { currentThread, auth } = this.props;
    const { showPopupForm } = this.state;
    const styles = require('./Boards.scss');

    const popup = showPopupForm ? (
      <div className={`${styles.popupForm}`}>
        <PostForm
          onSubmit={this.createPost}
          board={currentThread.board}
          poster={auth.user.id}
          thread={currentThread.id}
        />
      </div>
    ) : (
      <button type="button" className={`${styles.popupButton}`} onClick={() => this.toggleForm()}>
        +
      </button>
    );

    /*
      Creates a list of posts.
      IMPORTANT: OP's post should be visually different!!!!
    */
    const mappedPosts = currentThread.posts.map(post => (
      <PostBlock key={post.id} image={post.image} message={post.message} user={post.poster} date={post.created} />
    ));

    return (
      <div>
        {/*
          Should display OP's Post followed by replies.

          Conditional statement is needed to prevent the page from loading if
          there's no thread based on the ID.
        */}
        {currentThread !== null && (
          <div>
            <Helmet title={`boards - #${currentThread.id}`} />
            <div className="op">{mappedPosts[0]}</div>
            <div className="replies">
              <ul>{mappedPosts.slice(1)}</ul>
            </div>

            {auth.user !== null && <div className={`${styles.popupWrapper}`}>{popup}</div>}
          </div>
        )}
        {currentThread == null && (
          <div>
            <NotAvailable />
          </div>
        )}
      </div>
    );
  }
}

export default Thread;
