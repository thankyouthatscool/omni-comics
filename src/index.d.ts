interface Window {
  readonly comicBooks: {
    getCover: (
      comicBookPath: string,
      userDataLocation: string
    ) => Promise<{ base64ImageRepresentation: any; coverPageInfo: any }>;
    getLibraryContent: (libraryLocation: string) => Promise<string[]>;
    parseComicPath: (comicPath: string) => {
      issue: string;
      series: string;
      title: string;
    };
  };
  readonly rar: {
    getBookPage: (comicBookPath: string, page: path.ParsedPath) => string;
    getFileList: (comicBookPath: string) => path.ParsedPath[];
    unrarThis: (comicBookPath: string) => void;
  };
  readonly userData: {
    clearLibraryLocation: () => void;
    getLibraryLocation: () => Promise<string>;
    getUserDataLocation: () => Promise<string>;
    setLibraryLocation: () => Promise<string>;
  };
  readonly zipper: { unzipper: () => void };
  readonly contextMenu: { clearLibrary: (callback: () => void) => () => void };
}
