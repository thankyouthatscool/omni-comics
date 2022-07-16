import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserDataState {
  libraryContent: string[];
  libraryLocation: string | undefined;
  userDataLocation: string | undefined;
}

const initialState: UserDataState = {
  libraryContent: [],
  libraryLocation: undefined,
  userDataLocation: undefined,
};

export const userData = createSlice({
  name: "userData",
  initialState,
  reducers: {
    clearLibraryLocation: (state) => {
      state.libraryLocation = undefined;
    },
    setLibraryContent: (state, { payload }: PayloadAction<string[]>) => {
      state.libraryContent = payload;
    },
    setLibraryLocation: (state, { payload }: PayloadAction<string>) => {
      state.libraryLocation = payload;
    },
    setUserDataLocation: (state, { payload }: PayloadAction<string>) => {
      state.userDataLocation = payload;
    },
  },
});

export const {
  clearLibraryLocation,
  setLibraryContent,
  setLibraryLocation,
  setUserDataLocation,
} = userData.actions;

export default userData.reducer;
