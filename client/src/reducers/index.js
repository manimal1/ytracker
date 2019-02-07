import { combineReducers } from 'redux';
import { reducer as errorReducer } from './errorReducer';
import { reducer as authReducer } from '../containers/LoginUser';
import { reducer as profileReducer } from '../containers/Profile';
import { reducer as yachtRegisterReducer } from '../containers/Yachts/components/RegisterYacht';
import { reducer as yachtsReducer } from '../containers/YachtSelector';
import { reducer as companyRegisterReducer } from '../containers/Company/components/RegisterCompany';
import { reducer as companiesReducer } from '../containers/CompanySelector';
import { reducer as yachtServiceReducer } from '../containers/Yachts/components/YachtService';

export default combineReducers({
  errors: errorReducer,
  auth: authReducer,
  profile: profileReducer,
  yachtRegister: yachtRegisterReducer,
  yachtData: yachtsReducer,
  companyRegister: companyRegisterReducer,
  companyData: companiesReducer,
  yachtService: yachtServiceReducer,
});
