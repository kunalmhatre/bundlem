import { FormGroup, Col, ControlLabel } from 'react-bootstrap/lib';

const BSFormGroup = ({ controlId = '', content = '', className = '', children }) => 

	<FormGroup controlId={ controlId }>
		<Col 
			sm={3}
			lg={2}
			componentClass={ ControlLabel } 
			className={ className }>
			{content}
		</Col>
		<Col 
			sm={9}
			lg={10}>
			{children}
		</Col>
	</FormGroup>

export default BSFormGroup;