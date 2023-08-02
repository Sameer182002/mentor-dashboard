import { DropdownV1 } from "../../atoms/dropdown-v1/dropdown-v1";
import styles from "./meeting-calendar-data-row.module.css";
import { addIcon } from "../../../public/svgs/index";
import { Fragment, useEffect, useState } from "react";
import Image from "next/image";
import { TimeSlots } from "../../atoms/time-slots/time-slots";
import { checkOverlapingTimeSlots, getRedableDateFormat, roundUpToNearest15Minutes } from "../../../utils/helper";
import { taMeetingAvailabilityAtom } from "../../../recoil-states/ta-meeting-atom";
import { useRecoilState } from "recoil";
import { ONE_HOUR_IN_MS, TA_AVAILABILITY_STATUS } from "../../../utils/constants";
import { TIME_ARRAY } from "../../../utils/constants";

const getNextSlot = (timeSlots=[], date) => {

  let slots = timeSlots.slice();
  slots.sort((slotA, slotB) => slotA.from - slotB.from);
  const lastSlot = slots.pop()
  
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);
  if(currentDate.getTime() == date && (!lastSlot?.from || (lastSlot?.from < Date.now()))){
    return {from: (Date.now() + ONE_HOUR_IN_MS), to: (Date.now() + (ONE_HOUR_IN_MS * 2)), isNew: true, date}
  }

  if(!timeSlots.length || ((lastSlot?.to + (ONE_HOUR_IN_MS * 2)) >= (date + (24 * ONE_HOUR_IN_MS)))){
    return {from: (date + ONE_HOUR_IN_MS), to: (date + (ONE_HOUR_IN_MS * 2)), isNew: true, date}
  }
  return {from: (lastSlot?.to + ONE_HOUR_IN_MS), to: (lastSlot?.to + (ONE_HOUR_IN_MS * 2)), isNew: true, date}
}

export function MeetingCalendarDataRow({details = {},rowIndex}) {
  const {_id: date} = details;

  let timeArray = TIME_ARRAY

  const [availability, setAvailability] = useState(details.availabilityStatus);
  const [taMeetingAvailability, setTaMeetingAvailability] = useRecoilState(taMeetingAvailabilityAtom);

  useEffect(() => {
    setAvailability(details.availabilityStatus)
  }, [details.availabilityStatus]);
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);
  if(currentDate.getTime() == date){
    const currentNearestTime = roundUpToNearest15Minutes()
    const indexOfNearestTime = TIME_ARRAY.indexOf(currentNearestTime)
    if(indexOfNearestTime != -1){
      timeArray = TIME_ARRAY.slice(indexOfNearestTime)
    }
  }

  function handleAddSlots() {
    const updatedTaMeetingAvailability = [...taMeetingAvailability];
    let timeSlot = getNextSlot(updatedTaMeetingAvailability[rowIndex].slots, updatedTaMeetingAvailability[rowIndex]._id)
    let availableTimeSlots = checkOverlapingTimeSlots([...updatedTaMeetingAvailability[rowIndex].slots, timeSlot])
    updatedTaMeetingAvailability[rowIndex] = {
      ...updatedTaMeetingAvailability[rowIndex],
      slots:availableTimeSlots
    };
    setTaMeetingAvailability(updatedTaMeetingAvailability);
  }

  function handleAvailablityChange(value) {
    if (availability === value) {
      return;
    }
    if (details.isLocked) {
      return;
    }
    let newTaSlotsAvailabilityData = [...taMeetingAvailability];
    if (value === TA_AVAILABILITY_STATUS.unavailable) {
      const {slots=[], deletedSlots=[]} = newTaSlotsAvailabilityData[rowIndex]
      newTaSlotsAvailabilityData[rowIndex] = {
        ...newTaSlotsAvailabilityData[rowIndex],
        slots:[],
        deletedSlots:[...slots, ...deletedSlots],
        isMarkedDeleted: true,
        availabilityStatus: value,
      };
      setTaMeetingAvailability(newTaSlotsAvailabilityData);
    }
    if (value === TA_AVAILABILITY_STATUS.available) {
      if (newTaSlotsAvailabilityData[rowIndex]?.deletedSlots?.length) {
      const {slots=[], deletedSlots=[]} = newTaSlotsAvailabilityData[rowIndex]
        newTaSlotsAvailabilityData[rowIndex] = {
          ...newTaSlotsAvailabilityData[rowIndex],
          slots:[...slots, ...deletedSlots],
          deletedSlots: [],
          isMarkedDeleted: false,
          availabilityStatus: value,
        };
        setTaMeetingAvailability(newTaSlotsAvailabilityData);
      } else {
        newTaSlotsAvailabilityData[rowIndex] = {
          ...newTaSlotsAvailabilityData[rowIndex],
          isMarkedDeleted: false,
          availabilityStatus: value,
          slots: [
            {
              to: newTaSlotsAvailabilityData[rowIndex]._id + ONE_HOUR_IN_MS,
              from: newTaSlotsAvailabilityData[rowIndex]._id,
              date: newTaSlotsAvailabilityData[rowIndex]._id,
              isNew: true
            },
          ],
        };
        setTaMeetingAvailability(newTaSlotsAvailabilityData);
      }
    }

    setAvailability(value);
  }


  return (
    <Fragment>
      <div className={styles.tableRow}>
        <div className={styles.date}>
          {getRedableDateFormat(date)?.slotsAvailabilityDate}
        </div>
        <div>
          <DropdownV1
            availability={availability}
            handleDropdownChange={handleAvailablityChange}
            isDisabled ={details.isLocked}
          />
        </div>
        <div className={styles.slots}>
          {availability == TA_AVAILABILITY_STATUS.available ? (
            <Fragment>
              <div className={styles.addSlots}>
                {details.slots.map(
                  ({ to, from, date, taSessionSlot = [], isOverlapping=false, isInvalidTimeSlot=false, isPastTime=false }, index) => (
                    <TimeSlots
                      date={date}
                      to={to}
                      from={from}
                      taSessionSlot={taSessionSlot}
                      index={index}
                      rowIndex={rowIndex}
                      key={index}
                      isOverlapping={isOverlapping}
                      isInvalidTimeSlot={isInvalidTimeSlot}
                      timeArray={timeArray}
                      isPastTime={isPastTime}
                    />
                  )
                )}
              </div>
              <Image
                src={addIcon}
                className={styles.addBtn}
                onClick={handleAddSlots}
              />
            </Fragment>
          ) : (
            <div className={styles.date}>
              Please change the availability status
            </div>
          )}
        </div>
      </div>
      <div className={styles.borderBottom}></div>
    </Fragment>
  );
}
