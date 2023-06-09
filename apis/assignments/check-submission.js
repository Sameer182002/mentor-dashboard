import axios from '../axios'

export function checkSubmission(queryData) {
    return axios.put(`/ta/submission`, queryData);
}