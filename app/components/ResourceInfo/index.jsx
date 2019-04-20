import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import Button from '../Button';
import messages from './messages';
import './resource-info.css';

const propTypes = {
  resourceType: PropTypes.oneOf([
    'WEB PAGE',
    'VIDEO',
    'DOCUMENT',
    'IMAGE',
    'OTHER',
  ]),
  resourceLink: PropTypes.string,
  resourceCount: PropTypes.number,
  resourceTitle: PropTypes.string,
  resourceNotes: PropTypes.string,
  onLoad: PropTypes.func,
};

const defaultProps = {
  resourceType: 'OTHER',
  resourceLink: '#',
  resourceCount: 0,
  resourceTitle: null,
  resourceNotes: null,
  onLoad: () => null,
};

/**
 * ResourceInfo component
 * @param {string} resourceType - Type of the resource
 * @param {string} resourceLink - Link of the resource
 * @param {number} resourceCount - Location of the resource (index + 1) from the list of resources
 * @param {string} resourceTitle - Title of the resource
 * @param {string} resourceNotes - Notes of the resource
 * @param {function} onLoad - On load handler function
 */
function ResourceInfo({
  resourceType,
  resourceLink,
  resourceCount,
  resourceTitle,
  resourceNotes,
  onLoad,
}) {
  return (
    <div
      className="resource-info theme-blue"
      onLoad={onLoad}
    >
      <div className="resource-info-title">
        {`${resourceCount}. `}
        {resourceTitle || resourceType}
      </div>
      {
        resourceNotes ? (
          <div className="resource-info-notes">{resourceNotes}</div>
        ) : null
      }
      <div className="resource-info-action">
        <Button
          text={messages[`action${resourceType}`]}
          onClick={() => { window.open(resourceLink); }}
        />
        <span className="resource-info-action-label">
          <FormattedMessage {...messages[resourceType]} />
        </span>
      </div>
    </div>
  );
}

ResourceInfo.propTypes = propTypes;
ResourceInfo.defaultProps = defaultProps;

export default ResourceInfo;
