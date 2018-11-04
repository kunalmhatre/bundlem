import React from 'react';
import validator from 'validator';
import PageTemplate from './templates/PageTemplate';
import { compose } from 'redux';
import validateSearchForm from '../lib/validators/validateSearchForm';
import handleInputChange from '../lib/validators/eventHandlers/handleInputChange';
import '../assets/css/general.scss';
import { Form, FormControl, FormGroup, Col, HelpBlock, Button } from 'react-bootstrap/lib';
import { FaSearch } from 'react-icons/fa';
import { IconContext } from 'react-icons';

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
		};

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
		});

		return isFormValid;

	}

	render() {

		const { fields, errors, isFormValid } = this.state;

		return (

			<PageTemplate>
				<div id='search'>
					<Form horizontal>

						<FormGroup>
							<Col>
								<h2 className='centeredContent searchBundleTitle'>
									Enter the Bundle ID
								</h2>
							</Col>
						</FormGroup>

						<FormGroup controlId='bundleId'>
							<Col sm={3}></Col> 
							<Col sm={6}>
								<FormControl 
									name='bundleId'
									type='text' 
									bsSize='large'
									className='centeredContent'
									onChange={ event => compose(
											this.handleInputChange(event),
											this.validateSearchForm()
										) 
									} />
								<HelpBlock className='inputErrors centeredContent'>
									{ errors.bundleId }
								</HelpBlock>
							</Col>
							<Col sm={3}></Col>
						</FormGroup>

						<FormGroup>
							<Col className='centeredContent'>
								<Button
									disabled={ !(isFormValid) }
									bsStyle='primary'
									bsSize='large'
									onClick={ () =>
										this.history.push(`/bundle/${fields['bundleId']}`)
									}>
									<span>
										<IconContext.Provider value={{ className: 'verticalMiddle' }}>
											<FaSearch />
										</IconContext.Provider>
										&nbsp;
										Search
									</span>
								</Button>
							</Col>
						</FormGroup>

					</Form>
				</div>
			</PageTemplate>


		);

	}

}					

export default Search;