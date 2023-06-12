import Image from 'next/image'
import { NavigationTrail } from '../../atoms'
import style from './question-details.module.css'
import { QuestionReport } from '../../molecules'
import { Fragment, useEffect, useState } from 'react'
import { deviceRequirementMessage, questionMetadataTypes , submissionTypes} from '../../../utils/constants'
import LinkRoundedIcon from '@mui/icons-material/LinkRounded';
import { getSubmission } from '../../../apis'
import { useRouter } from 'next/router'
import { getDateFromIsoString } from '../../../utils/helper'
import QuestionDetailsSkeleton from './question-details-skel'


export function QuestionDetailsComponent () {

    const {isReady , query = {} ,push} = useRouter()
    const [questionData,setQuestionData] = useState(null)
    const [isLoading,setIsLoading] = useState(true)

    async function getSubmissionDetails(submissionId){
        if(!submissionId){
            push('/')
            return
        }
        try{
            const submission = await getSubmission({
                submissionId
            })
            const {
                releasedContent = {},
                student = {},
                question = {},
                createdAt  = '',
                evaluationStatus = '',
                solution = '',
                _id = ''
            } = submission || {}

            setQuestionData({
                assignmentName : releasedContent?.name || '',
                submittedBy : student?.firstName + " " + student?.lastName,
                submittedOn : getDateFromIsoString(createdAt),
                topic : question?.subtopicId?.topic?.name ,
                question : question?.title ,
                metadata : question?.metadata ,
                submissionType : question?.submissionType ,
                evaluationStatus ,
                solution,
                marks : question?.marks ,
                studentId : student?._id ,
                submissionId : _id ,
                questionDescription : question?.description
            })
        }
        catch(err){
            console.log(err?.message || err)
        }
        finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        if(!isReady) return
        getSubmissionDetails(query?.submissionId)
    }, [isReady])

    const {
        assignmentName = '',
        evaluationStatus = '' ,
        marks  = '',
        metadata = [],
        question = '',
        solution  = '',
        submissionType  = '',
        submittedBy  = '',
        submittedOn  = '',
        submissionId = '' ,
        questionDescription = ''
    } =  questionData || {}

    if( isLoading ) return <QuestionDetailsSkeleton/>

    if(!questionData){
        return (
            <div className={style.noSubmissionMsg}>
                <p>We regret to inform you that we were unable to locate any submission matching your request.</p>
            </div>
        )
    }

    return (
        <Fragment>
        <div className={style.wrapper}> 
            <NavigationTrail 
                currentAssignment={assignmentName}
            />
            <h4>Question : {question}</h4>
            <div className={style.submissionData}>
                <div>
                    <span>Submitted by : </span>
                    <span>{submittedBy}</span>
                </div>
                <div>
                    <span>Submitted On : </span>
                    <span>{submittedOn}</span>
                </div>
            </div>
            <p className={style.questionText}>Description : {questionDescription}</p>
            <div className={style.examples}>
                {
                    metadata.map((data,index) => (
                        <div className={style.example} key = {index}>
                            <h6>{data?.name}</h6>
                            <Fragment>
                                {
                                    data?.type === questionMetadataTypes?.file &&
                                    <picture>
                                        <Image
                                            src={data?.link}
                                            height={'100%'}
                                            width={'100%'}
                                            layout='fill'
                                            objectFit='fill'
                                        />
                                    </picture>
                                }
                                {
                                    data?.type === questionMetadataTypes?.link &&
                                    <a href={data?.link} target='_blank' rel='noreferrer'>
                                        {data?.link}
                                    </a>
                                }

                            </Fragment>
                        </div>
                    ))
                }
            </div>

            <div className={style.ansData}>
                <h6>Answer :</h6>
                <Fragment>
                    {
                        submissionType === submissionTypes?.shortAnswer ?
                            <textarea 
                                disabled
                                value={solution}
                            /> :
                            <div 
                                className={style.linkPicker}
                                onClick={
                                    () => window.open(solution,"_blank")
                                }
                            >
                                <LinkRoundedIcon style={{color : 'blue'}}/>
                                <input 
                                    className={style.linkInput}
                                    value={solution}
                                    readOnly
                                />
                            </div>
                    }
                </Fragment>
            </div>

            <QuestionReport 
                data = {{
                    marks,
                    evaluationStatus ,
                    submissionId
                }}
            />
        </div>
        <div className={style.deviceMessage}>
            <p>{deviceRequirementMessage}</p>
        </div>
        </Fragment>

    )
}