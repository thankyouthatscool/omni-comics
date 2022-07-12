interface Window {
  readonly comicBooks: {
    getLibraryContent: (libraryLocation: string) => Promise<string[]>;
    parseComicPath: (comicPath: string) => { issue: string; title: string };
  };
  readonly rar: {
    getBookPage: (comicBookPath: string, page: string) => string;
    getFileList: (comicBookPath: string) => path.ParsedPath[];
    unrarThis: (comicBookPath: string) => void;
  };
  readonly userData: {
    clearLibraryLocation: () => void;
    getLibraryLocation: () => Promise<string>;
    setLibraryLocation: () => Promise<string>;
  };
}
