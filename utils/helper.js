import { useState } from "react";

const isOnlyDigits = (text) => {
    return !/\D/.test(text);
};

export const isValidMobileNumber = (number) => {
    const numString = String(number).trim();
    return isOnlyDigits(numString) && numString.length <= 10
};
