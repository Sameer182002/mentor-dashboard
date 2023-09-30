import { toast } from 'react-toastify'
import { SlotText } from '../../atoms'
import styles from './session-slot-details.module.css'
import * as amplitude from '@amplitude/analytics-browser';

export function BookedSlotDetails({data}){
    const {name='',mobile='',date='',from='',to='',dyteMeetingLink='',isTimeToJoinMeet, cohortName = '', taName= '', studentId} = data || {}
    function handleClick(link){
        if(!isTimeToJoinMeet){
            toast.error('Join on time !!')
            return
        }
        if(cohortName){
            amplitude.init(process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY, studentId)
            amplitude.track('FST_DOUBT_SESSION_JOINED_TA', {
                studentName : name,
                studentPhone : mobile,
                batch : cohortName,
                doubtSessionDate : date,
                doubtSessionTime : `${from} - ${to}`,
                taName : taName,
                joiningTime : from
            }
            )
        }
        window.open(link,'_blank')
    }
    return (
        <div className={styles.slotDetailsWrapper}>
            <div className={styles.details}>
                <SlotText heading='Student Name' value={name}/>
                <SlotText heading='Phone Number' value={`+91-${mobile}`}/>
                <SlotText heading='Date' value={date} customStyle = {styles.dateStyle}/>
            </div>
            <div className={styles.timeWrapper}>
                <p>{from}</p>
                <h5>-</h5>
                <p>{to}</p>
            </div>
            <p className={styles.joinText} onClick={()=>handleClick(dyteMeetingLink)}>Click to Join</p>
        </div>
    )
}