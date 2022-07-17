interface Window {
  readonly comicBooks: {
    getLibraryContent: (libraryLocation: string) => Promise<string[]>;
    parseComicPath: (comicPath: string) => {
      issue: string;
      series: string;
      title: string;
    };
  };
  readonly userData: {
    clearLibraryLocation: () => Promise<any>;
    getLibraryLocation: () => Promise<string>;
    getUserDataLocation: () => Promise<string>;
    setLibraryLocation: () => Promise<string>;
  };
}
