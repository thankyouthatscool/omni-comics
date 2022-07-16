import unrar from "electron-unrar-js";
import path from "path";

export const getRarCover = (
  comicBookPath: string,
  page: path.ParsedPath,
  userDataLocation: string
) => {
  console.log(comicBookPath);
  console.log(page);
  console.log(userDataLocation);

  const { dir, ext, name } = path.parse(comicBookPath);

  const pagePath = path.join(page.dir, `${page.name.trim()}${page.ext}`);
  const sourceFile = path.join(dir, `${name.trim()}${ext}`);
  const targetDirectory = path.join(
    `${userDataLocation}/covers`,
    `[COVER]-${name.trim()}`
  );

  const fileExtractor = unrar.createExtractorFromFile(
    sourceFile,
    targetDirectory
  );

  fileExtractor.extractFiles([pagePath]);
};
