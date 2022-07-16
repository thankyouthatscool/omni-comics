import unrar from "electron-unrar-js";
import path from "path";

export const getRarFileContents = (comicBookPath: string) => {
  const { dir, ext, name } = path.parse(comicBookPath);
  const sourceFile = path.join(dir, `${name.trim()}${ext}`);
  const targetDirectory = path.join(dir, name.trim());
  const fileExtractor = unrar.createExtractorFromFile(
    sourceFile,
    targetDirectory
  );

  const rawList = fileExtractor.getFileList();

  console.log(rawList);

  const fileList = rawList[1].fileHeaders;

  const comicBookImages = fileList
    .map((file) => {
      return path.parse(file.name.trim());
    })
    .filter((file) => {
      return file.ext === ".jpg" || file.ext === ".png";
    })
    .sort((a, b) => a.name.trim().localeCompare(b.name.trim()));

  return comicBookImages;
};
