import React from 'react';
import PropTypes from 'prop-types';
import PageTemplate from './templates/PageTemplate';
import '../assets/css/general.scss';
import { FiLoader } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { IconContext } from 'react-icons';
import { Well, Button, ButtonToolbar, Alert } from 'react-bootstrap/lib';
import {CopyToClipboard} from 'react-copy-to-clipboard';

class Submit extends React.Component {
	
	constructor(props) {

		super(props);

		this.history = props.history;
		this.storeBundleAction = props.storeBundleAction;
		this.clearActiveBundleAction = props.clearActiveBundleAction;
		this.activeBundle = props.activeBundle;
		this.state = {
			loaded: false,
			bundleId: null,
			copied: false
		}

	}

	componentDidMount() {

		let finalBundle;

		if (this.activeBundle && !this.state.loaded) {

			finalBundle = {
				name: this.activeBundle.name,
				description: this.activeBundle.description,
				resources: this.activeBundle.resources
			}

			fetch('https://bundlem.herokuapp.com/create', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					bundle: finalBundle	
				})
			})
			.then(response => {

				if (response.status == 201) {

					return response.json()
				
				} else {
				
					return null;
				
				}
				
			})
			.then(data => {
				
				if (data) {

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

	render() {

		const { loaded, bundleId, copied } = this.state;

		return (

			<PageTemplate bundleName={ this.activeBundle.name }>
				{
					(this.activeBundle.name) ?
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
											text={ bundleId }
											onCopy={ () => this.setState({ copied: true }) }>
											<Button>
											{
												(copied) ? 'Copied' : 'Copy'
											}
											</Button>
										</CopyToClipboard>
										<hr />
										<div 
											id='nextActions'
											className='centeredContent'>
											<ButtonToolbar className='flexCenter'>
												<Button 
													bsStyle='primary'
													onClick={() => this.history.push('/create')}>
													New Bundle
												</Button>
												<Button 
													bsStyle='primary'
													onClick={() => this.history.push('/search')}>
													Search Bundle
												</Button>
											</ButtonToolbar>
										</div>
									</div> :
									<IconContext.Provider value={{color: '#296193', size: '3em', className: 'icon-spin'}}>
										<FiLoader />
									</IconContext.Provider>
							}
						</div> :
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

export default Submit;