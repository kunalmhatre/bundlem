import { fromJS } from 'immutable';
import {
  selectCreateDomain,
  makeSelectTitle,
  makeSelectDescription,
} from '../selectors';

describe('Create selectors', () => {
  const mockedState = fromJS({
    create: {
      title: 'testTitle',
      description: 'testDescription',
    },
  });

  describe('selectCreateDomain', () => {
    it('should select the create domain from the state', () => {
      expect(
        selectCreateDomain(mockedState),
      ).toEqual(mockedState.get('create'));
    });
  });

  describe('makeSelectTitle', () => {
    it('should select the title from the state', () => {
      expect(
        makeSelectTitle()(mockedState),
      ).toEqual(mockedState.getIn(['create', 'title']));
    });
  });

  describe('makeSelectDescription', () => {
    it('should select the description from the state', () => {
      expect(
        makeSelectDescription()(mockedState),
      ).toEqual(mockedState.getIn(['create', 'description']));
    });
  });
});
