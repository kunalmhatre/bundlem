import PropTypes from 'prop-types';
import { PageHeader } from 'react-bootstrap/lib';
import { withRouter } from 'react-router-dom';
import '../../assets/css/general.scss';

const HeaderMenu = ({ bundleName = null, history }) => 
	
	<div id='header'> 
		{	
			<PageHeader 
				className='bundlemHeader'
				onClick={ () => !(bundleName) ? 
					history.push('/') : 
					history.push('/create') }>
				{ (bundleName) ? bundleName : 'Bundlem' }
			</PageHeader>
		}
	</div>;

HeaderMenu.propTypes = {
	bundleName: PropTypes.string
};

export default withRouter(HeaderMenu);