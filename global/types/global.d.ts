type SingleNumberString = "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "0";
type NumberStringTwoDigit = `${SingleNumberString}${SingleNumberString}`;
type NumberStringFourDigit = `${SingleNumberString}${SingleNumberString}${SingleNumberString}${SingleNumberString}`;

export type YYYY = NumberStringFourDigit;
export type MM = NumberStringTwoDigit;
export type DD = NumberStringTwoDigit;
