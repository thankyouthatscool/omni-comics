import { readdirSync, statSync } from "fs";
import { join, parse } from "path";

export const getLibraryDirectoryFileList = async (libraryDir: string) => {
  const FILES: string[] = [];

  const readDirContent = (outerDir: string) => {
    readdirSync(outerDir).forEach((innerDir) => {
      const absDir = join(outerDir, innerDir);
      if (statSync(absDir).isDirectory()) {
        return readDirContent(absDir);
      } else {
        if (parse(absDir).ext === ".cbr" || parse(absDir).ext === ".cbz") {
          return FILES.push(absDir);
        }
      }
    });
  };

  readDirContent(libraryDir);

  return FILES;
};
