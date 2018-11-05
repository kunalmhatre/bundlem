import PageTemplate from './templates/PageTemplate';
import ResourceForm from './ResourceForm';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Make = ({ activeBundle = {}, ...actions }) => {

	const save = (resourceId, resource) => {

		actions.addResourceAction(resource);
		actions.setActiveResourceAction(resource);
		actions.setActiveResourceIdAction(resourceId);
	
	};

	const edit = (resourceId, resources) => {

		actions.setEditActiveResourceAction(true);
		actions.setActiveResourceAction(resources[resourceId]);

	};

	const update = (resourceId, resource) => {

		actions.updateResourceAction(resourceId, resource);
		actions.setEditActiveResourceAction(false);
	
	};

	const nextResource = (resourceId, resources, updateState) => {

		actions.setActiveResourceIdAction(resourceId);

		if (resources[resourceId]) {

			actions.setActiveResourceAction(resources[resourceId]);
			updateState(false, resources[resourceId]);
		
		} else {
			
			actions.setActiveResourceAction(null);
			updateState(true);
		
		}

	};

	const previousResource = (resourceId, resources, updateState) => {
		
		actions.setActiveResourceIdAction(resourceId);
		actions.setActiveResourceAction(resources[resourceId]);
		updateState(false, resources[resourceId]);
	
	};

	const removeResource = (resourceId, resources, updateState) => {
		
		let predictedResources = resources.filter((item, index) => 
			(index != resourceId) ? true : false);
		
		let previousLength = predictedResources.length + 1;

		actions.removeResourceAction(resourceId);
		actions.setEditActiveResourceAction(false);

		if ((resourceId + 1) < previousLength) {
		
			actions.setActiveResourceIdAction(resourceId);
			actions.setActiveResourceAction(predictedResources[resourceId]);
			updateState(false, predictedResources[resourceId]);

		} else if ((resourceId + 1) == previousLength) {

			if ((resourceId - 1) == -1) {

				actions.setActiveResourceIdAction(0);
				actions.setActiveResourceAction(null);
				updateState(true);

			} else {

				actions.setActiveResourceIdAction(resourceId - 1);
				actions.setActiveResourceAction(predictedResources[resourceId - 1]);
				updateState(false, predictedResources[resourceId - 1]);

			}

		}

	};

	return (

		<PageTemplate bundleName={ activeBundle.name }>
			{	
				(activeBundle.name) ? 
					<ResourceForm
						activeBundle={ activeBundle }
						save={ save }
						edit={ edit }
						update={ update }
						nextResource={ nextResource }
						previousResource={ previousResource }
						removeResource={ removeResource } /> :
					<p>
						Please click <Link to='/create'>here</Link> to create a bundle first.
					</p>

			}
		</PageTemplate>

	);

};

Make.propTypes = {
	activeBundle: PropTypes.object.isRequired
};

export default Make;