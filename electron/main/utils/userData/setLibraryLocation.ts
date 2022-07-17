import { dialog } from "electron";

import { userDataStore } from "../..";

export const setLibraryLocation = () => {
  try {
    const newLibraryDirectory = dialog.showOpenDialogSync({
      properties: ["openDirectory"],
    })[0];

    userDataStore.set("libraryLocation", newLibraryDirectory);

    return newLibraryDirectory;
  } catch {
    console.log("No directory selected!");
  }
};
