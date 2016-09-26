import React from 'react';
import {shallow} from 'enzyme';
import TestUtils from 'react-addons-test-utils';
import Home from '../lib/components/Home';

describe('Home', () => {

  it('exists', () => {
    const wrapper = shallow(<Home/>, {
      context: {muiTheme: {}}
    });

    expect(wrapper).not.toBeNull();
  });
});

