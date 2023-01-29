import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import uuid from "react-uuid";
import { DispatchActionAddSchedule, SliceCalendarState } from "@store/slice/Calendar.slice.types";

const initialState: SliceCalendarState = {
  title: "",
  description: "",
  schedules: [
    {
      uuid: "123",
      title: " goods",
      description: "test",
      tagColor: "#d9d9d9",
      date: {
        startDate: "2023-01-14",
        endDate: "2023-01-16",
      },
    },
  ],
};

const slice = createSlice({
  name: "CalendarState",
  reducers: {
    addSchedule: (state: SliceCalendarState, action: PayloadAction<DispatchActionAddSchedule>) => {
      state.schedules.push({
        ...action.payload,
        uuid: uuid(),
      });
    },
    removeSchedule() {},
  },
  initialState,
});

const actions = slice.actions;

export { slice as CalendarSlice, actions as CalendarActions };
