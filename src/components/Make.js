import React from 'react';
import PropTypes from 'prop-types';
import PageTemplate from './templates/PageTemplate';
import ResourceForm from './ResourceForm';
import ResourceDetails from './ResourceDetails';
import _ from 'lodash';
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
				activeBundle.resources.length : 0
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

	const removeResource = (resources, resourceId) => 

		resources.filter(
			(item, index) => 
				(index != resourceId) ? true : false
		);

	const removeActiveResource = () => {

		let resources = removeResource(
			activeBundle.resources,
			activeBundle.activeResourceId
		);

		let previousLength = resources.length + 1;

		actions.removeResourceAction(
			activeBundle.activeResourceId
		);

		if ((activeBundle.activeResourceId + 1) < previousLength) {
		
			actions.setActiveResourceIdAction(
				activeBundle.activeResourceId
			);
			actions.setActiveResourceAction(
				resources[activeBundle.activeResourceId]
			);

		} else if ((activeBundle.activeResourceId + 1) == previousLength) {

			if ((activeBundle.activeResourceId - 1) == -1) {

				actions.setActiveResourceIdAction(
					null
				);
				actions.setActiveResourceAction(
					null
				);

			} else {

				actions.setActiveResourceIdAction(
					activeBundle.activeResourceId - 1
				);
				actions.setActiveResourceAction(
					resources[activeBundle.activeResourceId - 1]
				);

			}

		}

	};

	const bundleup = (event) => {

		let totalResources = activeBundle.resources.length;
		let choice;

		choice = confirm(`Are you sure you want to bundl 'em up?`);

		if (!choice) {

			event.preventDefault();
		
		}

	}

	return (

		<PageTemplate 
			bundleName={ activeBundle.name }>
			<div 
				id='sidebar'>
				<nav>
					{
						(activeBundle.resources.length == 0) ?
							<a key={0} onClick={ () => activeResourceId(0) }>
								{ 'Resource-1' }
							</a> :
							activeBundle.resources.map((item, index) => 
								
								<a key={index} onClick={ () => activeResourceId(index) }>
									{ `Resource-${index + 1}` }
								</a>

							)
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
							activeResource={ activeBundle.activeResource }
							editResourceStatus={ true } /> :
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
							resources: activeBundle.resources
						}
					}
				}}>
				<button 
					disabled={ !(activeBundle.resources.length) || activeBundle.editActiveResource } 
					onClick={ (event) => bundleup(event) }>
					Bundle up!
				</button>
			</Link>
		</PageTemplate>

	);

}

export default Make;