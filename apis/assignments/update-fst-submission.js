import { getInstance } from "../../utils/helper"

export async function updateFstSubmisison(queryData){
    const instance = getInstance()
    return await instance.put('/mentor/submission',queryData)
}