import { useState } from "react"
import { isOnlyDigits } from "../../../utils/helper"
import { Button } from "../../atoms"
import styles from "./fst-question-report.module.css"
import { ASSIGNMENT_EVALUATION_STATUS, ASSIGNMENT_STATUS } from "../../../utils/constants"

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
    rejectionRemarks
}){
    const [feedback, setFeedback] = useState(String(evaluationRemarks) || "")
    const [marks,setMarks] = useState(String(marksAchieved) || "")

    function handleInput(key,value){
        if(isLocked) return
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
    const { checked, rejected} = ASSIGNMENT_STATUS

    return(
        <div className={styles.mainWrapper}>
            <h3>Report</h3>
            <div className={styles.statusWrapper}>
                <p>Status :</p>
                <p className={styles.evaluationStatus} style={{backgroundColor : evaluationStatus == checked ? "green" : "#FF5932", ...( approvalStatus == rejected && {backgroundColor: 'red'}) }}>{approvalStatus === rejected ? ASSIGNMENT_EVALUATION_STATUS.rejected : ASSIGNMENT_EVALUATION_STATUS?.[evaluationStatus]}</p>
            </div>
            {(approvalStatus === rejected && rejectionRemarks) && 
                <div className={styles.rejectedRemarks}>
                    <p> <span className={styles.rejectedRemarksPrefix}> Area of improvement:</span> {rejectionRemarks}</p>
                </div>}
            {hasLinkSolution ? 
                <div className={styles.marksCriteria}>
                    <p>Evaluation Criteria: </p>
                    <ul>
                        {MARKS_CRITERIA.map(point => (
                            <li key={point} className={styles.list}>{point}</li>
                            ))}
                    </ul>
                    <div className={styles.marks}>
                    <p>Enter total marks here :</p>
                        <input 
                            type={"text"} 
                            placeholder={"_ _"} 
                            maxLength={String(questionMark).length == 1 ? 2 : String(questionMark).length}
                            onChange = {(e)=>handleInput("marks",e.target.value)}
                            value={marks }
                            readOnly={isLocked}
                        ></input>
                        <p>{`/${questionMark}`}</p>
                    </div>
                </div>
                : 
                <div className={styles.marksWrapper}>
                    <p>Marks :</p>
                    <input 
                        type={"text"} 
                        placeholder={"_ _"} 
                        maxLength={String(questionMark).length == 1 ? 2 : String(questionMark).length}
                        onChange = {(e)=>handleInput("marks",e.target.value)}
                        value={marks }
                        readOnly={isLocked}
                    ></input>
                    <p>{`/${questionMark}`}</p>
                </div>
                }
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
                onClickAction={()=>{
                   !isLocked && handleSubmit(feedback,marks,evaluationStatus)
                }}
            />
        </div>
    )
}