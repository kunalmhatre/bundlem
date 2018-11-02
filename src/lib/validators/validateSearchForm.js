import validator from 'validator';

function validateSearchForm() {

	let fields = this.state.fields;
	let errors = {};
	let isFormValid = true;

	fields['bundleId'] = fields['bundleId'].trim();

	if (!fields['bundleId']) {

		isFormValid = false;
		errors['bundleId'] = 'Please enter the Bundle ID';

	} else if (!validator.isNumeric(fields['bundleId'])) {

		isFormValid = false;
		errors['bundleId'] = 'Please enter valid Bundle ID';

	} 

	this.setState({
		errors,
		isFormValid
	});

	return isFormValid;

}

export default validateSearchForm;