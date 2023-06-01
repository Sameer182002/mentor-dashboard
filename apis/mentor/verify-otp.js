import axios from '../axios'

export async function verifyOtp (queryData) {
    return axios.put(`/ta/verify-otp`, queryData);
}