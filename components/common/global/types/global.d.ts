declare global {
  type SingleNumberString = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";
  type NumberStringTwoDigit = `${SingleNumberString}${SingleNumberString}`;
  type NumberStringFourDigit = `${SingleNumberString}${SingleNumberString}${SingleNumberString}${SingleNumberString}`;

  export type YYYY = NumberStringFourDigit;
  export type MM = NumberStringTwoDigit;
  export type DD = NumberStringTwoDigit;

  export type DatePeriod = {
    startDate?: string;
    endDate?: string;
  };
}

export {};
