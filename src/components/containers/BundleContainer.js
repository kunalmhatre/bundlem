import { connect } from 'react-redux';
import Bundle from '../Bundle';
import { storeBundle } from '../../redux/actions';

const BundleContainer = connect(
	state => ({
		bundles: state.bundles
	}),
	dispatch => ({
		storeBundleAction(bundleId, bundle) {
			dispatch(
				storeBundle(
					bundleId,
					bundle
				)
			);
		}
	}) 
)(Bundle);

export default BundleContainer;