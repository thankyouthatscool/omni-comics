import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UiState {
  isViewerOpen: boolean;
}

const initialState: UiState = {
  isViewerOpen: false,
};

export const ui = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setViewerState: (state, { payload }: PayloadAction<boolean>) => {
      state.isViewerOpen = payload;
    },
  },
});

export const { setViewerState } = ui.actions;

export default ui.reducer;
