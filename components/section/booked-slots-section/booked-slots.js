import { BookedSlotDetails } from "../../molecules";
import styles from "./booked-slots.module.css"
export function BookedSlots({data=[]}){
    return(
        <div className={styles.bookedSlotsWrapper}>
            {data.map((slot,index)=>{
                return ( <BookedSlotDetails data = {slot} key={index}/>)
            })}
        </div>
    )
}