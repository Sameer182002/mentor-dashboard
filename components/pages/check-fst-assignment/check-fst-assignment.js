import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getMentorAssignedSubmission } from "../../../apis";
import { getDateFromIsoString } from "../../../utils/helper";
import styles from "./check-fst-assignment.module.css"
import CheckFstSkeleton from "./check-fst-skeleton";

export function CheckFstAssignmentQuestions(){
    const [questionsData,setQuestionsData] = useState([])
    const [isLoading,setIsLoading] = useState(false)

    const router = useRouter()
    const {query,isReady} = router || {}
    const {studentId='',assignmentId=''} = query || {}

    function handleClick(submissionId){
        router.push({
            pathname : "/fst-question-details",
            query:{submissionId,studentId,assignmentId}
        })
    }

    async function getMentorAssignedAssignment(){
        try{
            setIsLoading(true)
            const data = await getMentorAssignedSubmission({studentId,assignmentId})
            if(data?.length){
                setQuestionsData(data)
            }
        }catch(error){
            console.log(error?.message || error)
        }
        finally{
            setIsLoading(false)
        }
    }

    useEffect(()=>{
        if(!isReady) return
        getMentorAssignedAssignment();
    },[isReady])
    
    function redirectToAssignment(){
        router.push('/fst-assignment')
    }

    const evaluationStatusMapping = {
        pending : "Unchecked",
        checked : "Checked",
    }

    if(isLoading){
        return <CheckFstSkeleton/>
    }

    return (
        <div className={styles.mainWrapper}>
            <div className={styles.navigation}>
                 <p onClick={redirectToAssignment}>FST Assignment</p>
                 <p>{">"}</p>
                 <p>Assignment Questions</p>
            </div>
            <h2>Assignment Questions <span>{`(${questionsData?.length})No's`}</span></h2>
            {questionsData.map(({
                _id = "",
                question : {title ='',topic:{title : topicTitle=''} = {}} = {},
                assignment:{title : assignmentTitle=''} = {},
                student : {fullName = ''} = {},
                createdAt,
                evaluationStatus
            },index)=>
                <div key={index}>
                    <p className={styles.evaluationStatus} style={{color : evaluationStatus == "checked" ? "green" : "red" }}>{evaluationStatusMapping?.[evaluationStatus]}</p>
                    <div className={styles.questionDetailsBox} onClick={()=>handleClick(_id)}>
                        <p>{title}</p>
                        <div className={styles.submissionDetails}>
                            <p>Assignment name : <span>{assignmentTitle}</span></p>
                            <p>Submitted by : <span>{fullName}</span></p>
                            <p>Submitted On : <span>{getDateFromIsoString(createdAt)}</span></p>
                            <p>Topic : <span>{topicTitle}</span></p>
                        </div>
                    </div>
                </div>
            )}
        </div>

    )
}