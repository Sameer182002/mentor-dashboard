import axios from '../axios'

export function getUncheckedQuestions(queryData) {
    return axios.get(`/ta/unchecked-submissions`, {params: queryData});
}