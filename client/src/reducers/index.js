import { combineReducers } from 'redux';
import { reducer as errorReducer } from './errorReducer';
import { reducer as authReducer } from '../containers/LoginUser';
import { reducer as profileReducer } from '../containers/Profile';
import { reducer as yachtsReducer } from '../containers/YachtSelector';

export default combineReducers({
  errors: errorReducer,
  auth: authReducer,
  profile: profileReducer,
  yachtData: yachtsReducer,
});
