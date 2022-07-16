import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UiState {
  isViewerOpen: boolean;
  selectedSeries: string | null;
}

const initialState: UiState = {
  isViewerOpen: false,
  selectedSeries: null,
};

export const ui = createSlice({
  name: "ui",
  initialState,
  reducers: {
    clearSelectedSeries: (state) => {
      state.selectedSeries = null;
    },
    setSelectedSeries: (state, { payload }: PayloadAction<string>) => {
      state.selectedSeries = payload;
    },
    setViewerState: (state, { payload }: PayloadAction<boolean>) => {
      state.isViewerOpen = payload;
    },
  },
});

export const { clearSelectedSeries, setSelectedSeries, setViewerState } =
  ui.actions;

export default ui.reducer;
