import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import Form from './Form';
import PageLayout from '../../components/PageLayout';
import injectReducer from '../../utils/injectReducer';
import reducer from './reducer';
import createBundleAction from './actions';
import { makeSelectTitle, makeSelectDescription } from './selectors';
import './create.css';

const propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  createBundle: PropTypes.func.isRequired,
};

/**
 * Create page
 * @param {string} title - Title (if previously present) from state
 * @param {string} description - Description (if previously present) from state
 * @param {function} createBundle - Redux action to save title and description in the state
 */
function Create({ title, description, createBundle }) {
  return (
    <React.Fragment>
      <Helmet>
        <title>Create</title>
        <meta name="description" content="Description of Create" />
      </Helmet>
      <PageLayout>
        <Form
          title={title}
          description={description}
          onSubmit={createBundle}
        />
      </PageLayout>
    </React.Fragment>
  );
}

Create.propTypes = propTypes;

const mapStateToProps = createStructuredSelector({
  title: makeSelectTitle(),
  description: makeSelectDescription(),
});

function mapDispatchToProps(dispatch) {
  return {
    createBundle: (title, description) => dispatch(createBundleAction(title, description)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'create', reducer });

export default compose(
  withReducer,
  withConnect,
)(Create);

export { mapDispatchToProps };
