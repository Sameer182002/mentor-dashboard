import { useState } from "react";
import { DAYS_OF_WEEK, ONE_HOUR_IN_MS, ONE_MINUTE_IN_MS } from "./constants";

export const isOnlyDigits = (text) => {
    return !/\D/.test(text);
};

export const isValidMobileNumber = (number) => {
    const numString = String(number).trim();
    return isOnlyDigits(numString) && numString.length <= 10
};
export function getDateFromIsoString (dateString) {
    if(!isValidString(dateString)){
        return '';
    }
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString(undefined, {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric'
    });
    return formattedDate;
}

export function isValidString (inputString) {
    if (typeof inputString === 'undefined' || inputString === null) return false
    if (typeof inputString === 'string' && inputString.trim().length === 0) return false
    return true;
}

export function getTimeInTwelveHoursFormat(timestamp){
    if(!timestamp) return
    const date = new Date(timestamp);
    let hours = date.getHours() % 12;
    hours = hours === 0 ? 12 : hours;
    if(hours < 10){
        hours = `0${hours}`
    }
    const minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
    const meridiem = date.getHours() >= 12 ? 'pm' : 'am';
    return `${hours}:${minutes}${meridiem}`
}
export const getRedableDateFormat = (timestamp) => {
    if(!timestamp) return
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = date.getDate();
    let hours = date.getHours() % 12;
    hours = hours === 0 ? 12 : hours;
    const dayName = DAYS_OF_WEEK[date.getDay()]
    const slotsAvailabilityDate =  `${dayName}, ${day}/${month}/${year}`
    const nextSevenDays = new Date(date);
    nextSevenDays.setDate(date.getDate() + 6);

    return {slotsAvailabilityDate, formattedDateWithoutTime:`${year}-${month}-${day}`  }
}

export const  convertTimeToTimestamp = (inputTime, date) => {
    if(!inputTime || !date) return false
    const [time, meridiem] = inputTime.split(/(?<=\d)\s*(am|pm)/i);
    if(!meridiem || !['am', 'pm'].includes(meridiem?.toLowerCase())){
        return false
    }
    let [hours, minutes] = time.split(':');
    hours= Number(hours)
    minutes= Number(minutes)
    if((hours > 12) || (hours < 0) || (minutes > 59) || (minutes < 0)){
        return false
    }
    let timestamp = Date.parse(getRedableDateFormat(date)?.formattedDateWithoutTime+ ' ' + '00:00')

    if(hours == 12){
        hours = 0
    }
    if (meridiem.toLowerCase() === 'pm') {
      timestamp = timestamp + ((hours + 12) * ONE_HOUR_IN_MS) + (minutes * ONE_MINUTE_IN_MS)
    } else {
        timestamp = timestamp + (hours * ONE_HOUR_IN_MS)+ (minutes * ONE_MINUTE_IN_MS)
    }
    return timestamp;
  };

  export const createArrayOfDates = () => {
    const currentDate = new Date();
    const datesArray = [];
  
    for (let i = 0; i < 7; i++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + i);
      date.setHours(0, 0, 0, 0); 
      datesArray.push(date.getTime());
    }
  
    return datesArray;
  }
  export const checkOverlapingTimeSlots = (timeSlots) => {
    const slots = timeSlots.slice();
    for (let i = 0; i < slots.length; i++) {
        slots[i] = {...slots[i], isOverlapping: false}
        let {from: startA, to: endA } =  slots[i]
        for (let j = 0; j < slots.length; j++) {
            let {from: startB, to: endB } =  slots[j]
            if(i != j)
            if(i !== j && (Math.max(startA, startB) <= Math.min(endA, endB)))
            {
                slots[i] = {...slots[i], isOverlapping: true}

                break;
            }
          }
      }
      return slots;
  }

 export const roundUpToNearest15Minutes = () => {
    const currentTime = getTimeInTwelveHoursFormat(new Date().getTime()) || ''
    const timeComponents = currentTime.match(/(\d{2}):(\d{2})([ap]m)/);
    let hour = parseInt(timeComponents[1]);
    let minute = parseInt(timeComponents[2]);

    const remainder = minute % 15;

    if (remainder !== 0 && remainder !== 5) {
        minute = minute + (15 - remainder);
        if (minute >= 60) {
            minute = 0;
            hour += 1;
            if (hour === 12 || hour === 24) {
                timeComponents[3] = timeComponents[3] === 'am' ? 'pm' : 'am';
            }
        }
    }
    const formattedHour = hour.toString().padStart(2, '0');
    const formattedMinute = minute.toString().padStart(2, '0');
    const roundedTime = `${formattedHour}:${String(formattedMinute).padStart(2, '0')}${timeComponents[3]}`;

    return roundedTime;
}
 
  
