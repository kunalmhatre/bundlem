import { connect } from 'react-redux';
import Create from '../Create';
import { startBundle } from '../../redux/actions';

const CreateContainer = connect(
	state => ({
		activeBundle: state.activeBundle
	}),
	dispatch => ({
		startBundleAction(bundleName, bundleDescription) {
			dispatch(
				startBundle(
					bundleName, 
					bundleDescription
				)
			);
		}
	}) 
)(Create);

export default CreateContainer;