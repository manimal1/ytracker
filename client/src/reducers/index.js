import { combineReducers } from 'redux';

import errorsReducer from './errorsReducer';
import authReducer from './authReducer';
import profileReducer from './profileReducer';
import yachtRegisterReducer from './yachtRegisterReducer';
import yachtsReducer from './yachtsReducer';
import companyRegisterReducer from './companyRegisterReducer';
import companiesReducer from './companiesReducer';
import yachtServiceReducer from './yachtServiceReducer';

export default combineReducers({
  errors: errorsReducer,
  auth: authReducer,
  userProfile: profileReducer,
  yachtRegister: yachtRegisterReducer,
  yachtData: yachtsReducer,
  companyRegister: companyRegisterReducer,
  companyData: companiesReducer,
  yachtService: yachtServiceReducer,
});
