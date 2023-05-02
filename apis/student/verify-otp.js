import axios from '../axios'

export async function verifyOtp (queryData) {
    return axios.post(`/student/verify-otp`, queryData);
    

}

