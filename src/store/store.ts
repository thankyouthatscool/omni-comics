import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

import userData from "./userDataSlice";

export const store = configureStore({
  reducer: { userData },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
