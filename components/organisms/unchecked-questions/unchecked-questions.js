import { Fragment, useEffect, useState } from 'react'
import { getUncheckedQuestions } from '../../../apis'
import { Select } from '../../molecules'
import style from './unchecked-questions.module.css'
import { getDateFromIsoString } from '../../../utils/helper'
import { useRouter } from 'next/router'
import { questionToBeCheckedAtom } from '../../../recoil-states/assignment-atoms'
import { useSetRecoilState } from 'recoil'
import UncheckedQuestionSkeletons from './unchecled-ques-skeleton'
import { deviceRequirementMessage } from '../../../utils/constants'

export function UncheckedQuestionsDetails(){
    const [uncheckedQuestions,setUncheckedQuestions] = useState([])
    const [assignments,setAssignmnets] = useState([])
    const [isLoading,setIsLoading] = useState(true)
    const setQuestionToBeChecked = useSetRecoilState(questionToBeCheckedAtom)
    const {isReady,query= {} ,push} = useRouter()

    useEffect(() => {
        if(!isReady) return
            const {
                studentId ,
                assignmentId
            } = query || {}
            getUncheckedQuestionsDetails(
                assignmentId,
                studentId
            )
    }, [isReady])
    
    function handleCheckQuestion (question) {
        setQuestionToBeChecked(question)
        push({
            pathname : '/question-details' ,
            query : {
                submissionId : question?.submissionId
            }
        })
    }

    function handleSelectAssignment (selectedAssignmnetId) {
        getUncheckedQuestionsDetails(
            selectedAssignmnetId
        )
    }

    async function getUncheckedQuestionsDetails(assignmentId,studentId){
        try {
            const submissionDetail = await getUncheckedQuestions({
                assignmentId ,
                studentId
            })

            const uncheckedQuestionsData = []
            const assignmentsData = []
            const assgConsiderationStatus = {}

            submissionDetail.forEach(submission=> {
                const {
                    releasedContent  = {},
                    student  = {},
                    question  = {},
                    createdAt  = '',
                    _id = ''
                } = submission || {}
                
                uncheckedQuestionsData.push({
                    assignmentName : releasedContent?.name || '',
                    submittedBy : student?.firstName + student?.lastName,
                    submittedOn : getDateFromIsoString(createdAt),
                    topic : question?.subtopicId?.topic?.name || '' ,
                    question : question?.title  || '',
                    submissionId : _id || ''
                })
                if(assgConsiderationStatus[releasedContent?._id]){
                    // for not to push same assignent again in assignmentsData
                    return
                }
                assignmentsData.push({
                    assignmentName : releasedContent?.name ,
                    assignmentId : releasedContent?._id
                })
                assgConsiderationStatus[releasedContent?._id] = true
            })
            !assignmentId && setAssignmnets(assignmentsData)
            setUncheckedQuestions(uncheckedQuestionsData)
        }
        catch(error){
            console.log(error?.message || error)
        }
        finally{
            setIsLoading(false)
        }
    }

    if(isLoading) return <UncheckedQuestionSkeletons/>

    
    return (
        <Fragment>
        <div className={style.wrapper}>
            <h3>UnChecked Questions</h3>
            <div className={style.selectWrapper}>
                <span>Filter by assignments :</span>
                <Select 
                    data = {assignments}
                    textKey = 'assignmentName'
                    valueKey = 'assignmentId'
                    handleSelectFuncton = {handleSelectAssignment}
                />
            </div>
            {
                !uncheckedQuestions?.length && 
                <p className={style.noQuesToCheckMsg}>
                    All questions assigned for review have been diligently checked for  
                    <span> {query?.assignmentName || 'assignments' }</span> , 
                    or there are no outstanding or unchecked questions remaining for assessment.
                </p>
            }
            <div className={style.questionWrapper}>
               { 
                 uncheckedQuestions.map((question,index) => (
                    <div 
                        className={style.question} 
                        onClick={
                            ()=>handleCheckQuestion(question)
                        }
                        key={index}
                    >
                        <p>{question?.question}</p>
                        <div className={style.submissionDetail}>
                            <div><span>Assignment name : </span> <span>{question?.assignmentName}</span></div>
                            <div><span>Submitted by : </span> <span>{question?.submittedBy}</span></div>
                            <div><span>Submitted On : </span> <span>{question?.submittedOn}</span></div>
                            <div><span>Topic : </span> <span>{question?.topic}</span></div>
                        </div>
                    </div>
                 ))
                }
            </div>
        </div>
        <div className={style.deviceMessage}>
            <p>{deviceRequirementMessage}</p>
        </div>
        </Fragment>
    )
}