import axios from 'axios';
import { errorConstants } from '../../../../constants';

export const REGISTER_COMPANY = 'REGISTER_COMPANY';

export const registerCompany = (company) => dispatch => {
  axios
    .post('/api/company/register', company)
    .then(res => {})
    .catch(err => {});
}
