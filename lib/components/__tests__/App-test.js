import React from 'react';
import {shallow, mount} from 'enzyme';
import TestUtils from 'react-addons-test-utils';
import {App} from 'components/App';

describe('components/App', () => {

  it('should exists', () => {
    const wrapper = shallow(<App/>, __OPTIONS);

    expect(wrapper).not.toBeNull();
  });

  it('should render loading progress', () => {
    const wrapper = shallow(<App loading={true}/>, __OPTIONS);

    expect(wrapper.find('.app-progress').length).toBe(1);
  });

  it('should render children', () => {
    const wrapper = shallow(
      <App user={{}}><div className="children"/></App>,
      __OPTIONS
    );

    expect(wrapper.find('.children').length).toBe(1);
  });

  it('should not render children', () => {
    const wrapper = shallow(
      <App user={null}><div className="children"/></App>,
      __OPTIONS
    );

    expect(wrapper.find('.children').length).toBe(0);
  });

  it('should invoke requestAuth when mount', () => {
    const props = {
      requestAuth: jest.fn()
    };
    const wrapper = mount(
      <App user={null} {...props}/>,
      __OPTIONS
    );

    expect(props.requestAuth).toHaveBeenCalled();
    wrapper.unmount();
  });
});

