import PageTemplate from './templates/PageTemplate';
import ResourceDetails from './ResourceDetails';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap/lib';
import { FaChevronLeft } from 'react-icons/fa';
import { IconContext } from 'react-icons';
import PropTypes from 'prop-types';
import '../assets/css/general.scss';

const Preview = ({ activeBundle }) =>

	<PageTemplate>
		{	
			(activeBundle.name) ?
				<div id='previewBundle'>

					<ResourceDetails activeBundle={ activeBundle } />
					
					<Link to='/make'>
						<Button>
							<span>
								<IconContext.Provider value={{ className: 'verticalMiddle' }}>
									<FaChevronLeft />
								</IconContext.Provider>
								&nbsp;
								Back
							</span>
						</Button>
					</Link>

				</div> :
				<p>
					Your bundle seems to be empty. 
					Please click <Link to='/make'>here</Link> to add resources in your existing bundle or 
					click <Link to='/create'>here</Link> to create a new bundle.
				</p>
		}
	</PageTemplate>;

Preview.propTypes = {
	activeBundle: PropTypes.object.isRequired
};

export default Preview;