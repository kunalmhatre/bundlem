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

		/*fetch('URL', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json; charset=utf-8'
			},
			body: JSON.stringify(this.activeBundle)
		})
		.then(response => response.json())
		.then(data => {
			this.setState({
				loaded: true,
				bundleId: data.bundleId
			});
		});*/

	}

	render() {

		console.log(this.location.state.activeBundle);
		const { loaded, bundleId } = this.state;
		const name = (this.location.state) ? this.location.state.activeBundle.name : null;

		return (

			<PageTemplate bundleName={ name }>
				{
					(this.location.state) ?
						<center>
							<p>Done, your Bundle is ready to be shared.</p>
							<h3>Bundle ID</h3>
							{
								(loaded) ? 
									<div
										id='bundleId'>
										bundleId
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