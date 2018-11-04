import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import validateMakeForm from '../lib/validators/validateMakeForm';
import handleInputChange from '../lib/validators/eventHandlers/handleInputChange';
import BSFormGroup from './bootstrap/ResourceForm/BSFormGroup';
import { FaChevronLeft, FaChevronRight, FaMinusCircle, FaEye } from 'react-icons/fa';
import { IconContext } from 'react-icons';
import { 
	Form, 
	FormGroup, 
	Col, 
	FormControl, 
	Button,
	ButtonGroup,
	HelpBlock,
	Modal 
} from 'react-bootstrap/lib';
import '../assets/css/general.scss';

class ResourceForm extends React.Component {

	constructor(props) {

		super(props);

		this.save = props.save;
		this.edit = props.edit;
		this.update = props.update;
		this.nextResource = props.nextResource;
		this.previousResource = props.previousResource;
		this.removeResource = props.removeResource;

		this.history = props.history;

		this.validateMakeForm = validateMakeForm.bind(this);
		this.handleInputChange = handleInputChange.bind(this);
		this.publishBundle = this.publishBundle.bind(this);

		this.resourceTitle = null;
		this.resourceType = null;
		this.resourceURL = null;
		this.resourceNotes = null;
		
		this.state = {
			fields: {},
			errors:{},
			isFieldValid: {},
			isFormValid: false,
			publishBundle: false
		};

	}

	componentDidMount() {

		let fields = {}; 
		let errors = {};
		let isFieldValid = {};
		let isFormValid = false;

		if (this.editResourceStatus || !(this.props.activeBundle['showPreview'])) {

			if (this.resourceTitle.value) {

				fields['resourceTitle'] = this.resourceTitle.value;
				errors['resourceTitle'] = null;
				isFieldValid['resourceTitle'] = true;

			}

			if (this.resourceURL.value) {

				fields['resourceURL'] = this.resourceURL.value;
				errors['resourceURL'] = null;
				isFieldValid['resourceURL'] = true;

			}

			if (this.resourceNotes.value) {

				fields['resourceNotes'] = this.resourceNotes.value;
				errors['resourceNotes'] = null;
				isFieldValid['resourceNotes'] = true;

			}

			if (isFieldValid['resourceURL']) {

				isFormValid = true;

			}

			this.setState({
				fields,
				errors,
				isFieldValid,
				isFormValid
			});

		} 

	}

	defaultValue(activeBundle, field) {

		if (activeBundle.activeResource) {

			return activeBundle.activeResource[field];

		} else {

			return '';
		
		}

	}

