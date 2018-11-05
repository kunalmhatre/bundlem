import React from 'react';
import PageTemplate from './templates/PageTemplate';
import '../assets/css/general.scss';
import { FiLoader } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { IconContext } from 'react-icons';
import { Button, ButtonToolbar, Alert } from 'react-bootstrap/lib';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import ReCAPTCHA from 'react-google-recaptcha';
import PropTypes from 'prop-types';

class Submit extends React.Component {
	
	constructor(props) {

		super(props);

		this.history = props.history;
		this.storeBundleAction = props.storeBundleAction;
		this.clearActiveBundleAction = props.clearActiveBundleAction;
		this.activeBundle = props.activeBundle;

		this.verifySpam = this.verifySpam.bind(this);
		this.publishBundle = this.publishBundle.bind(this);

		this.state = {
			loaded: false,
			bundleId: null,
			copied: false,
			spammer: true,
			spamCheckStatusCode: 406
		};

	}

	publishBundle() {

		let finalBundle;

		if (this.activeBundle && !this.state.loaded) {

			finalBundle = {
				name: this.activeBundle.name,
				description: this.activeBundle.description,
				resources: this.activeBundle.resources
			};

			fetch('https://bundlem.herokuapp.com/create', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					bundle: finalBundle	
				})
			}).then(response => {

				if (response.status == 201) {

					return response.json();
				
				} else {
				
					return null;
				
				}
				
			}).then(data => {
				
				if (data) {

					finalBundle['id'] = data.id;

					this.storeBundleAction(data.id, finalBundle);
					
					this.clearActiveBundleAction();

					this.setState({
						loaded: true,
						bundleId: data.id
					});

				} else {

					this.setState({
						loaded: false,
						bundleId: null
					});

				}

			});

		}

	}

	verifySpam(token) {

		fetch('https://bundlem.herokuapp.com/verify', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				token: token	
			})
		}).then(response => {
			
			if (response.status == 200) {

				this.setState({
					spammer: false,
					spamCheckStatusCode: 200
				});

				this.publishBundle();

			} else if (response.status == 406) {

				this.setState({
					spammer: false,
					spamCheckStatusCode: 406
				});

			} else {

				this.setState({
					spammer: false,
					spamCheckStatusCode: 500
				});

			}

		});

	}

	render() {

		const { loaded, bundleId, copied, spammer, spamCheckStatusCode } = this.state;

		return (

			<PageTemplate>

				{
					(this.activeBundle.name) ?
						(spammer) ?
							<section>
								<div className='lightSeparation'>
									<h3 className='createTitle centeredContent'>Are you a robot?</h3>
								</div>
								<div className='flexCenter'>
									<ReCAPTCHA
										sitekey='6LdinngUAAAAAJv63RkqJmFqFh6sbxIlN42ZdFiu'
										onChange={ this.verifySpam } />
								</div>
							</section> :
							(spamCheckStatusCode == 200) ?
								<div 
									id='generateBundleId'
									className='centeredContent'>
									
									<h4 className='lightSeparation'>
										{
											(loaded) ?
												<Alert bsStyle='success'>
													<p className='centeredContent'>
														<b>Congrats, your bundle has been published.</b>
													</p>
												</Alert> :
												<Alert bsStyle='info'>
													<p className='centeredContent'>
														<b>Publishing your bundle, a moment please.</b>
													</p>
												</Alert>
										}
									</h4>
									
									<h3 className='bundleIdHeader'>Bundle ID</h3>

									{
										(loaded) ? 
											<div id='bundleLoaded'>

												<h1 className='bundleId'>
													<Link to={`/bundle/${bundleId}`}>{ bundleId }</Link>
												</h1>

												<CopyToClipboard 
													text={ `https://bundlem.in/#/bundle/${bundleId}` }
													onCopy={ () => this.setState({ copied: true }) }>
													<Button>
													{
														(copied) ? 'Copied' : 'Get Shareable Link'
													}
													</Button>
												</CopyToClipboard>

												<hr />
												
												<div className='centeredContent'>

													<h3 className='bundleIdHeader'>Thank you for using Bundlem</h3>

												</div>

											</div> :
											<IconContext.Provider value={{color: '#296193', size: '3em', className: 'iconSpin'}}>
												<FiLoader />
											</IconContext.Provider>
									}

								</div> :
								(spamCheckStatusCode == 406) ?
									<Alert bsStyle='danger'>
										<p>
											<b>Spam check failed</b>
										</p>
										<p>
											Please report this to us in case it takes too long to resolve.
										</p>
										<hr />
										<ButtonToolbar>
											<Button 
												bsStyle='primary'
												onClick={ () => this.setState({ spammer: true }) }>
												Try again
											</Button>
											<Button 
												bsStyle='danger'
												onClick={ () => window.location = 'https://github.com/kunalmhatre/bundlem/issues/new' }>
												Report
											</Button>
										</ButtonToolbar>
									</Alert> :
									<Alert bsStyle='danger'>
										<p>
											<b>Server error</b>
										</p>
										<p>
											Please report this to us in case it takes too long to resolve. 
										</p>
										<hr />
										<ButtonToolbar>
											<Button 
												bsStyle='primary'
												onClick={ () => this.setState({ spammer: true }) }>
												Try again
											</Button>
											<Button 
												bsStyle='danger'
												onClick={ () => window.location = 'https://github.com/kunalmhatre/bundlem/issues/new' }>
												Report
											</Button>
										</ButtonToolbar>
									</Alert> :
						<div id='noBundle'>

							<p>
								You might want to consider making a bundle first. 
								Please click <Link to='/create'>here</Link> to create a bundle.
							</p>
						
						</div>
				}

			</PageTemplate>

		);

	}

}

Submit.propTypes = {
	storeBundleAction: PropTypes.func.isRequired,
	clearActiveBundleAction: PropTypes.func.isRequired,
	activeBundle: PropTypes.object.isRequired
};

export default Submit;