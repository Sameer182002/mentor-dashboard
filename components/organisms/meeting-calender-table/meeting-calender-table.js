import { useEffect, useState } from "react";
import styles from "./meeting-calender-table.module.css";
import { MeetingCalendarDataRow } from "../../molecules/meeting-calendar-data-row/meeting-calendar-data-row";
import { getTaAvailability } from "../../../apis/mentor/get-ta-meeting-slots";
import { createArrayOfDates } from "../../../utils/helper";
import { useRecoilState } from "recoil";
import { taMeetingAvailabilityAtom } from "../../../recoil-states/ta-meeting-atom";
import axiosInstance from "../../../apis/axios";
import MeetingCalenderSkeleton from "./meeting-calender-skelton";
import { toast } from 'react-toastify';
import { TA_AVAILABILITY_STATUS } from "../../../utils/constants";

export function MeetingCalendarTable({ tableHeadings = [] }) {
  const [taMeetingAvailability, setTaMeetingAvailability] = useRecoilState(
    taMeetingAvailabilityAtom
  );
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isAllInputTimeSlotsAreValid, setIsAllInputTimeSlotsAreValid] = useState(true)
  const [isDataFetching, setIsDataFetching]= useState(false)

  useEffect(() => {
    async function getTaAvailabilityData() {
      try {
        if(!isLoading && !isDataFetching){
          return
        }
        const taWeeklyAvailabilityDetails = await getTaAvailability();

        const meetingData = [];
        const arrayOfDateTimestamps = createArrayOfDates();
        arrayOfDateTimestamps.forEach((date) => {
          const meetingDetailsOfDay = taWeeklyAvailabilityDetails.find((availabilityDetails) => availabilityDetails._id == date);
          if (meetingDetailsOfDay) {
            const hasBookingForTheDay = meetingDetailsOfDay?.slots?.find((slot) => slot.isLocked == true);
            meetingData.push({
              ...meetingDetailsOfDay,
              isLocked: !!hasBookingForTheDay,
              availabilityStatus: TA_AVAILABILITY_STATUS.available,
            });
          } else {
            meetingData.push({
              _id: date,
              slots: [],
              isLocked: false,
              availabilityStatus: TA_AVAILABILITY_STATUS.unavailable,
            });
          }
        });
        setTaMeetingAvailability(meetingData);
      } catch (error) {
        toast.error(error?.message || "something went wrong, please try again")
      }finally{
        setIsLoading(false)
        setIsDataFetching(false)
      }
    }
    getTaAvailabilityData();
  }, [isDataFetching]);

  async function handleOnSubmit() {
    try {
      if(isSubmitting || isDataFetching || !isAllInputTimeSlotsAreValid){
        return
      }
      let isAnyUpdationDone = false
      setIsSubmitting(true)
      const payload = {
        deletedSlotList: [],
        updatedSLotList: [],
        addedSlotList: [],
      };

      taMeetingAvailability.forEach((meetingData) => {
        const { slots = [], deletedSlots = [] } = meetingData;
        slots.forEach((timeSlot) => {
          if(timeSlot?.isOverlapping || timeSlot?.isInvalidTimeSlot || timeSlot?.isPastTime){
            throw new Error('Please correct or remove invalid time slots.')
          }
          if (timeSlot?.isNew) {
            payload.addedSlotList.push(timeSlot);
          } else if (timeSlot?.isEdited) {
            payload.updatedSLotList.push(timeSlot);
          }
        });

        deletedSlots.forEach((timeSlot) => {
          if (!timeSlot?.isNew) {
            payload.deletedSlotList.push(timeSlot._id);
          }
        });
      });
      if (payload?.deletedSlotList?.length) {
        isAnyUpdationDone = true;
        await axiosInstance.delete("ta-availability", {
          data: { taAvailabilitySlotId: payload.deletedSlotList },
        });
      }
      if (payload?.updatedSLotList?.length) {
        isAnyUpdationDone = true;
         await axiosInstance.put("ta-availability/slot", {
          data: payload.updatedSLotList,
        });
      }
      if (payload?.addedSlotList?.length) {
        isAnyUpdationDone = true;
        await axiosInstance.post("ta-availability", {
          data: payload.addedSlotList,
        });
      }
      if(isAnyUpdationDone){
        toast.success("Successfully Updated.")
      }
    } catch (error) {
      console.log(error.message)
      toast.error("There seems to be an issue in the data you have input. Kindly add your availability one by one")
    } finally{
      console.log(isSubmitting)
      setIsDataFetching(true)
      setIsSubmitting(false)
    }
  }

  useEffect(() => {
    function validateSlots(){
      let isAllTimeSlotsValid = true      

        for (let i = 0; i < taMeetingAvailability.length; i++) {
          const { slots = [] } = taMeetingAvailability[i] || {}
          slots.forEach((timeSlot) => {
            if(timeSlot?.isOverlapping || timeSlot?.isInvalidTimeSlot || timeSlot?.isPastTime){
              isAllTimeSlotsValid = false
            }
          });
          if(!isAllTimeSlotsValid){
            break;
          }
        }
      setIsAllInputTimeSlotsAreValid(isAllTimeSlotsValid)
    }
    validateSlots()
  }, [taMeetingAvailability]);

  if(isLoading) return <MeetingCalenderSkeleton/>
  return (
    <div className={styles.table}>
      <div className={styles.tableHead}>
        {Object.values(tableHeadings).map((heading, index) => (
          <span key={index}>{heading}</span>
        ))}
      </div>

      <div>
        {taMeetingAvailability.map((details, index) => (
          <MeetingCalendarDataRow
            details={details}
            key={index}
            rowIndex={index}
          />
        ))}
      </div>
      <button className={`${styles.submitBtn} ${!isAllInputTimeSlotsAreValid && styles.disabledButton}`} disabled={!isAllInputTimeSlotsAreValid} onClick={handleOnSubmit}>
        Save
      </button>
    </div>
  );
}