	updateState(clearState, activeResource = {}) {

		if (clearState) {

			this.resourceTitle.value = '';
			this.resourceType.value = 'Webpage';
			this.resourceURL.value = '';
			this.resourceNotes.value = '';

			this.setState({
				fields: {},
				errors:{},
				isFieldValid: {},
				isFormValid: false
			});

		} else {

			this.resourceTitle.value = activeResource['title'];
			this.resourceType.value = activeResource['type'];
			this.resourceURL.value = activeResource['url'];
			this.resourceNotes.value = activeResource['notes'];	

			let fields = {}; 
			let errors = {};
			let isFieldValid = {};

			if (this.resourceTitle.value) {

				fields['resourceTitle'] = this.resourceTitle.value;
				errors['resourceTitle'] = null;
				isFieldValid['resourceTitle'] = true;

			}

			if (this.resourceURL.value) {

				fields['resourceURL'] = this.resourceURL.value;
				errors['resourceURL'] = null;
				isFieldValid['resourceURL'] = true;

			}

			if (this.resourceNotes.value) {

				fields['resourceNotes'] = this.resourceNotes.value;
				errors['resourceNotes'] = null;
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

	getFieldValues() {

		return ({
			title: this.resourceTitle.value,
			type: this.resourceType.value,
			url: this.resourceURL.value,
			notes: this.resourceNotes.value
		});

	}

	publishBundle(status) {

		if (status) {

			this.setState({
				publishBundle: true
			});

		} else {

			this.setState({
				publishBundle: false
			});

		}

		
	}

	render() {

		const { errors, isFormValid } = this.state;
		const activeBundle  = this.props.activeBundle;
		const { activeResource,  editActiveResource} = activeBundle;
		const currentResourceId = (activeBundle.activeResourceId) ? ((activeBundle.activeResourceId) + 1) : 1;

		return (
			
			<div id='resourceForm'>

				<div id='beforePublish'>
					<Modal show={ this.state.publishBundle } onHide={ () => this.publishBundle(false) }>
						<Modal.Header closeButton>
							<Modal.Title>Publish Bundle</Modal.Title>
						</Modal.Header>
						<Modal.Body>
							{
								(activeBundle.resources.length == 1) ?
									<h4><b>Are you sure you want to bundle only one resource?</b></h4> :
									<h4><b>{ `Are you sure you want bundle ${activeBundle.resources.length} resources?` }</b></h4>
							}
							{	
								<section>
									<hr />
									<p><b>Note:</b> Once published, you won't be able to edit the bundle again.</p>
								</section>
							}
						</Modal.Body>
						<Modal.Footer>
							<Button
								bsStyle='primary' 
								onClick={ () => this.history.push('/submit') }>
								Yes
							</Button>
							<Button onClick={ () => this.publishBundle(false) }>Wait</Button>
						</Modal.Footer>
					</Modal>
				</div>

				<Form horizontal>

					<FormGroup>
						<Col 
							smOffset={3}
							sm={9}
							lgOffset={2}
							lg={10}>
							<h2 className='createTitle centeredContent'>
								{
									(editActiveResource) ?
										`Editing Resource ${currentResourceId}` :
										(activeResource) ?
										`Resource ${ currentResourceId }` :	
										`Add details for Resource ${ currentResourceId }`
								}
							</h2>
						</Col>
					</FormGroup>

					<BSFormGroup
						controlId={'formHorizontalText'}
						content={'Title:'} 
						className={'inputLabels'}>
						<FormControl
							disabled={ (!(activeResource) || editActiveResource) ? false : true }
							inputRef={ input => this.resourceTitle = input }
							name='resourceTitle'
							type='text' 
							bsSize='large'
							placeholder='Short and descriptive - (Optional)'
							onChange={ event =>
								compose(
									this.handleInputChange(event),
									this.validateMakeForm(event)
								)
							}
							defaultValue={ this.defaultValue(activeBundle, 'title') } />
						<HelpBlock className='inputErrors'>
							{ errors.resourceTitle }
						</HelpBlock>
					</BSFormGroup>

					<BSFormGroup
						controlId={'formHorizontalSelect'}
						content={'Type:'}
						className={'inputLabels'}>
						<FormControl
							disabled={ (!(activeResource) || editActiveResource) ? false : true }
							inputRef={ input => this.resourceType = input }
							name='resourceType' 
							componentClass='select' 
							bsSize='large'
							defaultValue={ this.defaultValue(activeBundle, 'type') } >
							<option value='Webpage'>
								Webpage
							</option>
							<option value='Video'>
								Video
							</option>
							<option value='Document'>
								Document
							</option>
							<option value='Image'>
								Image
							</option>
							<option value='Other'>
								Other
							</option>
						</FormControl>
						<HelpBlock></HelpBlock>
					</BSFormGroup>

					<BSFormGroup
						controlId={'formHorizontalURL'}
						content={'URL:'}
						className={'inputLabels'}>
						<FormControl 
							disabled={ (!(activeResource) || editActiveResource) ? false : true }
							inputRef={ input => this.resourceURL = input }
							name='resourceURL'
							type='url' 
							bsSize='large'
							placeholder='https://example.com/example.html'
							onChange={ event =>
								compose(
									this.handleInputChange(event),
									this.validateMakeForm(event)
								)
							}
							defaultValue={ this.defaultValue(activeBundle, 'url') } />
						<HelpBlock className='inputErrors'>
							{ errors.resourceURL }
						</HelpBlock>
					</BSFormGroup>

					<BSFormGroup
						controlId={'formHorizontalTextArea'}
						content={'Notes:'}
						className={'inputLabels'}>
						<FormControl
							disabled={(!(activeResource) || editActiveResource) ? false : true }
							inputRef={ input =>  this.resourceNotes = input }
							name='resourceNotes' 
							componentClass='textarea' 
							bsSize='large'
							rows='8'
							placeholder='Any instructions or extra information - (Optional)'
							onChange={ event =>
								compose(
									this.handleInputChange(event),
									this.validateMakeForm(event)
								)
							}
							defaultValue={ this.defaultValue(activeBundle, 'notes') } />
						<HelpBlock className='inputErrors'>
							{ errors.resourceNotes }
						</HelpBlock>
					</BSFormGroup>

					<FormGroup>
						<Col 
							sm={3}
							lg={2}>	
						</Col>
						<Col
							sm={9}
							lg={10}>
							{
								(activeBundle.editActiveResource) ?
									<ButtonGroup justified>
										<Button
											bsStyle='danger'
											bsSize='large'
											href='#'
											onClick={ () => this.removeResource(currentResourceId - 1, activeBundle.resources, this.updateState.bind(this)) }>
											<span>
												Remove
												&nbsp;
												<IconContext.Provider value={{ className: 'verticalMiddle' }}>
													<FaMinusCircle />
												</IconContext.Provider>
											</span>
										</Button>
										<Button
											disabled={ !(isFormValid) }
											bsStyle='primary'
											bsSize='large'
											href='#'
											onClick={ () => this.update(currentResourceId - 1, this.getFieldValues()) }>
											Save & Update
										</Button>
									</ButtonGroup> :
									<ButtonGroup justified>
										<Button
											disabled={ (currentResourceId - 1) ? false : true }
											bsStyle='primary'
											bsSize='large'
											href='#'
											onClick={ () => this.previousResource(currentResourceId - 2, activeBundle.resources, this.updateState.bind(this)) }>
											{
												(currentResourceId - 1) ? 
													<span>
														<IconContext.Provider value={{ className: 'verticalMiddle' }}>
															<FaChevronLeft />
														</IconContext.Provider>
														&nbsp;
														{ `Resource ${ currentResourceId - 1 }` }
													</span> :
													<span>
														<IconContext.Provider value={{ className: 'verticalMiddle' }}>
															<FaChevronLeft />
														</IconContext.Provider>
														&nbsp;
														Previous
													</span>
											}
										</Button>
										{
											(activeBundle.activeResource) ?
												<Button
													bsSize='large'
													href='#'
													onClick={ () => this.edit(currentResourceId - 1, activeBundle.resources) }>
													Edit
												</Button> :
												<Button
													disabled={ !(isFormValid) }
													bsStyle='primary'
													bsSize='large'
													href='#'
													onClick={ () => this.save(currentResourceId - 1, this.getFieldValues()) }>
													Save
												</Button>		
										}
										<Button
											disabled={ (activeResource) ? false : true }
											type='submit'
											bsStyle='primary'
											bsSize='large'
											href='#'
											onClick={ () => this.nextResource(currentResourceId, activeBundle.resources, this.updateState.bind(this)) }>
											<span>
												{ `Resource ${ currentResourceId + 1 }` }
												&nbsp;
												<IconContext.Provider value={{ className: 'verticalMiddle' }}>
													<FaChevronRight />
												</IconContext.Provider>
											</span>
										</Button>
									</ButtonGroup>
							}
						</Col>
					</FormGroup>

					<FormGroup>
						<Col 
							sm={3}
							lg={2}>	
						</Col>
						<Col 
							sm={9}
							lg={10}>
							<ButtonGroup justified>
								<Button
									disabled={ (activeBundle.resources.length) ? false : true }
									bsStyle='info'
									bsSize='large'
									href='#'
									onClick={ () => this.history.push('/preview') }>
									<span>
										Preview Bundle
										&nbsp;
										<IconContext.Provider value={{ className: 'verticalMiddle' }}>
											<FaEye />
										</IconContext.Provider>
									</span>
								</Button>
								<Button
									disabled={ (activeBundle.resources.length) ? false : true }
									bsStyle='success'
									bsSize='large'
									href='#'
									onClick={ () => this.publishBundle(true) }>
									Publish Bundle
								</Button>
							</ButtonGroup>
						</Col>
					</FormGroup>

				</Form>

			</div>

		);

	}

}

ResourceForm.propTypes = {

	addResource: PropTypes.func,
	activeResource: PropTypes.object,
	editResource: PropTypes.bool

};

ResourceForm.defaultProps = {

	addResource: f => f,
	activeResource: {},
	editResourceStatus: false

};

export default withRouter(ResourceForm);