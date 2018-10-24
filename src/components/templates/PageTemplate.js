import React from 'react';
import PropTypes from 'prop-types';
import HeaderMenu from '../menus/HeaderMenu';

const PageTemplate = ({ bundleName, children }) => 

	<div id='page'>
		<HeaderMenu bundleName={bundleName} />
		{ children }
	</div>

PageTemplate.propTypes = {

	bundleName: PropTypes.string
	
}

export default PageTemplate;