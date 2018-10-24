import React from 'react';
import PropTypes from 'prop-types';

const HeaderMenu = ({ bundleName }) => 

	<div id='header'>
		<h2>{ (bundleName) ? `Bundle - ${bundleName}` : 'Bundlem' }</h2>
	</div>

HeaderMenu.propTypes = {

	bundleName: PropTypes.string
	
}

export default HeaderMenu;