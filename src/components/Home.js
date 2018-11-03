import React from 'react';
import { Link } from 'react-router-dom';
import Create from './Create';
import Search from './Search';
import PageTemplate from './templates/PageTemplate';
import { Button, ButtonToolbar, Grid, Row, Col } from 'react-bootstrap/lib';
import '../assets/css/general.scss';

const Home = ({ history }) => 
	
	<PageTemplate 
		needHeader={ false }>

		<div className='centeredContent largeMarginTop'>

			<h1 className='bundlemLogo'>
				Bundlem
			</h1>

			<h3 className='tagline'>
				Create your bundle of online resources
			</h3>

			<p className='description'>
				Bundlem can be used to share your curated online resources with others.
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

	</PageTemplate>

export default Home;