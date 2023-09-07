import { getInstance } from "../../utils/helper"

export async function getFstAssignedAssignments(){
    const instance = getInstance()
    return await instance.get('/mentor/assigned-assignments')
}