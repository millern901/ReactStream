import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import DashboardActions from '../dashboard/DashboardActions';
import { getProfileById, addSubscribe } from '../../actions/profile';
import VideoItem from '../videos/VideoItem';

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
          <Fragment>
            <ProfileTop profile={profile} />
            <ProfileAbout profile={profile} />
            <DashboardActions />
            {auth.user._id !== profile.user._id && (
            auth.isAuthenticated &&
            auth.loading === false &&
            profile.subscribers.filter(subscriber => subscriber.user === auth.user._id).length === 0 ? (
                <div className='dash-buttons'>
                  <Link to='/subscribe' className='btn btn-light'>
                    <i className='fas fa-user-circle text-primary' /> Subscribe
                  </Link>
                </div>
            ) : (
                <Link className="btn btn-primary my-1">
                  Subscribed
                </Link>
            ))}
          </Fragment>

          <div>
            <div className='bg-primary p'>
              <h3>{profile.user.name}'s Videos</h3>
            </div>
            <div className="streams">
              {profile.videos.map((video) => (
                <VideoItem key={video._id} video={video} />
              ))}
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
