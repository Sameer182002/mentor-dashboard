import React, { useEffect, useRef, useState } from "react";
import styles from "./time-picker.module.css";
import { convertTimeToTimestamp, getTimeInTwelveHoursFormat } from "../../../utils/helper";

export function TimePicker({ handleTimeChange, field, time, date, index, isEditable, timeArray }) {

  const timeInputRef = useRef(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [inputTime, setInputTime] = useState(getTimeInTwelveHoursFormat(time))


  const handleDateChange = () => {
    if(isEditable){
      return
    }
    setIsDropdownOpen(true);
    timeInputRef.current.style.display = "block";
  };

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (
        isDropdownOpen &&
        timeInputRef.current &&
        !timeInputRef.current.contains(e.target)
      ) {
        setIsDropdownOpen(false);
        timeInputRef.current.style.display = "none";
      }
    };
  
    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [isDropdownOpen]);

  useEffect(() => {
    setInputTime(getTimeInTwelveHoursFormat(time))
  }, [time])

  function handleTimeSelection(){
    
    if(isDropdownOpen) return
    const ts = convertTimeToTimestamp(inputTime, date)
    if(!ts){
      setInputTime(getTimeInTwelveHoursFormat(time))
      return
    }
    if(ts == time){
      return
    }
    handleTimeChange(convertTimeToTimestamp(inputTime, date), field)
  }

  function handleDropdownSelection(selectedTime){
    const ts = convertTimeToTimestamp(selectedTime, date)
    if(!ts){
      setInputTime(getTimeInTwelveHoursFormat(time))
      return
    }
    if(ts == time){
      return
    }
    handleTimeChange(convertTimeToTimestamp(selectedTime, date), field)
  }
  return (
    <div 
    >
      <input
        className={styles.timeWrapper}
        type="text"
        onClick={handleDateChange}
        onChange={(e) => setInputTime(e.target.value)}
        onBlur={handleTimeSelection}
        value={inputTime}
        readOnly={isEditable}
      />
      <div className={styles.timeDropdown} ref={timeInputRef}>
        {timeArray.map((timeVal, index) => (
          <p
            className={styles.time}
            key={index}
            onClick={() => {
              handleDropdownSelection(timeVal);
              timeInputRef.current.style.display = "none";
            }}
          >
            {timeVal}
          </p>
        ))}
      </div>
    </div>
  );
}
