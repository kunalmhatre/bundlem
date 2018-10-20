import React from 'react';
import PropTypes from 'prop-types';
import PageTemplate from './templates/PageTemplate';
import ResourceForm from './ResourceForm';
import ResourceDetails from './ResourceDetails';
import { Link } from 'react-router-dom'

const Make = ({ activeBundle = {}, ...actions }) => {
	
	const addNewResource = () => {

		actions.setActiveResourceAction(null);
		actions.setActiveResourceIdAction(null);
		actions.setEditActiveResourceAction(false);

	};

	const addResource = resource => {

		actions.addResourceAction(resource);
		actions.setActiveResourceAction(resource);
		actions.setActiveResourceIdAction(
			(activeBundle.resources.length) ? 
				(activeBundle.resources.length - 1) : 0
		);

	};

	const updateResource = updatedResource => {	

		actions.updateResourceAction(
			activeBundle.activeResourceId,
			updatedResource
		);
		actions.setActiveResourceAction(updatedResource);
		actions.setEditActiveResourceAction(false);

	}; 

	const editActiveResource = () => {

		actions.setEditActiveResourceAction(true);

	};

	const activeResourceId = resourceId => {
		
		actions.setActiveResourceAction(
			activeBundle.resources[resourceId]
		);
		actions.setActiveResourceIdAction(resourceId);
	
	};

	const removeActiveResource = () => {

		actions.removeResourceAction(
			activeBundle.activeResourceId
		);

		if (activeBundle.resources[activeBundle.activeResourceId + 1]) {

			actions.setActiveResourceAction(
				activeBundle.resources[activeBundle.activeResourceId + 1]
			);
			actions.setActiveResourceIdAction(
				activeBundle.activeResourceId + 1
			);

		} else if (activeBundle.resources[activeBundle.activeResourceId - 1]) {

			actions.setActiveResourceAction(
				activeBundle.resources[activeBundle.activeResourceId - 1]
			);
			actions.setActiveResourceIdAction(
				activeBundle.activeResourceId - 1
			);

		} else {

			actions.setActiveResourceAction(
				null
			);
			actions.setActiveResourceIdAction(
				null
			);

		}

	};

	const navLinks = () => {

		if (activeBundle.resources.length <= 0) {

			return (

				<a 
					onClick={ () => activeResourceId(0) }>
					Resource-1
				</a>

			);

		} else {

			return (

				activeBundle.resources.map((item, index) => 
					<a 
						key={index} 
						onClick={ () => activeResourceId(index) }>
						{ 
							`Resource-${index + 1}` 
						}
					</a>

				)
			);

		}

	};

	return (

		<PageTemplate 
			bundleName={ activeBundle.bundleName }>
			<div 
				id='sidebar'>
				<nav>
					{
						navLinks()
					}
					<a 
						onClick={ addNewResource }>
						Add
					</a>
				</nav>
			</div>
			<div 
				id='main'>
				{	
					(activeBundle.editActiveResource) ? 
						<ResourceForm 
							addResource={ updateResource }
							activeResource={ activeBundle.activeResource } /> :
							(activeBundle.activeResource) ? 
								<ResourceDetails 
									activeResource={ activeBundle.activeResource }
									editActiveResource={ editActiveResource }
									removeActiveResource={ removeActiveResource } /> :
									<ResourceForm 
										addResource={ addResource } />
				}
			</div>
			<Link 
				to={{
					pathname: '/submit',
					state: {
						activeBundle: {
							name: activeBundle.name,
							description: activeBundle.description,
							resources: activeBundle.resources,
							timestamp: Date.now()
						}
					}
				}}>
				<button>
					Bundle up!
				</button>
			</Link>
		</PageTemplate>

	);

}

Make.propTypes = {

	activeBundle: PropTypes.object,
	actions: PropTypes.object

}

Make.defaultProps = {

	actions: {}

}

export default Make;