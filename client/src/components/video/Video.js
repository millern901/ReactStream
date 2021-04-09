import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import VideoItem from '../videos/VideoItem';
import { getVideo } from '../../actions/video';

const Video = ({ getVideo, video: { video, loading }, match }) => {
  useEffect(() => {
    getVideo(match.params.id);
  }, [getVideo, match.params.id]);

  return loading || video === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <Link to="/videos" className="btn">
        Back To Videos
      </Link>
      <video style={{ width: '100%' }} src={`http://localhost:5000/uploads/${video.fileName}`} controls></video>
      <VideoItem video={video} showActions={false} />
    </Fragment>
  );
};

Video.propTypes = {
  getVideo: PropTypes.func.isRequired,
  video: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  video: state.video
});

export default connect(mapStateToProps, { getVideo })(Video);
