import { useState } from 'react';
import style from './question-report.module.css'
import { Button } from '../../atoms';
import { checkSubmission } from '../../../apis';
import { useRouter } from 'next/router';
import { isOnlyDigits , isValidString} from '../../../utils/helper'


export function QuestionReport({data}) {
    const [inputWidth, setInputWidth] = useState('30px')
    const [marksAssigned,setMarksAssigned] = useState('');
    const [feedback,setFeedback] = useState('')
    const [errorMsg,setErrorMsg] = useState('')

    const {
        marks = '',
        evaluationStatus = '',
        submissionId = '',
    } = data || {}

    const router = useRouter()


    async function handleCheckingSumission () {

        if(!feedback || !isValidString(feedback)){
            setErrorMsg('Please enter your feedback.')
            return
        }
        if(!marksAssigned || marksAssigned > marks){
            setErrorMsg('Please enter the marks properly.')
            return
        }
        try{
            await checkSubmission({
                submissionId ,
                marksAchieved : Number(marksAssigned), 
                evaluationRemarks : feedback
            })
            router.back()
        }
        catch(err){
            console.log(err?.message || err)
        }
    }

    const handleChangeMarks = (e) => {
        if(!isOnlyDigits(e.target.value)) return
        setErrorMsg('')
        setMarksAssigned(e.target.value);
      if(e.target.value.length <=2){
        setInputWidth('30px')
        return
      }
      setInputWidth(e.target.value.length * 10 + 'px');
    };

    const handleChangeFeedback = (e) => {
        setErrorMsg('')
        setFeedback(e.target.value);
    };
  
    return (
        <div className={style.container}>
            <span>Report</span>
            <div className={style.status}>
                <span>Status :</span>
                <div>{evaluationStatus?.toUpperCase()}</div>
            </div>
            <div className={style.marksHolder}>
                <span>Marks :</span>
                <div>
                    <input 
                        className={style.marksInput}
                        style={{ 
                            height: '30px', 
                            width: inputWidth ,
                        }}
                        onChange={handleChangeMarks}
                        placeholder='_ _'
                        value={marksAssigned}
                      
                    /> / <span className={style.totalMarks}>{marks}</span>
                </div>
            </div>
            <div className={style.feedbackHolder}>
                <h5>Feedback</h5>
                <textarea  
                    spellCheck = {false}
                    onChange={handleChangeFeedback}
                />
            </div>
            {errorMsg && <p className={style.errorMsg}>{errorMsg}</p>}
            <Button 
                customStyle={style.submitBtn}
                buttonText='Submit'
                onClickAction={handleCheckingSumission}
            />
        </div>
    )
}