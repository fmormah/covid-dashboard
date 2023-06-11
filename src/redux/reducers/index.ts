import { combineReducers } from 'redux';
import patientReducer from './patientReducer';

const rootReducer = combineReducers({
  patients: patientReducer,
});

export default rootReducer;
