import CONSTANTS from '../constants';
import _ from 'lodash';

const activeBundle = (state = {}, action) => {

	let clone = _.cloneDeep(state);

	switch(action.type) {

		case CONSTANTS.START_BUNDLE:

			return {
				...clone,
				name: action.bundleName,
				description: action.bundleDescription,
			};

		case CONSTANTS.ADD_RESOURCE:

			return {
				...clone,
				resources: resources(state.resources, action)
			};

		case CONSTANTS.UPDATE_RESOURCE:

			return {
				...clone,
				resources: resources(state.resources, action)
			};

		case CONSTANTS.REMOVE_RESOURCE:

			return {
				...clone,
				resources: resources(state.resources, action)
			};

		case CONSTANTS.SET_ACTIVE_RESOURCE:

			return {
				...clone,
				activeResource: _.cloneDeep(action.activeResource)
			};

		case CONSTANTS.SET_ACTIVE_RESOURCE_ID:

			return {
				...clone,
				activeResourceId: action.activeResourceId
			};

		case CONSTANTS.SET_EDIT_ACTIVE_RESOURCE:

			return {
				...clone,
				editActiveResource: action.status
			};

		case CONSTANTS.SET_SHOW_PREVIEW:

			return {
				...clone,
				showPreview: action.status
			}

		default:

			return state;

	}

};

const resources = (state = [], action) => {

	let clone = _.cloneDeep(state);

	switch(action.type) {

		case CONSTANTS.ADD_RESOURCE:

			return [
				...clone,
				_.cloneDeep(action.resource)
			];

		case CONSTANTS.UPDATE_RESOURCE:

			return clone.map((item, index) => 

				(index == action.resourceId) ? 
					_.cloneDeep(action.updatedResource) : item

			);

		case CONSTANTS.REMOVE_RESOURCE:

			return clone.filter((item, index) =>

				(index != action.resourceId) ?
					true : false

			);

		default:

			return state;

	}

};

const bundles = (state = {}, action) => {

	let clone = _.cloneDeep(state);

	switch(action.type) {

		case CONSTANTS.STORE_BUNDLE:

			return {
				...clone,
				[action.bundleId]: action.bundle
			};

		default:

			return state;

	}

};

export {
	bundles,
	activeBundle
};