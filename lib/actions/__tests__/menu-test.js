import {
  REQUEST_MENU, RECEIVE_MENU_SUCCESS, RECEIVE_MENU_FAILURE,
  requestMenu, receiveMenuSuccess, receiveMenuFailure
} from 'actions/menu';

describe('actions/menu', () => {

  it('should create an action to request menu', () => {
    expect(requestMenu()).toEqual({
      type: REQUEST_MENU
    });
  });

  it('should create an action to receive menu success', () => {
    expect(receiveMenuSuccess({})).toEqual({
      type: RECEIVE_MENU_SUCCESS,
      data: {}
    });
  });

  it('should create an action to receive menu failure', () => {
    expect(receiveMenuFailure({})).toEqual({
      type: RECEIVE_MENU_FAILURE,
      error: {}
    });
  });

});
