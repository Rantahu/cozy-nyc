import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
import Helmet from 'react-helmet';
// import StreamsBlock from 'components/Streams/StreamsBlock';
import NotAvailable from 'components/NotAvailable/NotAvailable';
import * as StreamsActions from 'redux/modules/streams';

@connect(
  state => ({
    streamsList: state.streams.streamsList
  }),
  { ...StreamsActions }
)
class Streams extends Component {
  // static propTypes = {
  //   streamsList: PropTypes.arrayOf(PropTypes.object),
  //   getStreams: PropTypes.func.isRequired
  // };

  // static defaultProps = {
  //   streamsList: null
  // };

  // componentWillMount() {
  //   const { getStreams, streamsList } = this.props;
  //   if (!streamsList) {
  //     getStreams();
  //   }
  // }

  render() {
    // const { streamsList } = this.props;

    // const mappedStreams = streamsList.map(streams => (
    //   <StreamsBlock
    //     key={streams.id}
    //     user={streams.username}
    //     preview={streams.previewImg}
    //     title={streams.title}
    //     viewers={streams.viewCount}
    //   />
    // ));

    return (
      <div>
        <Helmet title="streams" />
        <div>
          <NotAvailable />
        </div>
      </div>
    );
  }
}
export default Streams;
