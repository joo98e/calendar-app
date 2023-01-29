export type SliceCalendarState = {
  title: string;
  description: string;
  schedules: Schedule[];
};

export interface DispatchActionAddSchedule extends Omit<Schedule, "uuid"> {}

const monthKey = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"] as const;
type MonthKey = (typeof monthKey)[number];

export interface Schedule {
  uuid: string;
  title: string;
  description: string;
  tagColor: string;
  date: DatePeriod;
}
