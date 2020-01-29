import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
import Helmet from 'react-helmet';
import NotAvailable from 'components/NotAvailable/NotAvailable';
// import * as WorksActions from 'redux/modules/works';

@connect()
// state => ({
//   status: state.works.info
//   blocks: state.works.blocks
// })
// { ...WorksActions }
class WorksHome extends Component {
  // static propTypes = {
  //   status: PropTypes.string.isRequired
  //   blocks: PropTypes.arrayOf(PropTypes.object),
  //   getBlocks: PropTypes.func.isRequired
  // };

  // static defaultProps = {
  //   blocks: null
  // };

  // componentWillMount() {
  //   const { getBlocks, status } = this.props;
  //   if (status === 'online' || status == null) {
  //     getBlocks();
  //   }
  // }

  render() {
    return (
      <div>
        <Helmet title="Works" />
        <NotAvailable />
      </div>
    );
  }
}

export default WorksHome;
