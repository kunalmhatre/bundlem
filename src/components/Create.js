import React from 'react';
import PropTypes from 'prop-types';
import PageTemplate from './templates/PageTemplate';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import validator from 'validator';

class Create extends React.Component {

	constructor(props) {

		super(props);

		this.state = {
			fields: {},
			errors: {},
			isFieldValid: {},
			isFormValid: false
		}

	}

	handleChange(event) {

		let fields = this.state.fields;

		fields[event.target.name] = event.target.value;

		this.setState({
			fields
		});

	}

	validateForm(event) {

		let fields = this.state.fields;
		let isFieldValid = this.state.isFieldValid;
		let errors = this.state.errors;
		let isFormValid = false;

		switch(event.target.name) {

			case 'bundleName':

				if (!fields['bundleName']) {

					isFieldValid['bundleName'] = false;
					errors['bundleName'] = 'Please enter the Bundle Name';

				} else if (!validator.isLength(fields['bundleName'], {min: 1, max: 120})) {

					isFieldValid['bundleName'] = false;
					errors['bundleName'] = 'Bundle Name can be of 120 characters at max';

				} else {

					isFieldValid['bundleName'] = true;
					errors['bundleName'] = null;

				}

				break;

			case 'bundleDescription':

				if (!fields['bundleDescription']) {

					isFieldValid['bundleDescription'] = false;
					errors['bundleDescription'] = 'Please enter the Bundle Description';

				} else if (!validator.isLength(fields['bundleDescription'], {min: 1, max: 320})) {

					isFieldValid['bundleDescription'] = false;
					errors['bundleDescription'] = 'Bundle Description can be of 320 characters at max';			

				} else {

					isFieldValid['bundleDescription'] = true;
					errors['bundleDescription'] = null;

				}

				break;

			default:

				return false;

		}

		if (isFieldValid.bundleName && isFieldValid.bundleDescription) {

			isFormValid = true;
		
		} else {

			isFormValid = false;
		
		}

		this.setState({
			errors,
			isFieldValid,
			isFormValid
		})

		return isFormValid;

	}

	render() {

		const { fields, errors, isFormValid } = this.state;
		const history = this.props.history;
		const handleChange = this.handleChange.bind(this);
		const validateForm = this.validateForm.bind(this);
		const startBundleAction = this.props.startBundleAction; 

		return (

			<PageTemplate>
				<center>
					<form>
						<table>
							<tbody>
								<tr>
									<td>
										<label 
											htmlFor='bundleName'>
											Bundle Name:
										</label>
									</td>
									<td>
										<input 
											id='bundleName'
											name='bundleName' 
											type='text'
											onChange={ event =>
												compose(
													handleChange(event),
													validateForm(event)
												)
											} />
									</td>
								</tr>
								<tr>
									<td>
										{ errors.bundleName }
									</td>
								</tr>
								<tr>
									<td 
										valign='top'>
										<label 
											htmlFor='bundleDescription'>
											Description:
										</label>
									</td>
									<td>
										<textarea
											id='bundleDescription'
											name='bundleDescription' 
											type='text'
											onChange={ event => 
												compose(
													handleChange(event),
													validateForm(event)
												)
											}
											style={{
												padding: "0.5em",
												width: '100%',
												'WebkitBoxSizing': 'border-box',
												'MozBoxSizing': 'border-box',
												'BoxSizing': 'border-box'
											}} 
										/>
									</td>
								</tr>
								<tr>
									<td>
										{ errors.bundleDescription }
									</td>
								</tr>
								<tr>
									<td></td>
									<td 
										align='right'>
										<button 
											disabled={ !(isFormValid) }
											onClick={ () => 
												compose(
													startBundleAction(
														fields.bundleName,
														fields.bundleDescription
													),
													history.push('/make')
												)
											}>
											Next
										</button>
									</td>
								</tr>
							</tbody>
						</table>
					</form>
				</center>
			</PageTemplate>

		);

	}

}

export default Create;