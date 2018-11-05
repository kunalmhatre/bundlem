import PageTemplate from './templates/PageTemplate';
import '../assets/css/general.scss';

const PageNotFound = () => 

	<PageTemplate>

		<div className='centeredContent'>
			
			<h1 className='textColorGrey bundlemLogo'>404</h1>
			<b className='textColorGrey'>Page not found</b>
		
		</div>

	</PageTemplate>;

export default PageNotFound;