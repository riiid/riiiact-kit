import React from 'react';
import renderer from 'react-test-renderer';
import withContext from 'utils/withContext';
import {App} from 'components/App';
jest.mock('material-ui/LinearProgress', () => {
  /* eslint react/display-name: 0 */
  return props => <div>{JSON.stringify(props, null, 2)}</div>;
});

const {context, childContextTypes} = __OPTIONS;

describe('components/App', () => {
  it('render', () => {
    const props = {
      loading: false
    };
    const tree = renderer.create(
      withContext(<App {...props}/>, context, childContextTypes)
    );

    expect(tree).toMatchSnapshot();
    tree.unmount();
  });

  it('should render loading progress', () => {
    const props = {
      loading: true
    };
    const tree = renderer.create(
      withContext(<App {...props}/>, context, childContextTypes)
    );
    expect(tree).toMatchSnapshot();
    tree.unmount();
  });

  it('should render children', () => {
    const props = {
      users: {}
    };
    const tree = renderer.create(
      withContext(
        <App {...props}><div className="children"/></App>,
        context,
        childContextTypes
      )
    );
    expect(tree).toMatchSnapshot();
    tree.unmount();
  });

  it('should not render children', () => {
    const props = {
      users: null
    };
    const tree = renderer.create(
      withContext(
        <App {...props}><div className="children"/></App>,
        context,
        childContextTypes
      )
    );
    expect(tree).toMatchSnapshot();
    tree.unmount();
  });
});

