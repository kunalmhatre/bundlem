import React from 'react';
import PropTypes from 'prop-types';
import PageTemplate from './templates/PageTemplate';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import validator from 'validator';
import validateCreateForm from '../lib/validators/validateCreateForm';
import handleInputChange from '../lib/validators/eventHandlers/handleInputChange';
import { 
	Form, 
	FormGroup, 
	Col, 
	FormControl, 
	Button, 
	ControlLabel,
	Grid,
	Row,
	HelpBlock 
} from 'react-bootstrap/lib';
import '../assets/css/general.scss';


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

	componentWillMount() {

		let fields = {}, errors = {}, isFieldValid = {};
		let isFormValid = false;

		if (this.props.activeBundle.name) {

			fields['bundleName'] = this.props.activeBundle.name;
			errors['bundleName'] = null;
			isFieldValid['bundleName'] = true;
			isFormValid = true;

		}

		if (this.props.activeBundle.description) {

			fields['bundleDescription'] = this.props.activeBundle.description;
			errors['bundleDescription'] = null;
			isFieldValid['bundleDescription'] = true;

		}

		this.setState({
			fields,
			errors,
			isFieldValid,
			isFormValid
		});

	}

	render() {

		const { fields, errors, isFormValid } = this.state;
		const activeBundle = this.props.activeBundle;

		return (

			<PageTemplate>

				<div id='createForm'>

					<Form horizontal>

						<FormGroup>
							<Col 
								smOffset={3} 
								sm={9}
								lgOffset={2}
								lg={10}>
								<h2 className='centeredContent createTitle'>
									Give a cool name for your Bundle!
								</h2>
							</Col>
						</FormGroup>

						<FormGroup controlId='bundleName'>
							<Col 
								sm={3}
								lg={2}
								componentClass={ControlLabel} 
								className='inputLabels'>
								Name:
							</Col>
							<Col 
								sm={9}
								lg={10}>
								<FormControl 
									name='bundleName'
									type='text' 
									bsSize='large'
									placeholder='React - Security Best Practices'
									defaultValue={ activeBundle.name }
									onChange={ event => 
										compose(
											this.handleInputChange(event),
											this.validateCreateForm(event)
										)
									}/>
								<HelpBlock className='inputErrors'>
									{ errors.bundleName }
								</HelpBlock>
							</Col>
						</FormGroup>

						<FormGroup controlId='bundleDescription'>
							<Col 
								sm={3}
								lg={2}
								componentClass={ControlLabel} 
								className='inputLabels'>
								Description:
							</Col>
							<Col 
								sm={9}
								lg={10}>
								<FormControl
									name='bundleDescription' 
									componentClass='textarea' 
									bsSize='large'
									rows='8'
									placeholder='Optional - but if provided does wonders.'
									defaultValue={ activeBundle.description }
									onChange={ event => 
										compose(
											this.handleInputChange(event),
											this.validateCreateForm(event)
										)
									} />
								<HelpBlock className='inputErrors'>
									{ errors.bundleDescription }
								</HelpBlock>
							</Col>
						</FormGroup>

						<FormGroup>
							<Col
								smOffset={3}
								sm={9}
								lgOffset={2}
								lg={10}>
								<Button
									bsStyle='primary'
									bsSize='large'
									className='floatRight'
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
								</Button>
							</Col>
						</FormGroup>

					</Form>

				</div>

			</PageTemplate>

		);

	}

}

export default Create;