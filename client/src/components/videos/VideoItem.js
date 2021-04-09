import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import formatDate from '../../utils/formatDate';
import { connect } from 'react-redux';

const VideoItem = ({
  auth,
  video: { _id, title, name, avatar, user, date },
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
          <Link to={`/videos/${_id}`} className="btn btn-primary">
          </Link>
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
  showActions: PropTypes.bool
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps)(
  VideoItem
);
