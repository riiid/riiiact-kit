import React from 'react';
import {shallow, mount} from 'enzyme';
import TestUtils from 'react-addons-test-utils';
import {AppToolbar} from 'components/AppToolbar';

describe('components/AppToolbar', () => {

  it('should exists', () => {
    const wrapper = shallow(<AppToolbar/>, __OPTIONS);

    expect(wrapper).not.toBeNull();
    wrapper.unmount();
  });

  it('should exists', () => {
    __OPTIONS.context.router.push.mockClear();

    const openSnackbar = jest.fn();
    const wrapper = shallow(
      <AppToolbar onOpenSnackbar={openSnackbar}/>,
        __OPTIONS
    );
    const targetFn = wrapper.instance()._route.bind(wrapper.instance());
    targetFn(0);
    targetFn(2);
    targetFn(3);
    targetFn(100);
    targetFn(-1);

    expect(openSnackbar).toHaveBeenCalled();
    expect(__OPTIONS.context.router.push.mock.calls)
    .toEqual([['menu'], ['menu'], ['/']]);
    wrapper.unmount();
  });

  it('should have 2 button', () => {
    const wrapper = mount(<AppToolbar/>, __OPTIONS);

    expect(wrapper.find('button').length).toBe(2);
    wrapper.unmount();
  });

  it('should have IconMenu', () => {
    const wrapper = mount(<AppToolbar/>, __OPTIONS);

    expect(wrapper.find('IconMenu').length).toBe(1);
    wrapper.unmount();
  });

  it('should show menu items when IconButton touched', () => {
    const wrapper = mount(<AppToolbar/>, __OPTIONS);

    expect(wrapper.find('RenderToLayer').prop('open')).not.toBeTruthy();
    expect(document.body.querySelector('div:nth-child(2)')).toBeNull();

    wrapper.find('IconMenu').find('IconButton').simulate('touchTap');

    expect(wrapper.find('RenderToLayer').prop('open')).toBeTruthy();
    expect(document.body.querySelector('div:nth-child(2)').textContent)
    .toBe('Menusmenu 1menu 2menu 3show snackbar');

    wrapper.unmount();
  });
});

