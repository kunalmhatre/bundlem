import PageTemplate from './templates/PageTemplate';
import { Button, ButtonToolbar } from 'react-bootstrap/lib';
import '../assets/css/general.scss';

const Home = ({ history }) => 
	
	<PageTemplate needHeader={ false }>

		<div className='centeredContent largeMarginTop'>

			<h1 className='bundlemLogo'>
				Bundlem
			</h1>

			<h3 className='tagline'>
				Create your bundle of online resources
			</h3>

			<p className='description'>
				Bundlem can be used to bundle and share your online resources like URLs of webpages, videos or 
				documents on a certain topic. Yes, you can also make a bundle for cat videos.
			</p>

			<ButtonToolbar className='flexCenter'>
				<Button
					bsStyle='primary'
					bsSize='large'
					onClick={() => history.push('/create')}>
					Create Bundle
				</Button>
				<Button
					bsStyle='primary'
					bsSize='large'
					onClick={() => history.push('/search')}>
					Search Bundle
				</Button>
			</ButtonToolbar>

		</div>

	</PageTemplate>;

export default Home;