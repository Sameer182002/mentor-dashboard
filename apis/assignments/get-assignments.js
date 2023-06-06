import axios from '../axios'

export function getAssignments(queryData) {
    return axios.get(`/ta/assignments`, queryData);
}