import { combineReducers } from 'redux';
import logInReducer from './logInReducer';
import locationReducer from './locationReducer';
import teacherClickedReducer from './teacherClickedReducer';
import availabilityReducer from './availabilityReducer';
import addAvailabilityReducer from './addAvailabilityReducer';

export default combineReducers({
  user: logInReducer,
  locationUsers:locationReducer,
  teacherClicked:teacherClickedReducer,
  availabilityList:availabilityReducer,
  addAvailability:addAvailabilityReducer,
});
