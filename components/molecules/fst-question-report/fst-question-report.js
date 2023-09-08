import { useState } from "react"
import { isOnlyDigits } from "../../../utils/helper"
import { Button } from "../../atoms"
import styles from "./fst-question-report.module.css"

export function FstQuestionReport({
    evaluationStatus = "",
    marksAchieved = "",
    questionMark = "",
    evaluationRemarks,
    handleSubmit,
    errorMsg,
    setErrorMsg
}){
    const [feedback, setFeedback] = useState(String(evaluationRemarks) || "")
    const [marks,setMarks] = useState(String(marksAchieved) || "")

    function handleInput(key,value){
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

    const statusMapping = {
        pending : "Not Checked",
        checked : "Checked",
    }

    return(
        <div className={styles.mainWrapper}>
            <h3>Report</h3>
            <div className={styles.statusWrapper}>
                <p>Status :</p>
                <p style={{backgroundColor: evaluationStatus=="checked" ? "green" : "#FF5932"}}>{statusMapping?.[evaluationStatus]}</p>
            </div>
            <div className={styles.marksWrapper}>
                <p>Marks :</p>
                <input 
                    type={"text"} 
                    placeholder={"_ _"} 
                    maxLength={String(questionMark).length == 1 ? 2 : String(questionMark).length}
                    onChange = {(e)=>handleInput("marks",e.target.value)}
                    value={marks }
                ></input>
                <p>{`/${questionMark}`}</p>
            </div>
            <div className={styles.feedbackWrapper}>
                <p>Feedback :</p>
                <textarea 
                    className={styles.feedbackInput} 
                    value={ feedback}  
                    onChange={(e)=>handleInput("feedback",e.target.value)
                    
                }
                />
            </div>
            {errorMsg && <p className={styles.errorMsg}>{errorMsg}</p>}
            <Button 
                customStyle={styles.submitBtn}
                buttonText='Submit'
                onClickAction={()=>handleSubmit(feedback,marks,evaluationStatus)}
            />
        </div>
    )
}