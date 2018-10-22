import React from 'react';
import PageTemplate from './templates/PageTemplate';

class Bundle extends React.Component {

	constructor(props) {
		
		super(props);

		this.bundleId = props.match.bundleId;
		this.state = {
			loaded: false,
			bundle: {}
		}

	}

	componentDidMount() {

		fetch(`URL${this.bundleId}`)
			.then(response => {

				if (response.status == 200) {

					return response.json();
				
				} else if (response.status == 404) {
					
					throw new Error('Bundle not found');
				
				} else {

					throw new Error('Server error');
				
				}

			})
			.then(data => bundle = data)
			.catch(error => alert(error));

	}

	render() {

		const { loaded, bundle } = this.state;

		return (

			<PageTemplate bundleName={ (loaded) ? bundle.name : null }>
				
			</PageTemplate>

		);

	}

}

export default Bundle;