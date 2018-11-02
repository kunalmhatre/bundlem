import React from 'react';
import PropTypes from 'prop-types';
import HeaderMenu from '../menus/HeaderMenu';
import {
	Grid,
	Row, 
	Col
} from 'react-bootstrap/lib';

const PageTemplate = ({ bundleName, children }) => 

	<Grid>
		<Row className='show-grid'>
			<Col
				xsHidden
				smHidden
				md={1}
				lg={2}>
			</Col>
			<Col
				xs={12}
				sm={12}
				md={10}
				lg={8}>
				<HeaderMenu bundleName={bundleName} />
				{children}
			</Col>
			<Col
				xsHidden
				smHidden
				md={1}
				lg={2}>
			</Col>
		</Row>
	</Grid>	

PageTemplate.propTypes = {

	bundleName: PropTypes.string
	
}

export default PageTemplate;