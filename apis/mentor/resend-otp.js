import axios from '../axios'

export function resendOtp (queryData) {
    return axios.put(`/ta/login`, queryData);
}