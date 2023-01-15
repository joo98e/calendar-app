import { useState } from "react";
import moment, { Moment } from "moment/moment";
import "moment/locale/ko";
import { GetWeeksInfoResult, WeeksInfo } from "./types";
import { Schedule } from "@store/slice/Calendar.slice.types";

export default function useCalendar() {
  const [currentMoment, setMoment] = useState<Moment>(moment());

  function dateFormat(format: string) {
    return currentMoment.format(format);
  }

  function getWeeksInfo(): GetWeeksInfoResult {
    const currentYear = currentMoment.year();
    const currentMonth = currentMoment.month() + 1;

    const result: GetWeeksInfoResult = {
      currentYear: currentYear,
      currentMonth: currentMonth,
      weeks: [],
    };

    const startWeekNum = currentMoment.clone().startOf("month").week();
    const endWeekNum =
      currentMoment.clone().endOf("month").week() === 1 ? 53 : currentMoment.clone().endOf("month").week();

    for (let currentWeekNum = startWeekNum; currentWeekNum <= endWeekNum; currentWeekNum++) {
      const currentWeekInfos: WeeksInfo = Array(7)
        .fill(0)
        .map((data, index) => {
          const days = currentMoment.clone().startOf("year").week(currentWeekNum).startOf("week").add(index, "day");
          const daysMonth = Number(days.month() + 1);

          return {
            year: days.year(),
            month: days.month() + 1,
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
    setMoment(currentMoment.clone().subtract(1, "month"));
  }

  function handleClickNextMonth() {
    setMoment(currentMoment.clone().add(1, "month"));
  }

  function getScheduleArrayByDate(scheduleDate: Date, schedules: Schedule[]): Schedule[] {
    if (!schedules.length) return;

    let result = [];
    const formattedScheduleDate = moment(scheduleDate).format("YYYY-MM-DD");

    schedules.map((schedule) => {
      const formattedStartDate = moment(schedule.date.startDate).format("YYYY-MM-DD");
      const formattedEndDate = moment(schedule.date.endDate).format("YYYY-MM-DD");

      const isAfterScheduleStartDate = formattedStartDate <= formattedScheduleDate;
      const isBeforeScheduleEndDate = formattedEndDate >= formattedScheduleDate;

      if (isAfterScheduleStartDate && isBeforeScheduleEndDate) {
        result.push(schedule);
      }
    });

    return result;
  }

  return {
    currentMoment: currentMoment,
    setMoment: setMoment,
    getFormat: dateFormat,
    getWeeksInfo: getWeeksInfo,
    handleClickPrevMonth: handleClickPrevMonth,
    handleClickNextMonth: handleClickNextMonth,
    getTodayScheduleArray: getScheduleArrayByDate,
  };
}
