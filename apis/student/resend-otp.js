import axios from '../axios'

export function resendOtp (queryData) {
    return axios.post(`/student/resend-otp`, queryData);
}