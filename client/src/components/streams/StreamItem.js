import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import formatDate from '../../utils/formatDate';
import { connect } from 'react-redux';
import { deleteStream } from '../../actions/stream';

const StreamItem = ({
  deleteStream,
  auth,
  stream: { _id, title, name, avatar, user, date },
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
          <Link to={`/streams/${_id}`} className="btn btn-primary">
          </Link>
          {!auth.loading && user === auth.user._id && (
            <button
              onClick={() => deleteStream(_id)}
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

StreamItem.defaultProps = {
  showActions: true
};

StreamItem.propTypes = {
  stream: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteStream: PropTypes.func.isRequired,
  showActions: PropTypes.bool
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, { deleteStream })(
  StreamItem
);
