import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import VideoItem from './VideoItem';
import VideoForm from './VideoForm';
import { getVideos } from '../../actions/video';

const Videos = ({ getVideos, video: { videos } }) => {
  useEffect(() => {
    getVideos();
  }, [getVideos]);

  return (
    <Fragment>
      <h1 className="large text-primary">Videos</h1>
      <p className="lead">
        <i className="fas fa-user" /> Welcome to the community
      </p>
      <VideoForm />
      <div className="streams">
        {videos.map((video) => (
          <VideoItem key={video._id} video={video} />
        ))}
      </div>
    </Fragment>
  );
};

Videos.propTypes = {
  getVideos: PropTypes.func.isRequired,
  video: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  video: state.video
});

export default connect(mapStateToProps, { getVideos })(Videos);
