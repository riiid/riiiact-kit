import {combineEpics} from 'redux-observable';
import {auth$$} from 'epics/auth';
import {menu$$} from 'epics/menu';

export default combineEpics(
  auth$$,
  menu$$
);
