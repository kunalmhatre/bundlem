import { connect } from 'react-redux';
import Make from '../Make';
import _ from 'lodash';
import { 
	addResource, 
	removeResource, 
	updateResource, 
	setActiveResource, 
	setActiveResourceId, 
	setEditActiveResource,
	setShowPreview 
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
		},
		setShowPreviewAction(status) {
			dispatch(setShowPreview(status));
		}

	})

)(Make);

export default MakeContainer;