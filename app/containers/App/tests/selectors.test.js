import { fromJS } from 'immutable';

// eslint-disable-next-line import/no-unresolved
import makeSelectLocation from 'containers/App/selectors';

describe('makeSelectLocation', () => {
  const locationStateSelector = makeSelectLocation();
  it('should select the location', () => {
    const mockedState = fromJS({
      router: { location: { pathname: '/foo' } },
    });
    expect(locationStateSelector(mockedState)).toEqual(
      mockedState.getIn(['router', 'location']).toJS(),
    );
  });
});
