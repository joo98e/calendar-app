import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ActionAddScheduleRequest, SliceCalendarState } from "@store/slice/Calendar.slice.type";

const initialState: SliceCalendarState = {
  title: "",
  description: "",
  schedule: {
    "1": [],
    "2": [],
    "3": [],
    "4": [],
    "5": [],
    "6": [],
    "7": [],
    "8": [],
    "9": [],
    "10": [],
    "11": [],
    "12": [],
  },
};

const slice = createSlice({
  name: "CalendarState",
  reducers: {
    addSchedule: (state: SliceCalendarState, action: PayloadAction<ActionAddScheduleRequest>) => {
      console.log("ayaan", action.payload);
    },
  },
  initialState,
});

export { slice as CalendarSlice };
