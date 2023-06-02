import axios from '../axios'

export function getLoginOtp(queryData) {
    return axios.put(`/ta/login`, queryData);
}