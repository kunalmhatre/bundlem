import React from 'react';
import { mount } from 'enzyme';
import Home from '../../src/components/Home';

jest.mock('../../src/components/templates/PageTemplate');

describe('<Home />', () => {

	it('Renders without any issue', () => {
		expect(
			mount(<Home />)
			.find('button')
			.length
		).toBe(2);
	});

	it('Create button is clickable', () => {

		const history = {
			push: jest.fn()
		}

		mount(<Home history={ history } />)
		.find('button')
		.at(0)
		.simulate('click');

		expect(history.push).toBeCalled();

	});

	it('Search button is clickable', () => {

		const history = {
			push: jest.fn()
		}

		mount(<Home history={ history } />)
		.find('button')
		.at(1)
		.simulate('click');

		expect(history.push).toBeCalled();

	});

});