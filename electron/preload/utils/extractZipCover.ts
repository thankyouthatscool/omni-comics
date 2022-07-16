import AdmZip from "adm-zip";

export const extractZipCover = (
  comicBookPath: string,
  coverDirectory: string
) => {
  const zipper = new AdmZip(comicBookPath);

  const archiveContent = zipper.getEntries();

  const archiveFiles = archiveContent.filter((entry) => !entry.isDirectory);

  zipper.extractEntryTo(archiveFiles[0].entryName, coverDirectory, false, true);

  return archiveFiles[0].name;
};
