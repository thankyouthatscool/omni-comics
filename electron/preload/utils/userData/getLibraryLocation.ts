import { ipcRenderer } from "electron";

export const getLibraryLocation = (): Promise<string> => {
  return ipcRenderer.invoke("getLibraryLocation");
};
