import axios from '../axios'

export function getLoginOtp(queryData) {
    return axios.post(`/student/login`, queryData);
}