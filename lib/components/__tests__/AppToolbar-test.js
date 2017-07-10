import React from 'react';
import renderer from 'react-test-renderer';
import withContext from 'utils/withContext';
import AppToolbar from 'components/AppToolbar';

const {context, childContextTypes} = __OPTIONS;

describe('components/AppToolbar', () => {
  it('render', () => {
    const props = {
    };
    const tree = renderer.create(
      withContext(
        <AppToolbar {...props}/>,
        context,
        childContextTypes
      )
    );

    expect(tree).toMatchSnapshot();
    tree.unmount();
  });
});

