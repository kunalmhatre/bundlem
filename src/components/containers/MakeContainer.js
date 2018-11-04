import { connect } from 'react-redux';
import Make from '../Make';
import { 
	addResource, 
	removeResource, 
	updateResource, 
	setActiveResource, 
	setActiveResourceId, 
	setEditActiveResource
} from '../../redux/actions';

const MakeContainer = connect(

	state => ({

		activeBundle: state.activeBundle
		
	}),

	dispatch => ({

		addResourceAction(resource) {
			dispatch(addResource(resource));
		},
		removeResourceAction(resourceId) {
			dispatch(removeResource(resourceId));
		},
		updateResourceAction(resourceId, resource) {
			dispatch(updateResource(resourceId, resource));
		},
		setActiveResourceAction(activeResource) {
			dispatch(setActiveResource(activeResource));
		},
		setActiveResourceIdAction(activeResourceId) {
			dispatch(setActiveResourceId(activeResourceId));
		},
		setEditActiveResourceAction(status) {
			dispatch(setEditActiveResource(status));
		}
		
	})

)(Make);

export default MakeContainer;