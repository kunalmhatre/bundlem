import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { makeSelectTitle } from '../../containers/Create/selectors';

const propTypes = {
  title: PropTypes.string.isRequired,
  component: PropTypes.func.isRequired,
};

/**
 * ProtectedRoute component
 * Note: This component is used for conditional routing, check out the link mentioned below.
 * Source: https://stackoverflow.com/a/48497783
 * @param {string} title - Title from the state
 * @param {function} component - Render prop for Route
 */
function ProtectedRoute({
  title,
  component,
  ...otherProps
}) {
  const Component = component;
  return (
    <Route
      {...otherProps}
      render={props => (
        title ? (
          <Component {...props} />
        ) : (
          <Redirect to="/create" />
        )
      )}
    />
  );
}

ProtectedRoute.propTypes = propTypes;

const mapStateToProps = createStructuredSelector({
  title: makeSelectTitle(),
});

const withConnect = connect(mapStateToProps);

export default compose(withConnect)(ProtectedRoute);

export { ProtectedRoute as ProtectedRouteComponent };
