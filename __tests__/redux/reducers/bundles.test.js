import { bundles } from '../../../src/redux/reducers';
import { storeBundle } from '../../../src/redux/actions';
import deepFreeze from 'deep-freeze';

describe('Reducer - bundles', () => {

	it('STORE_BUNDLE', () => {

		const state = {};
		const action = storeBundle('1337', {
			name: 'test',
			description: 'test',
			resources: [
				{
					title: 'test_1',
					type: 'test_1',
					url: 'test_1',
					notes: 'test_1'
				},
				{
					title: 'test_2',
					type: 'test_2',
					url: 'test_2',
					notes: 'test_2'
				}
			],
			id: '1337'
		});

		deepFreeze(state);
		deepFreeze(action);

		expect(bundles(state, action))
			.toEqual({
				'1337': {
					name: 'test',
					description: 'test',
					resources: [
						{
							title: 'test_1',
							type: 'test_1',
							url: 'test_1',
							notes: 'test_1'
						},
						{
							title: 'test_2',
							type: 'test_2',
							url: 'test_2',
							notes: 'test_2'
						}
					],
					id: '1337'
				}
			});

	});

});