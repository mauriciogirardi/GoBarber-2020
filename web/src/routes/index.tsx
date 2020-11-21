import React from 'react';
import { Switch } from 'react-router-dom';

import SignIn from 'pages/SignIn';
import SignUp from 'pages/SignUp';
import ForgotPassword from 'pages/forgotPassword';
import ResetPassword from 'pages/resetPassword';

import Dashboard from 'pages/Dashboard';
import Profile from 'pages/profile';

import Route from './Route';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />
    <Route path="/signup" component={SignUp} />
    <Route path="/forgot-password" component={ForgotPassword} />
    <Route path="/reset-password" component={ResetPassword} />

    <Route path="/profile" component={Profile} isPrivate />
    <Route path="/dashboard" component={Dashboard} isPrivate />
  </Switch>
);

export default Routes;
