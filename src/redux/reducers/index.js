import CONSTANTS from '../constants';

const activeBundle = (state = {}, action) => {

	switch(action.type) {

		case CONSTANTS.START_BUNDLE:

			return {
				...state,
				name: action.bundleName,
				description: action.bundleDescription
			};

		case CONSTANTS.ADD_RESOURCE:

			return {
				...state,
				resources: resources(state.resources, action)
			};

		case CONSTANTS.UPDATE_RESOURCE:

			return {
				...state,
				resources: resources(state.resources, action)
			};

		case CONSTANTS.REMOVE_RESOURCE:

			return {
				...state,
				resources: resources(state.resources, action)
			};

		case CONSTANTS.SET_ACTIVE_RESOURCE:

			return {
				...state,
				activeResource: action.activeResource
			};

		case CONSTANTS.SET_ACTIVE_RESOURCE_ID:

			return {
				...state,
				activeResourceId: action.activeResourceId
			};

		case CONSTANTS.SET_EDIT_ACTIVE_RESOURCE:

			return {
				...state,
				editActiveResource: action.status
			};

		default:

			return state;

	}

};

const resources = (state = [], action) => {

	switch(action.type) {

		case CONSTANTS.ADD_RESOURCE:

			return [
				...state,
				action.resource
			];

		case CONSTANTS.UPDATE_RESOURCE:

			return state.map((item, index) => 

				(index == action.resourceId) ? 
					action.updatedResource : item

			);

		case CONSTANTS.REMOVE_RESOURCE:

			return state.filter((item, index) =>

				(index != action.resourceId) ?
					true : false

			);

		default:

			return state;

	}

};

const bundles = (state = {}, action) => {

	switch(action.type) {

		case CONSTANTS.STORE_BUNDLE:

			return {
				...state,
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