import React from 'react';
import PropTypes from 'prop-types';
import validator from 'validator';
import { compose } from 'redux';
import validateMakeForm from '../lib/validators/validateMakeForm';
import handleInputChange from '../lib/validators/eventHandlers/handleInputChange';

class ResourceForm extends React.Component {

	constructor(props) {

		super(props);

		this.addResource = props.addResource;
		this.activeResource = props.activeResource;
		this.editResourceStatus = props.editResourceStatus;
		this.validateMakeForm = validateMakeForm.bind(this);
		this.handleInputChange = handleInputChange.bind(this);
		this.resourceTitle = React.createRef();
		this.resourceType = React.createRef();
		this.resourceURL = React.createRef();
		this.resourceNotes = React.createRef();
		this.state = {
			fields: {},
			errors:{},
			isFieldValid: {},
			isFormValid: false
		}

	}

	static propTypes = {

		addResource: PropTypes.func,
		activeResource: PropTypes.object,
		editResource: PropTypes.bool

	}

	static defaultProps = {

		addResource: f => f,
		activeResource: {},
		editResourceStatus: false

	}

	componentDidMount() {

		let fields = {}; 
		let errors = {};
		let isFieldValid = {};

		if (this.editResourceStatus) {

			if (this.resourceTitle.current.value) {

				fields['resourceTitle'] = this.resourceTitle.current.value;
				errors['resourceTitle'] = null
				isFieldValid['resourceTitle'] = true;

			}

			if (this.resourceURL.current.value) {

				fields['resourceURL'] = this.resourceURL.current.value;
				errors['resourceURL'] = null
				isFieldValid['resourceURL'] = true;

			}

			if (this.resourceNotes.current.value) {

				fields['resourceNotes'] = this.resourceNotes.current.value;
				errors['resourceNotes'] = null
				isFieldValid['resourceNotes'] = true;

			}

			this.setState({
				fields,
				errors,
				isFieldValid,
				isFormValid: true
			});

		} 



	}

	render() {

		const { fields, errors, isFormValid } = this.state;

		return (

			<div id='form'>
				<form>
					<table>
						<tbody>
							<tr>
								<td>
									<label 
										htmlFor='resourceTitle'>
										Title:
									</label>
								</td>
								<td>
									<input
										ref={ this.resourceTitle } 
										id='resourceTitle'
										name='resourceTitle' 
										type='text'
										onChange={ event =>
											compose(
												this.handleInputChange(event),
												this.validateMakeForm(event)
											)
										}
										defaultValue={ 'title' in this.activeResource ? this.activeResource.title : '' } />
								</td>
								<td>
									{ errors.resourceTitle }
								</td>
							</tr>
							<tr>
								<td>
									<label 
										htmlFor='resourceType'>
										Type:
									</label>
								</td>
								<td>
									<select 
										ref={ this.resourceType }
										id='resourceType'
										name='resourceType'
										defaultValue={ 'type' in this.activeResource ? this.activeResource.type : '' } >
										<option 
											value='Webpage'>
											Webpage</option>
										<option 
											value='Video'>
											Video</option>

										<option 
											value='Document'>
											Document</option>

										<option 
											value='Image'>
											Image</option>

										<option
											value='Other'>
											Other</option>
									</select>
								</td>
							</tr>
							<tr>
								<td>
									<label 
										htmlFor='resourceURL'>
										URL:
									</label>
								</td>
								<td>
									<input
										ref={ this.resourceURL } 
										id='resourceURL'
										name='resourceURL' 
										type='text'
										onChange={ event =>
											compose(
												this.handleInputChange(event),
												this.validateMakeForm(event)
											)
										}
										defaultValue={ 'url' in this.activeResource ? this.activeResource.url : '' } />
								</td>
								<td>
									{ errors.resourceURL }
								</td>
							</tr>
							<tr>
								<td>
									<label 
										htmlFor='resourceNotes'>
										Notes:
									</label>
								</td>
								<td>
									<textarea
										ref={ this.resourceNotes }
										id='resourceNotes'
										name='resourceNotes' 
										type='text'
										onChange={ event =>
											compose(
												this.handleInputChange(event),
												this.validateMakeForm(event)
											)
										}
										defaultValue={ 'notes' in this.activeResource ? this.activeResource.notes : '' }
										style={{
											padding: "0.5em",
											width: '100%',
											WebkitBoxSizing: 'border-box',
											MozBoxSizing: 'border-box',
											BoxSizing: 'border-box'
										}} />
								</td>
								<td>
									{ errors.resourceNotes }
								</td>
							</tr>
							<tr>
								<td></td>
								<td>
									<button 
										disabled={ !(isFormValid) } 
										onClick={ () => this.addResource({
											title: fields.resourceTitle,
											type: this.resourceType.current.value,
											url: fields.resourceURL,
											notes: fields.resourceNotes
										}) }>
										Save
									</button>
								</td>
							</tr>
						</tbody>
					</table>
				</form>
			</div>

		);

	}

}

export default ResourceForm;