import { useState } from "react";
import moment, { Moment } from "moment/moment";
import "moment/locale/ko";
import { GetWeeksInfoResult, WeeksInfo } from "./types";

moment.locale("ko");

export default function useCalendar() {
  const [getMoment, setMoment] = useState<Moment>(moment());

  function dateFormat(format: string) {
    return getMoment.format(format);
  }

  function getWeeksInfo(): GetWeeksInfoResult {
    const currentYear = getMoment.year();
    const currentMonth = getMoment.month() + 1;

    const result: GetWeeksInfoResult = {
      currentYear: currentYear,
      currentMonth: currentMonth,
      weeks: [],
    };

    const startWeekNum = getMoment.clone().startOf("month").week();
    const endWeekNum = getMoment.clone().endOf("month").week() === 1 ? 53 : getMoment.clone().endOf("month").week();

    for (let currentWeekNum = startWeekNum; currentWeekNum <= endWeekNum; currentWeekNum++) {
      const currentWeekInfos: WeeksInfo = Array(7)
        .fill(0)
        .map((data, index) => {
          const days = getMoment.clone().startOf("year").week(currentWeekNum).startOf("week").add(index, "day");
          const daysMonth = Number(days.month() + 1);

          return {
            d: days.format("dddd"),
            D: Number(days.format("D")),
            thisMonthIs: currentMonth === daysMonth ? "This" : currentMonth > daysMonth ? "Last" : "Next",
          };
        });

      result.weeks.push(currentWeekInfos);
    }

    return result;
  }

  function handleClickPrevMonth() {
    setMoment(getMoment.clone().subtract(1, "month"));
  }

  function handleClickNextMonth() {
    setMoment(getMoment.clone().add(1, "month"));
  }

  return {
    getMoment: getMoment,
    setMoment: setMoment,
    getFormat: dateFormat,
    getWeeksInfo: getWeeksInfo,
    handleClickPrevMonth: handleClickPrevMonth,
    handleClickNextMonth: handleClickNextMonth,
  };
}
