import { useState } from "react";

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

