import validator from 'validator';

function validateMakeForm(event) {

	let fields = this.state.fields;
	let errors = this.state.errors;
	let isFieldValid = this.state.isFieldValid;
	let isFormValid = false;

	switch(event.target.name) {

		case 'resourceTitle':

			fields['resourceTitle'] = fields['resourceTitle'].trim();

			if (fields['resourceTitle'] &&
				!(validator.isLength(
					fields['resourceTitle'], 
					{min: 1, max: 120}
				))) {

				isFieldValid['resourceTitle'] = false;
				errors['resourceTitle'] = 'Title can be of 120 characters at max'

			} else {

				isFieldValid['resourceTitle'] = true;
				errors['resourceTitle'] = null;

			}

			break;

		case 'resourceURL':

			fields['resourceURL'] = fields['resourceURL'].trim();

			if (!fields['resourceURL']) {

				isFieldValid['resourceURL'] = false;
				errors['resourceURL'] = null;

			} else if (!validator.isURL(fields['resourceURL'], {require_protocol: true})) {

				isFieldValid['resourceURL'] = false;
				errors['resourceURL'] = 'Please provide a full and valid URL (e.g. https://example.com)';

			} else {

				isFieldValid['resourceURL'] = true;
				errors['resourceURL'] = null;

			}

			break;

		case 'resourceNotes':

			fields['resourceNotes'] = fields['resourceNotes'].trim();

			if (fields['resourceNotes'] &&
				!(validator.isLength(
					fields['resourceNotes'], 
					{min: 1, max: 1024}
				))) {

				isFieldValid['resourceNotes'] = false;
				errors['resourceNotes'] = 'Resource Notes can be of 1024 characters at max'

			} else {

				isFieldValid['resourceNotes'] = true;
				errors['resourceNotes'] = null;

			}

			break;
 
		default:

			break;

	}

	if (isFieldValid.resourceURL) {

		isFormValid = true;

		if (fields['resourceTitle']) {

			isFormValid = isFormValid && isFieldValid.resourceTitle;

		} 

		if (fields['resourceNotes']) {

			isFormValid = isFormValid && isFieldValid.resourceNotes;

		}

	}

	this.setState({
		errors,
		isFieldValid,
		isFormValid
	});

	return isFormValid;

}

export default validateMakeForm;