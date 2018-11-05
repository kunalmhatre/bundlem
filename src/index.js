import React from 'react';
import { render } from 'react-dom';
import Home from './components/Home';
import Search from './components/Search';
import PreviewContainer from './components/containers/PreviewContainer';
import SubmitContainer from './components/containers/SubmitContainer';
import BundleContainer from './components/containers/BundleContainer';
import PageNotFound from './components/PageNotFound';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import storeFactory from './redux/store';
import CreateContainer from './components/containers/CreateContainer';
import MakeContainer from './components/containers/MakeContainer';
import WebFont from 'webfontloader';

WebFont.load({
	google: {
		families: ['Fira Sans:400,700', 'sans-serif']
	}
});

window.React = React;

const store = storeFactory();

render (

	<Provider store={ store }>
		<HashRouter>
			<Switch>
				<Route exact path='/' component={ Home } />
				<Route path='/create' component={ CreateContainer } />
				<Route path='/make' component={ MakeContainer } />
				<Route path='/preview' component={ PreviewContainer } />
				<Route path='/submit' component={ SubmitContainer } />
				<Route path='/search' component={ Search } />
				<Route path='/bundle/:bundleId' component={ BundleContainer } />
				<Route component={ PageNotFound } />
			</Switch>
		</HashRouter>
	</Provider>,
	document.getElementById('root')

);