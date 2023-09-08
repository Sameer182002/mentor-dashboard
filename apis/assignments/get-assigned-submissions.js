import { getInstance } from "../../utils/helper"

export async function getMentorAssignedSubmission(queryData){
    const instance = getInstance()
    return await instance.get('/mentor/assigned-submissions',{ params: queryData})
}