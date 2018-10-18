import { applyMiddleware, createStore, combineReducers } from 'redux';
import { bundles, activeBundle } from '../reducers';

const saveToLocalStorage = store => next => action => {

	next(action);

	localStorage['bundlem'] = JSON.stringify(store.getState());

}

const storeFactory = () => 

	applyMiddleware(saveToLocalStorage)(createStore)(
		combineReducers({
			bundles, 
			activeBundle
		}),
		(localStorage['bundlem']) ? 
			JSON.parse(localStorage['bundlem']) :
				{
					bundles: {},
					activeBundle: {}
				}
	);

export default storeFactory;