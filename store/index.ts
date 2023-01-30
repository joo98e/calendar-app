import { CalendarSlice } from "@store/slice/Calendar.slice";
import { combineReducers, configureStore, PreloadedState } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";

export const rootReducer = combineReducers({
  calendarState: CalendarSlice.reducer
});

export const store = configureStore({
  reducer: rootReducer
});

export function setupStore(preloadedState?: PreloadedState<RootState>) {
  return configureStore({
    reducer: rootReducer,
    preloadedState
  });
}

export type RootState = ReturnType<typeof store.getState>;
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
