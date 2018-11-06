import CONSTANTS from '../constants';

const startBundle = (bundleName, bundleDescription) => ({
	bundleName,
	bundleDescription,
	type: CONSTANTS.START_BUNDLE
});

const addResource = (resource) => ({
	resource,
	type: CONSTANTS.ADD_RESOURCE
});

const removeResource = (resourceId) => ({
	resourceId,
	type: CONSTANTS.REMOVE_RESOURCE
});

const updateResource = (resourceId, updatedResource) => ({
	resourceId,
	updatedResource,
	type: CONSTANTS.UPDATE_RESOURCE
});

const setActiveResource = (activeResource) => ({
	activeResource,
	type: CONSTANTS.SET_ACTIVE_RESOURCE
});

const setActiveResourceId = (activeResourceId) => ({
	activeResourceId,
	type: CONSTANTS.SET_ACTIVE_RESOURCE_ID
});

const setEditActiveResource = (status) => ({
	status,
	type: CONSTANTS.SET_EDIT_ACTIVE_RESOURCE
});

const storeBundle = (bundleId, bundle) => ({
	bundleId,
	bundle,
	type: CONSTANTS.STORE_BUNDLE
});

const clearActiveBundle = () => ({
	type: CONSTANTS.CLEAR_ACTIVE_BUNDLE
});

export {
	startBundle,
	addResource,
	removeResource,
	updateResource,
	setActiveResource,
	setActiveResourceId,
	setEditActiveResource,
	storeBundle,
	clearActiveBundle
};