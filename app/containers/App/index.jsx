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

import NotFoundPage from '../NotFoundPage';
import Bundle from '../Bundle';
import Make from '../Make';
import Create from '../Create';
import Robot from '../Robot';
import Welcome from '../../components/Welcome';
import ProtectedRoute from '../../components/ProtectedRoute';
import Publish from '../../components/Publish';
import getGlobalStyle from '../../global-styles';
import '../../themes.css';

/**
 * App container
 * Note: This container came with the boilerplate code.
 */
function App() {
  const GlobalStyle = getGlobalStyle();

  return (
    <React.Fragment>
      <Switch>
        <Route exact path="/" component={Welcome} />
        <Route path="/create" component={Create} />
        <ProtectedRoute path="/make" component={Make} />
        <ProtectedRoute path="/robot" component={Robot} />
        <Route path="/publish" component={Publish} />
        <Route path="/bundle/:bundleID" component={Bundle} />
        <Route component={NotFoundPage} />
      </Switch>
      <GlobalStyle />
    </React.Fragment>
  );
}

export default App;
