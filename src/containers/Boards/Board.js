import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import ThreadBlock from 'components/Boards/ThreadBlock';
import ThreadForm from 'components/Boards/Forms/ThreadForm';
import NotAvailable from 'components/NotAvailable/NotAvailable';
import * as BoardsActions from 'redux/modules/boards';
import * as notifActions from 'redux/modules/notifs';

/*
  Board Page

  Displays a list of Threads on the current board in order of recent activity, trending,
  or newest.
*/
@connect(
  state => ({
    // Needs to get all the threads on the active board
    currentBoard: state.boards.currentBoard,
    auth: state.auth
  }),
  /* actions to check if board is available and list of boards */
  { ...notifActions, ...BoardsActions }
)
class Board extends Component {
  static propTypes = {
    // Define the proptypes being used here.
    currentBoard: PropTypes.shape({
      tag: PropTypes.string,
      name: PropTypes.string,
      threads: PropTypes.array
    }),
    auth: PropTypes.objectOf(PropTypes.any).isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({
        boardTag: PropTypes.string.isRequired
      })
    }),
    getBoard: PropTypes.func.isRequired,
    notifSend: PropTypes.func.isRequired
  };

  static defaultProps = {
    // Define any defaults like Board tag
    currentBoard: null,
    match: null
  };

  constructor(props) {
    super(props);
    this.state = { showPopupForm: false };
  }

  componentDidMount() {
    // Call board actions and gets data based on URL/Location
    const { match, getBoard } = this.props;
    getBoard(match.params.boardTag);
  }

  componentDidUpdate(prevProps) {
    const { match, getBoard, currentBoard } = this.props;
    if ((currentBoard && !(match.params.boardTag === currentBoard.tag)) || !prevProps.currentBoard) {
      getBoard(match.params.boardTag);
    }
  }

  successSubmit = () => {
    const { notifSend } = this.props;

    notifSend({
      message: 'Thread submitted !',
      kind: 'success',
      dismissAfter: 2000
    });
  };

  errorSubmit = error => {
    const { notifSend } = this.props;

    notifSend({
      message: `Thread submit error:\n${error.detail}`,
      kind: 'danger',
      dismissAfter: 2000
    });
  };

  createThread = async data => {
    this.toggleForm();
    // this.successSubmit();
    const { createThread } = this.props;
    try {
      const result = await createThread(data);
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
    const styles = require('./Boards.scss');
    const { currentBoard, match, auth } = this.props;
    const { showPopupForm } = this.state;
    const popup = showPopupForm ? (
      <div className={`${styles.popupForm}`}>
        <ThreadForm onSubmit={this.createThread} board={currentBoard.tag} poster={auth.user.id} />
      </div>
    ) : (
      <button type="button" className={`${styles.popupButton}`} onClick={() => this.toggleForm()}>
        +
      </button>
    );

    /*
      Creates a list of threads.
    */
    const mappedThreads = currentBoard.threads.map(thread => (
      <ThreadBlock
        key={thread.id}
        threadID={thread.id}
        boardTag={match.params.boardTag}
        image={thread.image}
        title={thread.title}
        blurb={thread.blurb}
        user={thread.poster}
        date={thread.created}
      />
    ));

    return (
      <div>
        {/*
        Conditional statement is needed to prevent the page from loading if
        there's no board based on the ID.
       */}
        {currentBoard !== null && (
          <div>
            <Helmet title={`boards - /${currentBoard.tag}/`} />
            <div className={`${styles.threads} card-columns`}>
              {mappedThreads}
              {/*
              Conditional statement is needed to prevent nonauthenticated users
              from filling out a thread create form.
            */}
            </div>
            {auth.user !== null && <div className={`${styles.popupWrapper}`}>{popup}</div>}
          </div>
        )}
        {currentBoard == null && (
          <div>
            <NotAvailable />
          </div>
        )}
      </div>
    );
  }
}

export default Board;
