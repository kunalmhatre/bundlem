/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';

import NotFoundPage from '../NotFoundPage/Loadable';
import Bundle from '../Bundle/Loadable';
import Make from '../Make/Loadable';
import Create from '../Create/Loadable';
import Robot from '../Robot/Loadable';
import Welcome from '../../components/Welcome/Loadable';
import ProtectedRoute from '../../components/ProtectedRoute';
import getGlobalStyle from '../../global-styles';
import '../../themes.css';

export default function App() {
  const GlobalStyle = getGlobalStyle();
  return (
    <React.Fragment>
      <Switch>
        <Route exact path="/" component={Welcome} />
        <Route path="/create" component={Create} />
        <ProtectedRoute path="/make" component={Make} />
        <ProtectedRoute path="/robot" component={Robot} />
        <Route path="/bundle" component={Bundle} />
        <Route component={NotFoundPage} />
      </Switch>
      <GlobalStyle />
    </React.Fragment>
  );
}
