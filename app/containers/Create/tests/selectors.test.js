import { fromJS } from 'immutable';
import {
  selectCreateDomain,
  makeSelectTitle,
  makeSelectDescription,
} from '../selectors';

describe('selectCreateDomain', () => {
  it('should select the create domain from the state', () => {
    const createState = fromJS({
      title: 'testTitle',
      description: 'testDescription',
    });
    const mockedState = fromJS({
      create: createState,
    });

    expect(
      selectCreateDomain(mockedState),
    ).toEqual(createState);
  });
});

describe('makeSelectTitle', () => {
  const titleSelector = makeSelectTitle();

  it('should select the title from the state', () => {
    const title = 'testTitle';
    const mockedState = fromJS({
      create: {
        title,
      },
    });

    expect(
      titleSelector(mockedState),
    ).toEqual(title);
  });
});

describe('makeSelectDescription', () => {
  const descriptionSelector = makeSelectDescription();

  it('should select the description from the state', () => {
    const description = 'testDescription';
    const mockedState = fromJS({
      create: {
        description,
      },
    });

    expect(
      descriptionSelector(mockedState),
    ).toEqual(description);
  });
});
