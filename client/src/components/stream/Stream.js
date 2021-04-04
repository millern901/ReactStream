import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import StreamItem from '../streams/StreamItem';
import { getStream } from '../../actions/stream';

const Stream = ({ getStream, stream: { stream, loading }, match }) => {
  useEffect(() => {
    getStream(match.params.id);
  }, [getStream, match.params.id]);

  return loading || stream === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <Link to="/streams" className="btn">
        Back To Streams
      </Link>
      <StreamItem stream={stream} showActions={false} />
    </Fragment>
  );
};

Stream.propTypes = {
    getStream: PropTypes.func.isRequired,
    stream: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    stream: state.stream
});

export default connect(mapStateToProps, { getStream })(Stream);
