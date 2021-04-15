import React from 'react';
import { Link } from 'react-router-dom';
import VideoForm from '../videos/VideoForm';

const DashboardActions = () => {
  return (
    <div className='dash-buttons'>
      <Link to='/edit-profile' className='btn btn-light'>
        <i className='fas fa-user-circle text-primary' /> Edit Profile
      </Link>
      <VideoForm />
    </div>
  );
};

export default DashboardActions;
