import { ipcRenderer } from "electron";

export const setLibraryLocation = (): Promise<string> => {
  return ipcRenderer.invoke("setLibraryLocation");
};
