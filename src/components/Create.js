import React from 'react';
import PropTypes from 'prop-types';
import PageTemplate from './templates/PageTemplate';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import validator from 'validator';
import validateCreateForm from '../lib/validators/validateCreateForm';
import handleInputChange from '../lib/validators/eventHandlers/handleInputChange';

class Create extends React.Component {

	constructor(props) {

		super(props);

		this.history = this.props.history; 
		this.startBundleAction = this.props.startBundleAction; 
		this.validateCreateForm = validateCreateForm.bind(this);
		this.handleInputChange = handleInputChange.bind(this);
		this.state = {
			fields: {},
			errors: {},
			isFieldValid: {},
			isFormValid: false
		}

	}

	render() {

		const { fields, errors, isFormValid } = this.state;

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
													this.handleInputChange(event),
													this.validateCreateForm(event)
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
													this.handleInputChange(event),
													this.validateCreateForm(event)
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
													this.startBundleAction(
														fields.bundleName,
														fields.bundleDescription
													),
													this.history.push('/make')
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