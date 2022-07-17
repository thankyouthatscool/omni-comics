import { app } from "electron";

export const getUserDataLocation = () => {
  return app.getPath("userData");
};
