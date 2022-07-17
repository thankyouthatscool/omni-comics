interface Window {
  readonly userData: {
    clearLibraryLocation: () => Promise<any>;
    getLibraryLocation: () => Promise<string>;
    getUserDataLocation: () => Promise<string>;
    setLibraryLocation: () => Promise<string>;
  };
}
