import React from 'react';
import PageTemplate from './templates/PageTemplate';
import ResourceDetails from './ResourceDetails';
import { Link } from 'react-router-dom';

const Preview = ({ activeBundle }) =>

	<PageTemplate bundleName={ activeBundle.name }>
		{	
			(activeBundle.resources.length) ?
				<ResourceDetails activeBundle={ activeBundle } /> :
				<p>
					Your bundle seems to be empty. 
					Please click <Link to='/make'>here</Link> to add resources in your existing bundle or 
					click <Link to='/create'>here</Link> to create a new bundle.
				</p>
		}
	</PageTemplate>

export default Preview;