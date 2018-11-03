import { connect } from 'react-redux';
import Submit from '../Submit';
import { storeBundle, startBundle, clearActiveBundle } from '../../redux/actions';

const SubmitContainer = connect(
	state => ({
		activeBundle: state.activeBundle
	}),
	dispatch => ({
		storeBundleAction(bundleId, bundle) {
			dispatch(
				storeBundle(
					bundleId,
					bundle
				)
			);
		},
		clearActiveBundleAction() {
			dispatch(
				clearActiveBundle()
			);
		}
	})
)(Submit);

export default SubmitContainer;