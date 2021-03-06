import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Register from '../auth/Register';
import Login from '../auth/Login';
import Alert from '../layout/Alert';
import Dashboard from '../dashboard/Dashboard';
import Videos from '../videos/Videos';
import Video from '../video/Video';
import NotFound from '../layout/NotFound';
import PrivateRoute from '../routing/PrivateRoute';
import Profiles from '../profiles/Profiles';
import Profile from '../profile/Profile';
import PaymentForm from '../profile/PaymentForm2';
import ProfileForm from '../profiles/ProfileForm';

const Routes = props => {
  return (
    <section className="container">
      <Alert />
      <Switch>
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/profiles" component={Profiles} />
        <Route exact path="/profile/:id" component={Profile} />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <PrivateRoute exact path="/create-profile" component={ProfileForm} />
        <PrivateRoute exact path="/edit-profile" component={ProfileForm} />
        <PrivateRoute exact path="/subscribe" component={PaymentForm} />
        <PrivateRoute exact path="/videos" component={Videos} />
        <PrivateRoute exact path="/videos/:id" component={Video} />
        <Route component={NotFound} />
      </Switch>
    </section>
  );
};

export default Routes;
