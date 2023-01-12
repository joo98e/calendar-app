export interface GetWeeksInfoResult {
  currentYear: number;
  currentMonth: number;
  weeks: WeeksInfo[];
}

export type WeeksInfo = DayInfo[];

interface DayInfo {
  d: string;
  D: number;
  thisMonthIs: ThisMonthIs;
}

export type ThisMonthIs = "PREV" | "CURRENT" | "NEXT";
