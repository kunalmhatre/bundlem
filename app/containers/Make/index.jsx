import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Row, Col } from 'antd';
import { FormattedMessage } from 'react-intl';

import Button from '../../components/Button';
import messages from './messages';
import PageLayout from '../../components/PageLayout';
import Form from './Form';
import injectReducer from '../../utils/injectReducer';
import reducer from './reducer';
import './make.css';
import {
  setCurrentResourceAction,
  addResourceAction,
  removeResourceAction,
} from './actions';
import {
  makeSelectCurrentResource,
  makeSelectResources,
} from './selectors';
import { makeSelectTitle } from '../Create/selectors';

const propTypes = {
  setCurrentResource: PropTypes.func.isRequired,
  currentResource: PropTypes.number.isRequired,
  addResource: PropTypes.func.isRequired,
  resources: PropTypes.arrayOf(PropTypes.shape({
    resourceType: PropTypes.string,
    link: PropTypes.string,
    title: PropTypes.string,
    notes: PropTypes.string,
  })).isRequired,
  removeResource: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

/**
 * Make page
 * @param {function} setCurrentResource - Redux action to set (current) resource number
 * @param {number} currentResource - Current resource number
 * @param {function} addResource - Redux action to add resource to the stored resources
 * @param {array} resources - Stored resources
 * @param {function} removeResource - Redux action to remove resource
 * @param {string} title - Title of the bundle
 */
function Make({
  setCurrentResource,
  currentResource,
  addResource,
  resources,
  removeResource,
  title,
}) {
  const [shouldRenderRemoveButton, setShouldRenderRemoveButton] = useState(false);
  const [buttonChoice, setButtonChoice] = useState(null);

  const responsiveForm = {
    xs: 24,
    sm: 24,
    md: 24,
    lg: 24,
    xl: 12,
    xxl: 12,
  };
  const formFields = (resources[currentResource]) ? {
    resourceType: resources[currentResource].resourceType,
    link: resources[currentResource].link,
    title: resources[currentResource].title,
    notes: resources[currentResource].notes,
  } : null;

  const nextResource = (resource) => {
    if (!resources[currentResource + 1]) {
      setShouldRenderRemoveButton(false);
    }

    addResource(currentResource, resource);
    setButtonChoice('next');
    setShouldRenderRemoveButton(true);
  };

  const previousResource = (resource) => {
    /* istanbul ignore else */
    if (resource.resourceType && resource.link) {
      // Add after validating
      addResource(currentResource, resource);
    }

    setButtonChoice('previous');
    setShouldRenderRemoveButton(true);
  };

  const setCurrentResourceMemoized = useCallback(
    (choice) => {
      if (choice === 'next') {
        setCurrentResource(currentResource + 1);
      } else if (choice === 'previous') {
        setCurrentResource(currentResource - 1);
      }

      setButtonChoice(null);
    },
    [currentResource, setCurrentResource],
  );

  useEffect(() => {
    setCurrentResourceMemoized(buttonChoice);
  }, [resources, buttonChoice, setCurrentResourceMemoized]);

  return (
    <React.Fragment>
      <Helmet
        title="Make"
        meta={[
          {
            name: 'description',
            content: 'Description of Make',
          },
        ]}
      />
      <PageLayout
        setString
        headerTitleString="Bundlem"
      >
        <Row>
          <Col {...responsiveForm}>
            <div className="make-resource-count">
              <FormattedMessage {...messages.resource} />
              {` ${currentResource + 1}`}
            </div>
            <Form
              {...formFields}
              currentResource={currentResource}
              nextResource={nextResource}
              previousResource={previousResource}
              removeResource={removeResource}
              isAddedResource={!!(resources[currentResource]) && shouldRenderRemoveButton}
            />
            {
              resources.length >= 1 ? (
                <Button
                  className="make-bundle-up-button"
                  text={messages.bundleUpButton}
                  size="block"
                />
              ) : null
            }
          </Col>
          <Col
            className="make-button-section"
            span={8}
            offset={2}
          >
            {
              resources.length >= 1 ? (
                <Button
                  text={messages.bundleUpButton}
                  size="block"
                />
              ) : null
            }
          </Col>
        </Row>
      </PageLayout>
    </React.Fragment>
  );
}

Make.propTypes = propTypes;

const mapStateToProps = createStructuredSelector({
  currentResource: makeSelectCurrentResource(),
  resources: makeSelectResources(),
  title: makeSelectTitle(),
});

function mapDispatchToProps(dispatch) {
  return {
    setCurrentResource: currentResource => dispatch(
      setCurrentResourceAction(currentResource),
    ),
    addResource: (resourceNumber, resource) => dispatch(
      addResourceAction(resourceNumber, resource),
    ),
    removeResource: resourceNumber => dispatch(
      removeResourceAction(resourceNumber),
    ),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'make', reducer });

export default compose(
  withReducer,
  withConnect,
)(Make);

export { mapDispatchToProps };
