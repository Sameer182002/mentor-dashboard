import { Fragment, useEffect, useState } from "react";
import styles from "./time-slots.module.css";
import { TimePicker } from "../time-picker/time-picker";
import {
  checkOverlapingTimeSlots
} from "../../../utils/helper";
import { deleteIcon } from "../../../public/svgs";
import Image from "next/image";
import { taMeetingAvailabilityAtom } from "../../../recoil-states/ta-meeting-atom";
import { useRecoilState } from "recoil";
import { ONE_MINUTE_IN_MS } from "../../../utils/constants";


export function TimeSlots({
  to,
  from,
  date,
  index,
  taSessionSlot,
  rowIndex,
  isOverlapping,
  isInvalidTimeSlot,
  timeArray,
  isPastTime
}) {
  const [bookedSessionCount, setBookedSessionCount] = useState(0);
  const [taMeetingAvailability, setTaMeetingAvailability] = useRecoilState(taMeetingAvailabilityAtom)

  function handleTimeChange(time, field) {
    if (!time) {
      return;
    }
    const updatedTaMeetingAvailability = [...taMeetingAvailability]
    let updatedTaMeetingSlots = [...updatedTaMeetingAvailability[rowIndex].slots]
    updatedTaMeetingSlots[index] = {...updatedTaMeetingSlots[index], [field]: time, isOverlapping: false, isEdited: true, isInvalidTimeSlot:false, isPastTime: false}
    if((updatedTaMeetingSlots[index].from >= updatedTaMeetingSlots[index].to) || ((updatedTaMeetingSlots[index].to - updatedTaMeetingSlots[index].from) < (15*ONE_MINUTE_IN_MS))){
      updatedTaMeetingSlots[index].isInvalidTimeSlot= true
    }
    if((updatedTaMeetingSlots[index].from <= new Date().getTime())){
      updatedTaMeetingSlots[index].isPastTime= true
    }
    updatedTaMeetingSlots = checkOverlapingTimeSlots(updatedTaMeetingSlots)
    updatedTaMeetingAvailability[rowIndex] = {...updatedTaMeetingAvailability[rowIndex], slots: updatedTaMeetingSlots}
    setTaMeetingAvailability(updatedTaMeetingAvailability)

    return true
  }
  
  useEffect(() => {
    let count = 0
    taSessionSlot.forEach((element) => {
      if (element.isBooked) {
        count++
      }
    });
    setBookedSessionCount(count);
  }, [taMeetingAvailability]);

  function handleDeleteSlots(){
    const updatedTaMeetingAvailability = [...taMeetingAvailability]
    let updatedTaMeetingSlots = [...updatedTaMeetingAvailability[rowIndex].slots]
    let [deletedSlot] = updatedTaMeetingSlots.splice(index, 1)
    updatedTaMeetingSlots = checkOverlapingTimeSlots(updatedTaMeetingSlots)
    if(deletedSlot.isNew && (deletedSlot.isOverlapping || deletedSlot.isInvalidTimeSlot)){
      updatedTaMeetingAvailability[rowIndex] = {...updatedTaMeetingAvailability[rowIndex], slots: updatedTaMeetingSlots}
    } else{
      updatedTaMeetingAvailability[rowIndex] = {...updatedTaMeetingAvailability[rowIndex], slots: updatedTaMeetingSlots, deletedSlots: [...(updatedTaMeetingAvailability[rowIndex].deletedSlots || []), deletedSlot]}
    }
    setTaMeetingAvailability(updatedTaMeetingAvailability)
  }


  return (
    <Fragment>
    <div className={styles.dateRangeDetail}>
      <TimePicker
        key={"from"}
        field={"from"}
        date={date}
        handleTimeChange={handleTimeChange}
        time={from}
        isEditable={bookedSessionCount}
        timeArray={timeArray}
      />
      <p className={styles.dash}>-</p>
      <TimePicker
        key={"to"}
        field={"to"}
        date={date}
        handleTimeChange={handleTimeChange}
        time={to}
        index={index}
        isEditable={!!bookedSessionCount}
        timeArray={timeArray}
      />
      {!bookedSessionCount ? (
        <picture className={styles.deleteIcon} onClick={handleDeleteSlots}>
          <Image src={deleteIcon} height={"100%"} width={"100%"} />
        </picture>
      ) : (
        <p className={styles.sessionInfo}>
          {`${bookedSessionCount} Session Booked.`}
        </p>
      )}
    </div>
    {isOverlapping && <p className={styles.ovelapWarn}>Times overlap with another sets of times.</p>}
    {(!isOverlapping && isInvalidTimeSlot) && <p className={styles.ovelapWarn}>Choose end time 15 mins later than start time.</p>}
    {(!isOverlapping && !isInvalidTimeSlot && isPastTime) && <p className={styles.ovelapWarn}>Please select a future time.</p>}
    </Fragment>
  );
}
