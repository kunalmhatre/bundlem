import PropTypes from 'prop-types';
import { FormGroup, Col, ControlLabel } from 'react-bootstrap/lib';

const BSFormGroup = ({ controlId = null, content = null, className = null, children }) => 

	<FormGroup controlId={ controlId }>
		<Col 
			sm={ 3 }
			lg={ 2 }
			componentClass={ ControlLabel } 
			className={ className }>
			{ content }
		</Col>
		<Col 
			sm={ 9 }
			lg={ 10 }>
			{ children }
		</Col>
	</FormGroup>;

BSFormGroup.propTypes = {
	controlId: PropTypes.string,
	content: PropTypes.string,
	className: PropTypes.string
};

export default BSFormGroup;