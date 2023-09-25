import { Fragment, useEffect, useState } from "react"
import { splitMarksByPercentages, isOnlyDigits } from "../../../utils/helper"
import { Button } from "../../atoms"
import styles from "./fst-question-report.module.css"
import { ASSIGNMENT_EVALUATION_STATUS, ASSIGNMENT_STATUS } from "../../../utils/constants"
import { MarksDistributionTable } from "../mark-distribution-table/mark-distribution-table"

const MARKS_CRITERIA = [
    '40% of Max Marks: Marks on logic building',
    '20% of Max Marks: Marks for Communication',
    '20% of Max Marks: Marks if Screen is shared and video is on',
    '20% of Max Marks: Marks for Code Quality',
]
export function FstQuestionReport({
    evaluationStatus = "",
    marksAchieved = "",
    questionMark = "",
    evaluationRemarks,
    handleSubmit,
    errorMsg,
    setErrorMsg,
    hasLinkSolution = false,
    approvalStatus,
    isLocked,
    rejectionRemarks,
    isValidLinkSubmission = false,
    PrevMarksDistribution ,
    updateMarkingStatus = () => {},
    pastSubmission=''
}){
    const [feedback, setFeedback] = useState(String(evaluationRemarks) || "")
    const [marks,setMarks] = useState(String(marksAchieved) || "")
    const [marksDistribution, setMarksDistribution] = useState({
        'screenShareAndCameraScore' : '',
        'logicBuildingScore' : '',
        'effortScore' : '',
    })
    const [maxMarks, setMaxMarks] = useState(null)

    useEffect(() => {
        if(!PrevMarksDistribution) return
        setMarksDistribution(PrevMarksDistribution)
    },[PrevMarksDistribution])

    function handleInput(key,value){
        if(isLocked) return
        updateMarkingStatus()
        setErrorMsg("")
        if(key == "feedback"){
            setFeedback(value)
            return
        }
        if(key == "marks"){
            if(!isOnlyDigits(value)) return
            setMarks(value)
            return
        }
    }   
    const { checked,pending ,rejected} = ASSIGNMENT_STATUS
    
    function handleMarksInput (markkey, markAssigned) {
        setErrorMsg('')
        updateMarkingStatus()
        if(!isOnlyDigits(markAssigned)){
            return
        }
        setMarksDistribution({
            ...marksDistribution,
            [markkey] : markAssigned ? 
            Number(markAssigned) : ''
        })
    }

    const statusMapping = {
        pending : "Not Checked",
        checked : "Checked",
    }

    useEffect(() => {
        if(!questionMark) return
        const {
            fiftyPercent = '',
            twentyPercent = '',
            thirtyPercent = ''
        } = splitMarksByPercentages(questionMark)
        setMaxMarks({
            'screenShareAndCameraScore' : twentyPercent,
            'logicBuildingScore' : thirtyPercent,
            'effortScore' : fiftyPercent,
        })
    },[questionMark])

    function getStatusText(){
        if(approvalStatus === rejected) return ASSIGNMENT_EVALUATION_STATUS.rejected
        if(evaluationStatus == pending && pastSubmission) return ASSIGNMENT_EVALUATION_STATUS.reSubmit
        return ASSIGNMENT_EVALUATION_STATUS?.[evaluationStatus]
    }

    return(
        <div className={styles.mainWrapper}>
            <h3>Report</h3>
            <div className={styles.statusWrapper}>
                <p>Status :</p>
                <p className={styles.evaluationStatus} style={{backgroundColor : evaluationStatus == checked ? "green" : "#FF5932", ...( approvalStatus == rejected && {backgroundColor: 'red'}) }}>{getStatusText()}</p>
            </div>
            {(approvalStatus === rejected && rejectionRemarks) && 
                <div className={styles.rejectedRemarks}>
                    <p> <span className={styles.rejectedRemarksPrefix}> Area of improvement:</span> {rejectionRemarks}</p>
                </div>}

            <div className={isValidLinkSubmission ? styles.distributedMarksWrapper : styles.marksWrapper}>
                <p className={styles.marksHead}>Marks :</p>
                {isValidLinkSubmission && <p>TOTAL MARKS : {questionMark}</p>}

                {
                    !isValidLinkSubmission &&
                    <Fragment>
                        <input 
                            type={"text"} 
                            placeholder={"_ _"} 
                            maxLength={String(questionMark).length == 1 ? 2 : String(questionMark).length}
                            onChange = {(e)=>handleInput("marks",e.target.value)}
                            value={marks}
                            disabled = {isLocked}
                            className={styles.defaultInput}
                        ></input>
                        <p>{`/${questionMark}`}</p>
                    </Fragment>
                }
                {
                    isValidLinkSubmission && (
                        <div className={styles.marksDistrubution}>
                            <MarksDistributionTable 
                                marksPercentage = {splitMarksByPercentages(questionMark)}
                                handleMarksInput = {handleMarksInput}
                                marksDistrubution = {marksDistribution}
                                isLocked = {isLocked}
                            />
                        </div>
                    )
                }
            </div>
            <div className={styles.feedbackWrapper}>
                <p>Feedback :</p>
                <textarea 
                    className={styles.feedbackInput} 
                    value={ feedback}  
                    onChange={(e)=>handleInput("feedback",e.target.value)}
                    readOnly={isLocked}
                />
            </div>
            {errorMsg && <p className={styles.errorMsg}>{errorMsg}</p>}
            <Button 
                customStyle={`${styles.submitBtn} ${isLocked && styles.disabledBtn}`}
                buttonText='Submit'
                onClickAction={()=> !isLocked && handleSubmit(
                    feedback ,
                    marks ,
                    evaluationStatus ,
                    marksDistribution ,
                    maxMarks
                )}
            />
        </div>
    )
}