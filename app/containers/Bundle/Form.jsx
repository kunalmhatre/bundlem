import React from 'react';
import { withFormik } from 'formik';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { Icon } from 'antd';
import * as yup from 'yup';

import fetchBundle from './services';
import messages from './messages';
import Button from '../../components/Button';
import Input from '../../components/Input';

const propsTypes = {
  setBundle: PropTypes.func.isRequired,
};

/**
 * Form for Bundle page
 * @param {function} setBundle - Redux action to store the bundle
 */
function BaseForm({
  /* eslint-disable react/prop-types */ // formik props
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting,
  /* eslint-disable no-unused-vars */ // used in handleSubmit function passed to withFormik
  setBundle,
}) {
  return (
    <div className="bundle-search-form theme-blue">
      <div className="bundle-search-form-title">
        <FormattedMessage {...messages.searchBundle} />
        {
          isSubmitting ? (
            <Icon className="theme-blue" type="loading" />
          ) : null
        }
      </div>
      <form onSubmit={handleSubmit}>
        <Input
          id="bundle-id"
          name="bundleID"
          label={messages.bundleIDInputLabel}
          placeholder={messages.bundleIDInputPlaceholder}
          value={values.bundleID}
          onChange={handleChange}
          onBlur={handleBlur}
          showError={!!(touched.bundleID && errors.bundleID)}
          errorMessage={messages[errors.bundleID]}
        />
        <Button
          text={messages.view}
          onClick={handleSubmit}
          size="block"
          className="bundle-search-form-button"
          disabled={isSubmitting}
        />
      </form>
    </div>
  );
}

BaseForm.propsTypes = propsTypes;

const Form = withFormik({
  mapPropsToValues({ bundleID }) {
    return {
      bundleID: bundleID || '',
    };
  },
  validationSchema: yup.object().shape({
    bundleID: yup
      .string()
      .matches(/^\d+$/, 'errorBundleIDInvalid')
      .required('errorBundleIDEmpty'),
  }),
  handleSubmit: async (values, {
    props,
    setFieldError,
    setSubmitting,
    resetForm,
  }) => {
    const callResult = await fetchBundle(values.bundleID);

    if (!callResult.isFailed) {
      resetForm();
      props.setBundle(callResult.data.bundle);
    } else {
      setSubmitting(false);
      setFieldError('bundleID', callResult.errorCode);
    }
  },
})(BaseForm);

export default Form;
