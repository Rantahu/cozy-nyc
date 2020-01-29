import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Helmet from 'react-helmet';
import NotAvailable from 'components/NotAvailable/NotAvailable';
import * as BoardsActions from 'redux/modules/boards';

/*
  Board Categories Page

  Displays a list of active boards on the site.
*/
@connect(
  state => ({
    categories: state.boards.categories
  }),
  { ...BoardsActions }
)
class Categories extends Component {
  static propTypes = {
    categories: PropTypes.arrayOf(PropTypes.object),
    getCategories: PropTypes.func.isRequired
  };

  static defaultProps = {
    categories: []
  };

  componentWillMount() {
    // Calls API for list of boards if there are no categories in state.
    const { getCategories } = this.props;
    getCategories();
  }

  render() {
    const styles = require('./Boards.scss');
    const { categories } = this.props;

    const mappedBoards = categories.map(board => (
      <div className="row" key={board.id}>
        <Link className={styles.link} to={{ pathname: `/boards/${board.tag}/` }}>
          /{board.tag}/ - {board.name}
        </Link>
      </div>
    ));

    return (
      <div>
        <Helmet title="boards" />
        {/*
            ToDo:
              Conditional state should be change to if cozy board services are online
        */}
        {categories && (
          <div>
            <ul>{mappedBoards}</ul>
          </div>
        )}
        {!categories && (
          <div>
            <NotAvailable />
          </div>
        )}
      </div>
    );
  }
}

export default Categories;
