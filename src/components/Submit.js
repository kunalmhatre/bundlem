import React from 'react';
import PropTypes from 'prop-types';
import PageTemplate from './templates/PageTemplate';

class Submit extends React.Component {
	
	constructor(props) {

		super(props);

		this.location = props.location;
		this.state = {
			loaded: false,
			bundleId: null
		}

	}

	static propTypes = {

		location: PropTypes.object

	}

	static defaultProps = {

		location: {}

	}

	componentDidMount() {

		if (this.location.state && !this.state.loaded) {

			fetch('http://localhost:1337/create', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					bundle: this.location.state.activeBundle	
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

		const { loaded, bundleId } = this.state;
		const name = (this.location.state) ? this.location.state.activeBundle.name : null;

		return (

			<PageTemplate bundleName={ name }>
				{
					(this.location.state) ?
						<center>
							<p>Done, your Bundle is getting ready to be shared.</p>
							<h3>Bundle ID</h3>
							{
								(loaded) ? 
									<div
										id='bundleId'>
										{
											bundleId
										}
									</div> :
									<i>
										Generating...
									</i>
							}
						</center> :
						<center>
							<p>You might want to consider making a bundle first.</p>
						</center>
				}
			</PageTemplate>

		);

	}

}

export default Submit;