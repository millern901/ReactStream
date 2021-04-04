import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import StreamItem from './StreamItem';
import StreamForm from './StreamForm';
import { getStreams } from '../../actions/stream';

const Streams = ({ getStreams, stream: { streams } }) => {
  useEffect(() => {
    getStreams();
  }, [getStreams]);

  return (
    <Fragment>
      <h1 className="large text-primary">Streams</h1>
      <p className="lead">
        <i className="fas fa-user" /> Welcome to the community
      </p>
      <StreamForm />
      <div className="streams">
        {streams.map((stream) => (
          <StreamItem key={stream._id} stream={stream} />
        ))}
      </div>
    </Fragment>
  );
};

Streams.propTypes = {
    getStreams: PropTypes.func.isRequired,
    stream: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    stream: state.stream
});

export default connect(mapStateToProps, { getStreams })(Streams);
