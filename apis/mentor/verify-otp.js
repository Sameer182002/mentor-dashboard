import axios from '../axios'
import { cookie } from '../cookies';

export async function verifyOtp (queryData) {
    const response = await axios.put(`/ta/verify-otp`, queryData);
    const {token,taDetails} = response

    if(!token || !taDetails){
        throw new Error('Invalid Response')
    }
    cookie.taAuthToken = token
    return taDetails
}