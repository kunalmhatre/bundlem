import { activeBundle } from '../../../src/redux/reducers';
import { 
	startBundle,
	addResource, 
	removeResource, 
	updateResource, 
	setActiveResource, 
	setActiveResourceId, 
	setEditActiveResource,
	clearActiveBundle
} from '../../../src/redux/actions';
import deepFreeze from 'deep-freeze';

describe('Reducer - activeBundle', () => {

	it('START_BUNDLE', () => {

		const state = {
			name: null,
			description: null,
			resources: [],
			activeResource: null,
			activeResourceId: 0,
			editActiveResource: false
		};
		
		const action = startBundle('test','test');

		deepFreeze(state);
		deepFreeze(action);

		expect(activeBundle(state, action))
			.toEqual({
				name: 'test',
				description: 'test',
				resources: [],
				activeResource: null,
				activeResourceId: 0,
				editActiveResource: false
			});

	});

	it('ADD_RESOURCE', () => {

		const state = {
			name: 'test',
			description: 'test',
			resources: [],
			activeResource: null,
			activeResourceId: 0,
			editActiveResource: false
		};

		const action = addResource({
			title: 'test',
			type: 'test',
			url: 'test',
			notes: 'test'
		});

		deepFreeze(state);
		deepFreeze(action);

		expect(activeBundle(state, action))
			.toEqual({
				name: 'test',
				description: 'test',
				resources: [
					{
						title: 'test',
						type: 'test',
						url: 'test',
						notes: 'test'
					}
				],
				activeResource: null,
				activeResourceId: 0,
				editActiveResource: false
			});

	});

	it('UPDATE_RESOURCE', () => {

		const state = {
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
			activeResource: null,
			activeResourceId: 0,
			editActiveResource: false
		};

		const action = updateResource(1, {
			title: 'test_2_1',
			type: 'test_2_2',
			url: 'test_2_3',
			notes: 'test_2_4'
		});

		deepFreeze(state);
		deepFreeze(action);

		expect(activeBundle(state, action))
			.toEqual({
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
						title: 'test_2_1',
						type: 'test_2_2',
						url: 'test_2_3',
						notes: 'test_2_4'
					}
				],
				activeResource: null,
				activeResourceId: 0,
				editActiveResource: false
			});

	});	

	it('REMOVE_RESOURCE', () => {

		const state = {
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
			activeResource: null,
			activeResourceId: 0,
			editActiveResource: false
		};

		const action = removeResource(0);

		deepFreeze(state);
		deepFreeze(action);

		expect(activeBundle(state, action))
			.toEqual({
				name: 'test',
				description: 'test',
				resources: [
					{
						title: 'test_2',
						type: 'test_2',
						url: 'test_2',
						notes: 'test_2'
					}
				],
				activeResource: null,
				activeResourceId: 0,
				editActiveResource: false
			});

	});

	it('SET_ACTIVE_RESOURCE', () => {

		const state = {
			name: 'test',
			description: 'test',
			resources: [
				{
					title: 'test_2',
					type: 'test_2',
					url: 'test_2',
					notes: 'test_2'
				}
			],
			activeResource: null,
			activeResourceId: 0,
			editActiveResource: false
		};

		const action = setActiveResource({
			title: 'test_1',
			type: 'test_1',
			url: 'test_1',
			notes: 'test_1'
		});

		deepFreeze(state);
		deepFreeze(action);

		expect(activeBundle(state, action))
			.toEqual({
				name: 'test',
				description: 'test',
				resources: [
					{
						title: 'test_2',
						type: 'test_2',
						url: 'test_2',
						notes: 'test_2'
					}
				],
				activeResource: {
					title: 'test_1',
					type: 'test_1',
					url: 'test_1',
					notes: 'test_1'
				},
				activeResourceId: 0,
				editActiveResource: false
			});

	});

	it('SET_ACTIVE_RESOURCE_ID', () => {

		const state = {
			name: 'test',
			description: 'test',
			resources: [
				{
					title: 'test_2',
					type: 'test_2',
					url: 'test_2',
					notes: 'test_2'
				}
			],
			activeResource: null,
			activeResourceId: 0,
			editActiveResource: false
		};

		const action = setActiveResourceId(1337);

		deepFreeze(state);
		deepFreeze(action);

		expect(activeBundle(state, action))
			.toEqual({
				name: 'test',
				description: 'test',
				resources: [
					{
						title: 'test_2',
						type: 'test_2',
						url: 'test_2',
						notes: 'test_2'
					}
				],
				activeResource: null,
				activeResourceId: 1337,
				editActiveResource: false
			});

	});

	it('SET_EDIT_ACTIVE_RESOURCE', () => {

		const state = {
			name: 'test',
			description: 'test',
			resources: [
				{
					title: 'test_2',
					type: 'test_2',
					url: 'test_2',
					notes: 'test_2'
				}
			],
			activeResource: {
				title: 'test_1',
				type: 'test_1',
				url: 'test_1',
				notes: 'test_1'
			},
			activeResourceId: 0,
			editActiveResource: false
		};

		const action = setEditActiveResource(true);

		deepFreeze(state);
		deepFreeze(action);

		expect(activeBundle(state, action))
			.toEqual({
				name: 'test',
				description: 'test',
				resources: [
					{
						title: 'test_2',
						type: 'test_2',
						url: 'test_2',
						notes: 'test_2'
					}
				],
				activeResource: {
					title: 'test_1',
					type: 'test_1',
					url: 'test_1',
					notes: 'test_1'
				},
				activeResourceId: 0,
				editActiveResource: true
			});

	});

	it('CLEAR_ACTIVE_BUNDLE', () => {

		const state = {
			name: 'test',
			description: 'test',
			resources: [
				{
					title: 'test_2',
					type: 'test_2',
					url: 'test_2',
					notes: 'test_2'
				}
			],
			activeResource: {
				title: 'test_1',
				type: 'test_1',
				url: 'test_1',
				notes: 'test_1'
			},
			activeResourceId: 0,
			editActiveResource: false
		};

		const action = clearActiveBundle();

		deepFreeze(state);
		deepFreeze(action);

		expect(activeBundle(state, action))
			.toEqual({
				name: null,
				description: null,
				resources: [],
				activeResource: null,
				activeResourceId: 0,
				editActiveResource: false
			});

	});

});