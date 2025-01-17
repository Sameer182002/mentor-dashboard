import { useRouter } from "next/router"
import { Fragment, useEffect, useState } from "react"
import { MARKS_DISTRIBUTION_KEYS, questionMetadataTypes, submissionTypes, ASSIGNMENT_STATUS } from "../../../utils/constants"
import LinkRoundedIcon from '@mui/icons-material/LinkRounded';
import styles from "./fst-question.module.css"
import { getFstSubmission, updateFstSubmisison } from "../../../apis";
import { getDateFromIsoString } from "../../../utils/helper";
import Image from "next/image";
import DescriptionIcon from '@mui/icons-material/Description';
import { FstQuestionReport } from "../../molecules";
import FstQuestionSubSkeleton from "./fst-question-skeleton";
import { MentorEvaluationInstructionModal } from "../../atoms/pop-up/pop-up";
import HtmlParser from "react-html-parser"

export function FstQuestionView(){

    const router = useRouter()
    const {query,isReady} = router || {}
    const {studentId='',assignmentId='',submissionId='',topicsToConsider='',topicsToIgnore=''} = query || {}
    const [questionData,setQuestionData] = useState({})
    const [errorMsg,setErrorMsg] = useState("")
    const [isLoading,setIsLoading] = useState(false)
    const [isLocked, setIsLocked] = useState(false)
    const [isValidLinkSubmission, setIsValidLinkSubmission] = useState(false)
    const [isMarkingUpdated, setIsMarkingUpdated] = useState(false)
    const [evalInstruct, setEvalInstruct] = useState(false)
    
    function handleClickRedirect(redirectTo){
        if(redirectTo == "assignment"){
            router.push("/fst-assignment")
            return
        }
        if(redirectTo == "check"){
            router.push({
                pathname: "/check-fst-assignment",
                query: {studentId,assignmentId}
            })
            return
        }
    }
    function updateMarkingStatus () {
        setIsMarkingUpdated(true)
    }

    async function getSubmission(){
        try{
            setIsLoading(true)
            const data = await getFstSubmission({submissionId : submissionId })
    
            const {
                student = {},
                question = {},
                createdAt  = '',
                evaluationStatus = '',
                solution = {},
                marksAchieved ='',
                evaluationRemarks ='',
                assignment ={},
                approvalStatus,
                rejectionRemarks=[],
                achievedMarksBreakdown,
                pastSubmission=''
            }= data || {}
    
            setQuestionData({
                submittedBy : student?.fullName || "",
                submittedOn : getDateFromIsoString(createdAt),
                question : question?.title || "",
                description : question?.description || "",
                evaluationStatus : evaluationStatus || "",
                fileSolution : solution?.file || "",
                linkSolution : solution?.link || "",
                shortAnsSolution : solution?.["short-answer"] || "",
                metaData : question?.metadata || [],
                submissionTypes : question?.submissionType || [],
                marksAchieved,
                questionMark : question?.marks,
                evaluationRemarks,
                assignment : assignment,
                approvalStatus,
                rejectionRemarks: rejectionRemarks.pop(),
                achievedMarksBreakdown,pastSubmission
            })
            setIsLocked(evaluationStatus === ASSIGNMENT_STATUS.checked && approvalStatus === ASSIGNMENT_STATUS.approved)

            const isApplyingMarkingCriteria = assignment?.isApplyingMarkingCriteria
            setIsValidLinkSubmission(
                isApplyingMarkingCriteria &&
                question?.submissionType?.includes('link')
            )
            setIsLoading(false)
        }catch(error){
            console.log(error?.message || error)
            setIsLoading(false)
        }
    }

    useEffect(()=>{
        if(!isReady) return
        getSubmission();
    },[isReady])

    useEffect(()=>{
        if(!isReady) return
        if(topicsToConsider||topicsToIgnore){
            setEvalInstruct(true)
        }
    },[isReady])
    const {
        submittedBy = '',
        submittedOn = '',
        question = '',
        description = '',
        evaluationStatus = '',
        fileSolution = '',
        linkSolution = '',
        shortAnsSolution = '',
        metaData = [],
        assignment={},
        marksAchieved ='',
        evaluationRemarks = '',
        questionMark = '',
        approvalStatus,
        rejectionRemarks,
        achievedMarksBreakdown,
        pastSubmission
    } = questionData || {}

    async function handleCheckingSumission(feedback,marks,status, marksDistribution, maxMarks){

        let totalMarksAchieved = isValidLinkSubmission ? 0 : marks
        if(isValidLinkSubmission){
            for (const key in marksDistribution) {
                const assignedMark = marksDistribution?.[key]
                if (!assignedMark && assignedMark !== 0) {
                    setErrorMsg(`Please enter the Marks for ${MARKS_DISTRIBUTION_KEYS?.[key]} properly.`)
                    return; 
                }
                if(assignedMark > maxMarks?.[key]){
                    setErrorMsg(`Marks for ${MARKS_DISTRIBUTION_KEYS?.[key]}, can not be greater than ${maxMarks[key]}`)
                    return;
                }
                totalMarksAchieved+= assignedMark
            }
        }

        try{
            if(!feedback?.trim()){
                setErrorMsg('Please enter your feedback.')
                return
            }
            if(!totalMarksAchieved && totalMarksAchieved !== 0){
                setErrorMsg('Please enter the marks properly.')
                return
            }
            if(totalMarksAchieved>questionMark){
                setErrorMsg("Please give valid marks.")
                return
            }
            if(!isMarkingUpdated) {
                setErrorMsg('Please make some changes before submitting')
                return
            }
            await updateFstSubmisison({
                submissionId,
                marksAchieved : Number(totalMarksAchieved), 
                evaluationRemarks : feedback ,
                ...(isValidLinkSubmission && {
                    achievedMarksBreakdown : marksDistribution
                })
            })
            getSubmission();
            setEvalInstruct(false)  
        }catch(error){
            console.log(error?.message || error)
        }
        finally {
            setIsMarkingUpdated(false)
        }
    }
    if(isLoading){
        return <FstQuestionSubSkeleton/>
    }
    
    return (
    <div className={styles.mainWrapper}> 
        {(evalInstruct)&&(
                <MentorEvaluationInstructionModal topicsToConsider={topicsToConsider}
                    topicsToIgnore={topicsToIgnore} open={evalInstruct}/>
        )}
        <div className={styles.navigation}>
            <p onClick={()=>handleClickRedirect("assignment")}>{"FST Assignment >"}</p>
            <p onClick={()=>handleClickRedirect("check")}>{assignment?.title?.length>20 ? `${assignment?.title.slice(0,20)}... >`  : `${assignment?.title} >`}</p>
            <p>{question?.length>50 ? `${question.slice(0,50)}...` : question}</p>
        </div>

        <h4>Question : {question || ""}</h4>
            <div className={styles.submissionData}>
                <div>
                    <span>Submitted by : </span>
                    <span>{submittedBy || ""}</span>
                </div>
                <div>
                    <span>Submitted On : </span>
                    <span>{submittedOn || ""}</span>
                </div>
            </div>
            <p className={styles.questionText}>Description : {HtmlParser(description) || ""}</p>
            <div className={styles.examples}>
                {
                    metaData.map((data,index) => (
                        <div className={styles.example} key = {index}>
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

            <div className={styles.ansData}>
                <h6>Answer :</h6>
                {linkSolution?.length > 0 && <h5>Link Solution</h5>}
                {linkSolution?.length > 0 && 
                    <div className={styles.linkPicker} onClick={() => window.open(linkSolution,"_blank") } >
                        <LinkRoundedIcon style={{color:"blue"}}/>
                        <input className={styles.linkInput} value={linkSolution} readOnly />
                    </div>
                }
                {fileSolution?.length > 0 && <h5>File Solution</h5>}
                {fileSolution?.length > 0 && 
                    <div className={styles.linkPicker} onClick={() => window.open(fileSolution,"_blank") } >
                        <DescriptionIcon style={{color:"blue"}} sx={{fontSize:"1.2rem"}}/>
                        <input className={styles.linkInput} value={fileSolution} readOnly />
                    </div>    
                }
                {shortAnsSolution?.length > 0 && <h5>Short-Answer Solution</h5>}
                {shortAnsSolution?.length > 0 &&
                    <textarea 
                        disabled
                        value={shortAnsSolution || ""}
                        className = {styles.shortAns}
                    /> 
                }
                <FstQuestionReport
                    questionMark= {questionMark}
                    marksAchieved = {marksAchieved}
                    evaluationRemarks = {evaluationRemarks}
                    handleSubmit = {handleCheckingSumission}
                    errorMsg = {errorMsg}
                    setErrorMsg ={setErrorMsg}
                    evaluationStatus={evaluationStatus}
                    hasLinkSolution={linkSolution?.length > 0}
                    approvalStatus= {approvalStatus}
                    isLocked = {isLocked}
                    rejectionRemarks={rejectionRemarks?.remarks}
                    isValidLinkSubmission={isValidLinkSubmission}
                    PrevMarksDistribution = {achievedMarksBreakdown}
                    updateMarkingStatus = {updateMarkingStatus}
                    pastSubmission ={pastSubmission}
                    topicsToConsider={topicsToConsider}
                    topicsToIgnore={topicsToIgnore}
                    open={evalInstruct}
                />
            </div>
    </div>)
}