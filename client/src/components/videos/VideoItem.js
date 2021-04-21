import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import formatDate from '../../utils/formatDate';
import { connect } from 'react-redux';
import { addLike, removeLike, deleteVideo } from '../../actions/video';

const VideoItem = ({
  addLike,
  removeLike,
  deleteVideo,
  auth,
  video: { _id, title, name, avatar, user, likes, comments, date },
  showActions
}) => (
  <div className="stream bg-white p-1 my-1">
    <div>
      <Link to={`/profile/${user}`}>
        <img className="round-img" src={avatar} alt="" />
        <h4>{name}</h4>
      </Link>
    </div>
    <div>
      <p className="my-1">{title}</p>
      <p className="stream-date">Posted on {formatDate(date)}</p>

      {showActions && (
        <Fragment>
          <button
            onClick={() => addLike(_id)}
            type="button"
            className="btn btn-light"
          >
            <i className="fas fa-thumbs-up" />{' '}
            <span>{likes.length > 0 && <span>{likes.length}</span>}</span>
          </button>
          <button
            onClick={() => removeLike(_id)}
            type="button"
            className="btn btn-light"
          >
            <i className="fas fa-thumbs-down" />
          </button>
          <Link to={`/videos/${_id}`} className="btn btn-primary">
            Link to Video
          </Link>

          {!auth.loading && user === auth.user._id && (
            <button
              onClick={() => deleteVideo(_id)}
              type="button"
              className="btn btn-danger"
            >
              <i className="fas fa-times" />
            </button>
          )}


        </Fragment>
      )}
    </div>
  </div>
);

VideoItem.defaultProps = {
  showActions: true
};

VideoItem.propTypes = {
  video: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deleteVideo: PropTypes.func.isRequired,
  showActions: PropTypes.bool
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, { addLike, removeLike, deleteVideo })(
  VideoItem
);
