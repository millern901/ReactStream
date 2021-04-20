import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const ProfileAbout = ({
  profile: {
    bio,
    user: { name }
  }
}) => (
  <div className='profile-about bg-light p-2'>
    <Fragment>
      <h2 className='text-primary'>{name}'s Bio</h2>
      <p>{bio}</p>
      <div className='line' />
    </Fragment>
  </div>
);

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileAbout;
