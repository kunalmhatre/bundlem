import React from 'react';
import { withFormik } from 'formik';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as yup from 'yup';
import { Row, Col } from 'antd';
import { FormattedMessage } from 'react-intl';

import messages from './messages';
import BundleCard from '../../components/BundleCard';
import Button from '../../components/Button';
import Input from '../../components/Input';

const propTypes = {
  onSubmit: PropTypes.func,
};

const defaultProps = {
  onSubmit: () => null,
};

/**
 * Form for Create page
 * @param {function} onSubmit - On submit handler function
 */
function BaseForm({
  /* eslint-disable react/prop-types */ // formik props
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  isValid,
  onSubmit,
  /* eslint-disable react/prop-types */ // react-router-dom prop
  history,
}) {
  const responsiveForm = {
    xs: 24,
    sm: 24,
    md: 24,
    lg: 24,
    xl: 10,
    xxl: 10,
  };

  return (
    <Row className="create-row">
      <Col {...responsiveForm}>
        <div className="create-title">
          <FormattedMessage {...messages.createTitle} />
        </div>
        <form>
          <Input
            autoFocus
            id="title"
            name="title"
            label={messages.titleLabel}
            placeholder={messages.titlePlaceholder}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.title}
            showError={!!(touched.title && errors.title)}
            errorMessage={messages[errors.title]}
          />
          <Input
            id="description"
            name="description"
            label={messages.descriptionLabel}
            placeholder={messages.descriptionPlaceholder}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.description}
            showError={!!errors.description}
            errorMessage={messages[errors.description]}
          />
          <Button
            className="create-button"
            text={messages.nextButton}
            onClick={() => {
              onSubmit(values.title.trim(), values.description.trim());
              history.push('/make');
            }}
            disabled={!isValid}
          />
        </form>
      </Col>
      <Col
        className="create-bundle-card"
        span={14}
      >
        {
          values.title ? (
            <BundleCard
              bundleTitle={values.title}
              resourcesCount={0}
              clickable={false}
            />
          ) : null
        }
      </Col>
    </Row>
  );
}

BaseForm.propTypes = propTypes;
BaseForm.defaultProps = defaultProps;

const Form = withFormik({
  mapPropsToValues({ title, description }) {
    return {
      title: title || '',
      description: description || '',
    };
  },
  validationSchema: yup.object().shape({
    title: yup
      .string()
      .trim()
      .max(120, 'errorTitleLength')
      .required('errorTitleEmpty'),
    description: yup
      .string()
      .trim()
      .max(320, 'errorDescriptionLength'),
  }),
  isInitialValid({ title }) {
    return !!(title);
  },
})(BaseForm);

export default withRouter(Form);
export { BaseForm };
