import { getInstance } from "../../utils/helper"

export async function getFstSubmission(queryData){
    const instance = getInstance()
    return await instance.get('/mentor/submission',{ params: queryData})
}