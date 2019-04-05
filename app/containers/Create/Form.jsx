import React from 'react';
import { withFormik } from 'formik';
import PropTypes from 'prop-types';
import * as yup from 'yup';
import { Row, Col } from 'antd';
import { FormattedMessage } from 'react-intl';

import messages from './messages';
import BundleCard from '../../components/BundleCard';
import Button from '../../components/Button';
import Input from '../../components/Input';

const formikValuesPropType = PropTypes.shape({
  title: PropTypes.string,
  description: PropTypes.string,
});

const propTypes = {
  values: formikValuesPropType.isRequired,
  errors: formikValuesPropType.isRequired,
  touched: PropTypes.shape({
    title: PropTypes.bool,
    description: PropTypes.bool,
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  isValid: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func,
};

const defaultProps = {
  onSubmit: () => null,
};

/**
 * Form for Create page
 * @param {object} values - BY FORMIK HOC (contains values for the input fields)
 * @param {object} errors - BY FORMIK HOC (contains errors for the input fields)
 * @param {object} touched - BY FORMIK HOC (states whether specific input field was touched)
 * @param {function} handleChange - BY FORMIK HOC (on change handler function)
 * @param {function} handleBlur - BY FORMIK HOC (on blur handler function)
 * @param {boolean} isValid - BY FORMIK HOC (states whether form is valid for submission)
 * @param {function} onSubmit - On submit handler function
 */
function BaseForm({
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  isValid,
  onSubmit,
}) {
  const responsiveForm = {
    xs: 24,
    sm: 24,
    md: 24,
    lg: 10,
    xl: 10,
    xxl: 10,
  };

  return (
    <Row>
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
            showError={!!(errors.description)}
            errorMessage={messages[errors.description]}
          />
          <Button
            className="create-button"
            text={messages.nextButton}
            onClick={() => onSubmit(values.title.trim(), values.description.trim())}
            disabled={!isValid}
          />
        </form>
      </Col>
      <Col
        className="create-bundle-card"
        span={14}
      >
        <BundleCard
          bundleTitle={values.title || 'Bundle'}
          resourcesCount={0}
          clickable={false}
        />
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

export default Form;
export { BaseForm };
