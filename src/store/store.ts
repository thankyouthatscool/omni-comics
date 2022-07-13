import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

import ui from "./uiSlice";
import userData from "./useDataSlice";

export const store = configureStore({
  reducer: { ui, userData },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
