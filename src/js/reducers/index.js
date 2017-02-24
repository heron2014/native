import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import { NavigationReducer } from '@exponent/ex-navigation';
// import auth from './auth';
import calendar from './calendar';
import event from './event/index';
import feed from './feed';
import create from './create';
import user from './user';
import confirmUserEmail from './confirm-email';


export default combineReducers({
  navigation: NavigationReducer,
  calendar,
  event,
  feed,
  create,
  user,
  confirmUserEmail,
  form
});
