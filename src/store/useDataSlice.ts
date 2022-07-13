import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserDataState {
  libraryLocation: string | undefined;
}

const initialState: UserDataState = {
  libraryLocation: undefined,
};

export const userData = createSlice({
  name: "userData",
  initialState,
  reducers: {
    clearLibraryLocation: (state) => {
      state.libraryLocation = undefined;
    },
    setLibraryLocation: (state, { payload }: PayloadAction<string>) => {
      state.libraryLocation = payload;
    },
  },
});

export const { clearLibraryLocation, setLibraryLocation } = userData.actions;

export default userData.reducer;
