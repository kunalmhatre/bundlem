import React from 'react';
import PropTypes from 'prop-types';
import { PageHeader } from 'react-bootstrap/lib';
import { Link, withRouter } from 'react-router-dom';
import '../../assets/css/general.scss';

const FooterMenu = ({ history }) => 
		 
	<div id='footer'>
		<hr />
		<div 
			id='footer'
			className='textColorGrey centeredContent'>
			&copy; Bundlem 2018 &bull;&nbsp;
			<a href='https://reactjs.org/'>Powered by React</a> &bull;&nbsp;
			<a href='https://github.com/kunalmhatre/bundlem'>Source</a> &bull;&nbsp;
			<a href='https://github.com/kunalmhatre/bundlem/issues/new'>Report Bug or Improvements</a>

		</div>
	</div>

export default withRouter(FooterMenu);