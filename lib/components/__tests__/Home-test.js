import React from 'react';
import renderer from 'react-test-renderer';
import withContext from 'utils/withContext';
import AppToolbar from 'components/AppToolbar';
import Home from 'components/Home';

const {context, childContextTypes} = __OPTIONS;

describe('components/Home', () => {

  it('render', () => {
    const tree = renderer.create(
      withContext(<Home/>, context, childContextTypes)
    );

    expect(tree).toMatchSnapshot();
  });
});

