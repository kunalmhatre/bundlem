import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'antd';
import { FormattedMessage } from 'react-intl';

const propTypes = {
  message: PropTypes.shape({
    id: PropTypes.string.isRequired,
    defaultMessage: PropTypes.string.isRequired,
  }).isRequired,
  isLoading: PropTypes.bool,
  isError: PropTypes.bool,
  errorClassName: PropTypes.string,
};

const defaultProps = {
  isLoading: true,
  isError: false,
  errorClassName: null,
};

/**
 * RobotMessage component
 * @param {object} message - Message to be rendered (react-intl)
 * @param {boolean} [isLoading=true] - States whether the loader should be rendered
 * @param {boolean} [isError=false] - States whether the message provided is an error message
 * @param {string} [errorClassName=null] - Extra class(es) to be applied on the error message
 */
function RobotMessage({
  message,
  isLoading,
  isError,
  errorClassName,
}) {
  return (
    <React.Fragment>
      <hr className="robot-separator" />
      <div className="robot-message">
        {
          !isError ? (
            <React.Fragment>
              {
                isLoading ? (
                  <Icon className="robot-messages-loader theme-blue" type="loading" />
                ) : null
              }
              <FormattedMessage {...message} />
            </React.Fragment>
          ) : (
            <div className={errorClassName}>
              <FormattedMessage {...message} />
            </div>
          )
        }
      </div>
    </React.Fragment>
  );
}

RobotMessage.propTypes = propTypes;
RobotMessage.defaultProps = defaultProps;

export default RobotMessage;
