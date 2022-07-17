import { getLibraryDirectoryFileList } from ".";

export const getLibraryContent = async (libraryLocation: string) => {
  const libraryContent = await getLibraryDirectoryFileList(libraryLocation);

  return libraryContent;
};
