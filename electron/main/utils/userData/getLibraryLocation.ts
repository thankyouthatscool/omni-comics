import { userDataStore } from "../..";

export const getLibraryLocation = () => {
  return userDataStore.get("libraryLocation");
};
