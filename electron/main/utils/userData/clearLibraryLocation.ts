import { userDataStore } from "../..";

export const clearLibraryLocation = () => {
  userDataStore.delete("libraryLocation");
};
