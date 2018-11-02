import validator from 'validator';

function validateCreateForm(event) {

	let fields = this.state.fields;
	let errors = this.state.errors;
	let isFieldValid = this.state.isFieldValid;
	let isFormValid = false;

	switch(event.target.name) {

		case 'bundleName':

			fields['bundleName'] = fields['bundleName'].trim();			

			if (!fields['bundleName']) {

				isFieldValid['bundleName'] = false;
				errors['bundleName'] = null;

			} else if (!validator.isLength(fields['bundleName'], {min: 1, max: 120})) {

				isFieldValid['bundleName'] = false;
				errors['bundleName'] = `Bundle's name can be of 120 characters at max`;

			} else {

				isFieldValid['bundleName'] = true;
				errors['bundleName'] = null;

			}

			break;

		case 'bundleDescription':

			fields['bundleDescription'] = fields['bundleDescription'].trim();			

			if (fields['bundleDescription'] &&
				!(validator.isLength(
					fields['bundleDescription'], 
					{min: 1, max: 320}
				))) {

				isFieldValid['bundleDescription'] = false;
				errors['bundleDescription'] = `Bundle's description can be of 320 characters at max`

			} else {

				isFieldValid['bundleDescription'] = true;
				errors['bundleDescription'] = null;

			}

			break;

		default:

			break;

	}

	if (isFieldValid.bundleName) {

		isFormValid = true;

		if (fields['bundleDescription']) {

			isFormValid = isFormValid && isFieldValid.bundleDescription;

		}
	
	} 

	this.setState({
		errors,
		isFieldValid,
		isFormValid
	});

	return isFormValid;

}

export default validateCreateForm;