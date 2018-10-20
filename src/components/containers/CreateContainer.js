import { connect } from 'react-redux';
import Create from '../Create';
import { startBundle } from '../../redux/actions';

const CreateContainer = connect(
	null,
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