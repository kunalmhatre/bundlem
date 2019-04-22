import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { mountWithIntl } from '../../../utils/reactIntlHelperFunction';
import history from '../../../utils/history';
import configureStore from '../../../configureStore';
import Make, { mapDispatchToProps, MakeComponent } from '../index';
import {
  setCurrentResourceAction,
  addResourceAction,
  removeResourceAction,
} from '../actions';

describe('<Make />', () => {
  const store = configureStore({}, history);

  it('dispatches setCurrentResourceAction', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    const currentResource = 1;

    props.setCurrentResource(currentResource);
    expect(dispatch).toHaveBeenCalledWith(
      setCurrentResourceAction(currentResource),
    );
  });

  it('dispatches addResourceAction', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    const resourceNumber = 1;
    const resource = {
      resourceType: 'WEB PAGE',
      link: 'https://google.com',
      title: 'Google',
      notes: 'A good search engine.',
    };

    props.addResource(resourceNumber, resource);
    expect(dispatch).toHaveBeenCalledWith(
      addResourceAction(resourceNumber, resource),
    );
  });

  it('dispatches removeResourceAction', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    const resourceNumber = 1;

    props.removeResource(resourceNumber);
    expect(dispatch).toHaveBeenCalledWith(
      removeResourceAction(resourceNumber),
    );
  });

  describe('Filling form', () => {
    const tree = mountWithIntl(
      <Provider store={store}>
        <BrowserRouter>
          <Make />
        </BrowserRouter>
      </Provider>,
    );
    const resourceTypeField = tree.find('input#radio-input-0');
    const linkField = tree.find('input#link');

    resourceTypeField.simulate(
      'change',
      {
        target: {
          name: 'resourceType',
          value: 'WEB PAGE',
          checked: true,
        },
      },
    );
    resourceTypeField.simulate('blur');

    linkField.simulate(
      'change',
      {
        target: {
          name: 'link',
          value: 'https://instagram.com',
        },
      },
    );
    linkField.simulate('blur');

    it('submitting the first resource and traversing to the next one', async () => {
      await new Promise(resolve => setTimeout(resolve, 0));

      tree
        .update()
        .find('button')
        .simulate('click');

      await new Promise(resolve => setTimeout(resolve, 0));
      tree.update();
    });

    it('filling details for the second resource', async () => {
      await new Promise(resolve => setTimeout(resolve, 0));

      const nextResourceTypeField = tree.find('input#radio-input-0');
      const nextLinkField = tree.find('input#link');

      nextResourceTypeField.simulate(
        'change',
        {
          target: {
            name: 'resourceType',
            value: 'WEB PAGE',
            checked: true,
          },
        },
      );
      nextResourceTypeField.simulate('blur');

      nextLinkField.simulate(
        'change',
        {
          target: {
            name: 'link',
            value: 'https://facebook.com',
          },
        },
      );
      nextLinkField.simulate('blur');
    });

    it('submitting the second resource and traversing to the first one', async () => {
      await new Promise(resolve => setTimeout(resolve, 0));

      tree
        .update()
        .find('button')
        .at(0)
        .simulate('click');

      await new Promise(resolve => setTimeout(resolve, 0));
      tree.update();
    });

    it('traversing back to the second resource again', async () => {
      await new Promise(resolve => setTimeout(resolve, 0));

      tree
        .find('button')
        .at(1)
        .simulate('click');
    });
  });
});

describe('<MakeComponent />', () => {
  const title = 'testTitle';
  const resources = [
    {
      title: 'testTitle',
      link: 'https://google.com',
      notes: 'testNotes',
      resourceType: 'testResourceType',
    },
  ];
  let testHistory;

  beforeEach(() => {
    testHistory = {
      push: jest.fn(pathname => pathname),
    };
  });

  it('BUNDLE UP button (in mobile view) redirects to /robot', () => {
    mountWithIntl(
      <MakeComponent
        setCurrentResource={() => {}}
        currentResource={0}
        addResource={() => {}}
        resources={resources}
        removeResource={() => {}}
        title={title}
        history={testHistory}
      />,
    ).find('button')
      .at(2)
      .simulate('click');

    expect(testHistory.push).toHaveReturnedWith('/robot');
  });

  it('BUNDLE UP button (in desktop view) redirects to /robot', () => {
    mountWithIntl(
      <MakeComponent
        setCurrentResource={() => {}}
        currentResource={0}
        addResource={() => {}}
        resources={resources}
        removeResource={() => {}}
        title={title}
        history={testHistory}
      />,
    ).find('button')
      .at(3)
      .simulate('click');

    expect(testHistory.push).toHaveReturnedWith('/robot');
  });
});
