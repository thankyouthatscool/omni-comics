import { ipcRenderer } from "electron";

export const clearLibraryLocation = () => {
  return ipcRenderer.invoke("clearLibraryLocation");
};
