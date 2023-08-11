import { SlotText } from '../../atoms'
import styles from './session-slot-details.module.css'

export function BookedSlotDetails({data}){
    const {name='',mobile='',date='',from='',to='',dyteMeetingLink=''} = data || {}
    function handleClick(link){
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