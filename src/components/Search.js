import React from 'react';
import validator from 'validator';
import PageTemplate from './templates/PageTemplate';
import { Redirect } from 'react-router-dom';
import { compose } from 'redux';
import validateSearchForm from '../lib/validators/validateSearchForm';
import handleInputChange from '../lib/validators/eventHandlers/handleInputChange';

class Search extends React.Component {

	constructor(props) {

		super(props);

		this.history = this.props.history;
		this.validateSearchForm = validateSearchForm.bind(this);
		this.handleInputChange = handleInputChange.bind(this);
		this.state = {
			fields: {},
			errors: {},
			isFormValid: false
		}

	}

	validateForm() {

		let fields = this.state.fields;
		let errors = {};
		let isFormValid = true;

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
		})

		return isFormValid;

	}

	render() {

		const { fields, errors, isFormValid } = this.state;

		return (

			<PageTemplate>
				<center>
					<h1>Enter the Bundle ID</h1>
					<form 
						onSubmit={ (event) => event.preventDefault() }>
						<table>
							<tbody>
								<tr>
									<td>
										<input 
											name='bundleId'
											type='text'
											onChange={ event => 
												compose(
													this.handleInputChange(event),
													this.validateSearchForm()
												) 
											} />
									</td>
								</tr>
								<tr>
									<td>
										{ errors.bundleId }
									</td>
								</tr>
								<tr>
									<td>
										<button 
											disabled={ !(isFormValid) }
											onClick={ () => 
												this.history.push(`/bundle/${fields['bundleId']}`) 
											}>
											Search
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

export default Search;