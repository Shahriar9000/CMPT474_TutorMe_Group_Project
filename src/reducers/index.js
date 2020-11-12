import { combineReducers } from 'redux';
import logInReducer from './logInReducer';
import locationReducer from './locationReducer';
import teacherClickedReducer from './teacherClickedReducer';

export default combineReducers({
  user: logInReducer,
  locationUsers:locationReducer,
  teacherClicked:teacherClickedReducer
});
