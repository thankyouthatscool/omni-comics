import { ipcRenderer } from "electron";

export const getUserDataLocation = (): Promise<string> => {
  return ipcRenderer.invoke("getUserDataLocation");
};
