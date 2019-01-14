import axios from 'axios';
import { errorConstants } from '../../../../constants';

export const ADD_YACHT_SERVICE = 'ADD_YACHT_SERVICE';

export const addYachtService = (yachtId, companyId, service) => dispatch => {
  axios
    .post(`/api/services/add/${yachtId}&${companyId}`, service)
    .then(res => {})
    .catch(err => {});
}
