import {combineEpics} from 'redux-observable';
import {authEpic} from 'epics/auth';
import {menuEpic} from 'epics/menu';

export default combineEpics(
  authEpic,
  menuEpic
);
