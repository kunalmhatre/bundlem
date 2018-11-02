import React from 'react';
import { render } from 'react-dom';
import Home from './components/Home';
import Create from './components/Create';
import Submit from './components/Submit';
import Search from './components/Search';
import Make from './components/Make';
import Bundle from './components/Bundle';
import PreviewContainer from './components/containers/PreviewContainer';
import PageNotFound from './components/PageNotFound';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import storeFactory from './redux/store';
import CreateContainer from './components/containers/CreateContainer';
import MakeContainer from './components/containers/MakeContainer';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faBars, faPlus } from '@fortawesome/free-solid-svg-icons';

window.React = React;

library.add(faBars, faPlus);

const store = storeFactory();

render(
	<Provider store={ store }>
		<HashRouter>
			<Switch>
				<Route exact path='/' component={ Home } />
				<Route path='/create' component={ CreateContainer } />
				<Route path='/submit' component={ Submit } />
				<Route path='/search' component={ Search } />
				<Route path='/bundle/:bundleId' component={ Bundle } />
				<Route path='/make' component={ MakeContainer } />
				<Route path='/preview' component={ PreviewContainer } />
				<Route component={ PageNotFound } />
			</Switch>
		</HashRouter>
	</Provider>,
	document.getElementById('root')
);

/*import storeFactory from './redux/store';
import * as actions from './redux/actions';

const store = storeFactory();

console.log(store.getState());

store.dispatch(actions.startBundle('test', 'test'));

console.log(store.getState());

store.dispatch(actions.addResource({
	title: 'test',
	type: 'test',
	url: 'test',
	description: 'test'
}));

console.log(store.getState());

store.dispatch(actions.addResource({
	title: 'test-1',
	type: 'test-1',
	url: 'test-1',
	description: 'test-1'
}));

console.log(store.getState());

store.dispatch(actions.removeResource(1));

console.log(store.getState());

store.dispatch(actions.addResource({
	title: 'test-1',
	type: 'test-1',
	url: 'test-1',
	description: 'test-1'
}));

console.log(store.getState());

store.dispatch(actions.updateResource(1, {
	title: 'test-2',
	type: 'test-2',
	url: 'test-2',
	description: 'test-2'
}));

console.log(store.getState());

store.dispatch(actions.setActiveResource({
	title: 'test-2',
	type: 'test-2',
	url: 'test-2',
	description: 'test-2'
}));

console.log(store.getState());

store.dispatch(actions.setActiveResourceId(1));

console.log(store.getState());

store.dispatch(actions.setEditActiveResource(true));

console.log(store.getState());

store.dispatch(actions.setEditActiveResource(false));

console.log(store.getState());

store.dispatch(actions.storeBundle('4576', {
	title: 'test-x',
	type: 'test-x',
	url: 'test-x',
	description: 'test-x'
}));

console.log(store.getState());*/