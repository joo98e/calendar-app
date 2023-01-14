export type SliceCalendarState = {
  title: string;
  description: string;
  schedule: {
    [key in MonthKey]: Schedule[];
  };
};

export interface ActionAddScheduleRequest extends Schedule {}

const monthKey = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"] as const;
type MonthKey = (typeof monthKey)[number];

interface Schedule {
  title: string;
  description: string;
  startDate: string;
  endDate?: string;
}
