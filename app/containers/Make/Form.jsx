import React from 'react';
import { withFormik } from 'formik';
import PropTypes from 'prop-types';
import * as yup from 'yup';
import { Row, Col } from 'antd';

import messages from './messages';
import Button from '../../components/Button';
import Input from '../../components/Input';
import RadioInput from '../../components/RadioInput';

const formikValuesPropType = PropTypes.shape({
  resourceType: PropTypes.string,
  link: PropTypes.string,
  title: PropTypes.string,
  notes: PropTypes.string,
});

const propTypes = {
  values: formikValuesPropType.isRequired,
  errors: formikValuesPropType.isRequired,
  touched: PropTypes.shape({
    resourceType: PropTypes.bool,
    link: PropTypes.bool,
    title: PropTypes.bool,
    notes: PropTypes.bool,
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  isValid: PropTypes.bool.isRequired,
  currentResource: PropTypes.number,
  nextResource: PropTypes.func,
  previousResource: PropTypes.func,
  removeResource: PropTypes.func,
  isAddedResource: PropTypes.bool,
};

const defaultProps = {
  currentResource: 0,
  nextResource: () => null,
  previousResource: () => null,
  removeResource: () => null,
  isAddedResource: false,
};

/**
 * Form for Make page
 * @param {object} values - By Formik HOC (contains values for the input fields)
 * @param {object} errors - By Formik HOC (contains errors for the input fields)
 * @param {object} touched - By Formik HOC (states whether specific input field was touched)
 * @param {function} handleChange - By Formik HOC (on change handler function)
 * @param {function} handleBlur - By Formik HOC (on blur handler function)
 * @param {boolean} isValid - By Formik HOC (states whether form is valid for submission)
 * @param {number} [currentResource=0] - Current resource number
 * @param {function} nextResource - Function for traversing to next resource
 * @param {function} previousResource - Function for traversing to previous resource
 * @param {function} removeResource - Function to remove current resource
 * @param {boolean} [isAddedResource=false] - States whether the current resource is already added
 */
function BaseForm({
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  isValid,
  currentResource,
  nextResource,
  previousResource,
  removeResource,
  isAddedResource,
}) {
  const responsiveResourceButton = {
    xs: 6,
    sm: 6,
    md: 5,
    lg: 5,
    xl: 6,
    xxl: 5,
  };
  const responsiveRemoveButton = {
    xs: 8,
    sm: 8,
    md: 12,
    lg: 12,
    xl: 10,
    xxl: 12,
  };

  return (
    <form>
      <RadioInput
        name="resourceType"
        items={[
          messages.typeInput1,
          messages.typeInput2,
          messages.typeInput3,
          messages.typeInput4,
          messages.typeInput5,
        ]}
        label={messages.typeInputLabel}
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.resourceType}
        showError={!!errors.resourceType}
        errorMessage={messages[errors.resourceType]}
      />
      <Input
        id="link"
        name="link"
        label={messages.linkInputLabel}
        placeholder={messages.linkInputPlaceholder}
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.link}
        showError={!!(touched.link && errors.link)}
        errorMessage={messages[errors.link]}
      />
      <Input
        id="title"
        name="title"
        label={messages.titleInputLabel}
        placeholder={messages.titleInputPlaceholder}
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.title}
        showError={!!(touched.title && errors.title)}
        errorMessage={messages[errors.title]}
      />
      <Input
        id="notes"
        name="notes"
        label={messages.notesInputLabel}
        placeholder={messages.notesInputPlaceholder}
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.notes}
        showError={!!errors.notes}
        errorMessage={messages[errors.notes]}
      />
      <Row
        type="flex"
        justify="space-between"
        align="middle"
        className="make-button-group"
      >
        <Col {...responsiveResourceButton}>
          {
            currentResource > 0 ? (
              <Button
                className="test"
                text={messages.resource}
                extraText={` ${currentResource}`}
                onClick={() => previousResource({
                  resourceType: values.resourceType,
                  link: values.link.trim(),
                  title: values.title.trim(),
                  notes: values.notes.trim(),
                })}
                size="block"
              />
            ) : null
          }
        </Col>
        <Col {...responsiveRemoveButton}>
          {
            isAddedResource ? (
              <Button
                text={messages.removeButton}
                highlight={false}
                size="block"
                onClick={() => removeResource(currentResource)}
              />
            ) : null
          }
        </Col>
        <Col {...responsiveResourceButton}>
          <Button
            className="make-next-resource-button"
            text={messages.resource}
            extraText={` ${currentResource + 2}`}
            disabled={!isValid}
            onClick={() => nextResource({
              resourceType: values.resourceType,
              link: values.link.trim(),
              title: values.title.trim(),
              notes: values.notes.trim(),
            })}
            size="block"
          />
        </Col>
      </Row>
    </form>
  );
}

BaseForm.propTypes = propTypes;
BaseForm.defaultProps = defaultProps;

const Form = withFormik({
  enableReinitialize: true,
  mapPropsToValues({
    resourceType,
    link,
    title,
    notes,
  }) {
    return {
      resourceType: resourceType || '',
      link: link || '',
      title: title || '',
      notes: notes || '',
    };
  },
  validationSchema: yup.object().shape({
    resourceType: yup
      .mixed()
      .oneOf([
        'WEB PAGE',
        'VIDEO',
        'DOCUMENT',
        'IMAGE',
        'OTHER',
      ])
      .required('errorTypeInputEmpty'),
    link: yup
      .string()
      .url('errorLinkInputInvalid')
      .required('errorLinkInputEmpty'),
    title: yup
      .string()
      .max(120, 'errorTitleInputLength'),
    notes: yup
      .string()
      .max(1024, 'errorNotesInputLength'),
  }),
  isInitialValid({ resourceType, link }) {
    return !!(resourceType && link);
  },
})(BaseForm);

export default Form;
