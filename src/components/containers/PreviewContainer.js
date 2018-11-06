import { connect } from 'react-redux';
import Preview from '../Preview';

const PreviewContainer = connect(
	state => ({
		activeBundle: state.activeBundle
	}),
	null
)(Preview);

export default PreviewContainer;