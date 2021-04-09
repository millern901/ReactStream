import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Register from '../auth/Register';
import Login from '../auth/Login';
import Alert from '../layout/Alert';
import Dashboard from '../dashboard/Dashboard';
import Posts from '../posts/Posts';
import Post from '../post/Post';
import Videos from '../videos/Videos';
import Video from '../video/Video';
import NotFound from '../layout/NotFound';
import PrivateRoute from '../routing/PrivateRoute';

const Routes = props => {
  return (
    <section className="container">
      <Alert />
      <Switch>
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <PrivateRoute exact path="/posts" component={Posts} />
        <PrivateRoute exact path="/posts/:id" component={Post} />
        <PrivateRoute exact path="/videos" component={Videos} />
        <PrivateRoute exact path="/videos/:id" component={Video} />
        <Route component={NotFound} />
      </Switch>
    </section>
  );
};

export default Routes;
