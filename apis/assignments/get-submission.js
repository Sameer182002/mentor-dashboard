import axios from '../axios'

export function getSubmission(queryData) {
    return axios.get(`/ta/submission`, {params: queryData});
}