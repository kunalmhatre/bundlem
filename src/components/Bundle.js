import React from 'react';
import PageTemplate from './templates/PageTemplate';
import { FiLoader } from 'react-icons/fi';
import { IconContext } from 'react-icons';
import { Alert, Button, ButtonToolbar } from 'react-bootstrap/lib';
import ResourceDetails from './ResourceDetails';
import '../assets/css/general.scss';

class Bundle extends React.Component {

	constructor(props) {
		
		super(props);

		this.history = props.history;
		this.bundles = props.bundles;
		this.storeBundleAction = props.storeBundleAction;
		this.bundleId = props.match.params.bundleId;
		this.state = {
			loaded: false,
			bundle: null,
			status: null
		}

	}

	componentDidMount() {

		if (this.bundles[this.bundleId]) {

			this.setState({
				loaded: true,
				bundle: this.bundles[this.bundleId],
				status: 200
			});

		} else {

			fetch(`https://bundlem.herokuapp.com/bundle/${this.bundleId}`)
				.then(response => {

					if (response.status == 200) {

						return response.json();
					
					} else if (response.status == 404) {
						
						this.setState({
							loaded: true,
							bundle: null,
							status: '404'
						});
					
					} else if (response.status == 400) {

						this.setState({
							loaded: true,
							bundle: null,
							status: 400
						});
					
					} else {

						this.setState({
							loaded: true,
							bundle: null,
							status: 500
						});

					}

				})
				.then(data => {

					this.storeBundleAction(this.bundleId, data.bundle);

					this.setState({
						loaded: true,
						bundle: data.bundle,
						status: 200
					});

				})

		}

	}

	render() {

		const { loaded, bundle, status } = this.state;

		return (

			<PageTemplate bundleName={ (bundle) ? bundle.name : null }>
			{
				!(loaded) ?
					<div className='centeredContent lightSeparation'>
						<IconContext.Provider value={{color: '#296193', size: '3em', className: 'icon-spin'}}>
							<FiLoader />
						</IconContext.Provider>
					</div> :
					(status == 200) ?
						<ResourceDetails activeBundle={bundle} /> :
						(status == 404) ?
							<Alert bsStyle='danger'>
								<p>
									<b>Bundle not found</b>
								</p>
								<p>
									Sorry, there exists no bundle with the specified Bundle ID. 
								</p>
								<p>
									<Button
										bsStyle='primary' 
										onClick={() => this.history.push('/search')}>
										Try again
									</Button>
								</p>
							</Alert> : 
							(status == 400) ?
								<Alert bsStyle='danger'>
									<p>
										<b>Invalid request</b>
									</p>
									<p>
										Please provide a valid Bundle ID. 
									</p>
									<p>
										<Button
											bsStyle='primary' 
											onClick={() => this.history.push('/search')}>
											Try again
										</Button>
									</p>
								</Alert> :
								<Alert bsStyle='danger'>
									<p>
										<b>Server got in trouble</b>
									</p>
									<p>
										Please report this to us in case it takes too long to resolve. 
									</p>
									<p>	
										<a href='https://github.com/kunalmhatre/bundlem/issues/new'>
											<Button bsStyle='danger'>
												Report
											</Button>
										</a>
									</p>
								</Alert>

			}
			{	
				/*<section>
					<hr />
					<div 
						id='nextActions'
						className='centeredContent'>
						<ButtonToolbar className='flexCenter'>
							<Button 
								bsStyle='primary'
								onClick={() => this.history.push('/create')}>
								Create Bundle
							</Button>
							<Button 
								bsStyle='primary'
								onClick={() => this.history.push('/search')}>
								Search Bundle
							</Button>
						</ButtonToolbar>
					</div>
				</section>*/
			}
			</PageTemplate>

		);

	}

}

export default Bundle;