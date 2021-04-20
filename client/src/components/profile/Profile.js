import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import { getProfileById, addSubscribe } from '../../actions/profile';
import VideoItem from '../videos/VideoItem';
import Modal from './Modal'

const Profile = ({
  getProfileById,
  addSubscribe,
  profile: { profile },
  auth,
  match
}) => {
  useEffect(() => {
    getProfileById(match.params.id);
  }, [getProfileById, match.params.id]);
  
  return (
    <Fragment>
      {profile === null ? (
        <Spinner />
      ) : (
        <Fragment>
          <Link to="/profiles" className="btn btn-light">
            Back To Profiles
          </Link>
 
          <div className="profile-grid my-1">
            <ProfileTop profile={profile} />
            <ProfileAbout profile={profile} />
            {auth.isAuthenticated &&
            auth.loading === false &&
            auth.user._id === profile.user._id && (
              <div className='dash-buttons'>
              <Link to='/edit-profile' className='btn btn-light'>
                <i className='fas fa-user-circle text-primary' /> Edit Profile
              </Link>
            </div>
            )}   
          
          <button
            onClick={() => addSubscribe(profile._id)}
            type="button"
            className="btn btn-light"
          >
            Subscribe
          </button>


            <div className='bg-primary p'>
              <h3>{profile.user.name}'s Videos</h3>
            </div>
            <div className="streams">
              {profile.videos.map((video) => (
                <VideoItem key={video._id} video={video} />
              ))}
            </div>
            <div>
              <Modal/>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  addSubscribe: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(mapStateToProps, { getProfileById, addSubscribe })(Profile);
