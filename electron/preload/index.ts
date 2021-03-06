import { contextBridge, ipcRenderer } from "electron";
import unrar from "electron-unrar-js";
import fs from "fs";
import path from "path";

import { getLibraryDirectoryFileList } from "./utils";

function domReady(
  condition: DocumentReadyState[] = ["complete", "interactive"]
) {
  return new Promise((resolve) => {
    if (condition.includes(document.readyState)) {
      resolve(true);
    } else {
      document.addEventListener("readystatechange", () => {
        if (condition.includes(document.readyState)) {
          resolve(true);
        }
      });
    }
  });
}

const safeDOM = {
  append(parent: HTMLElement, child: HTMLElement) {
    if (!Array.from(parent.children).find((e) => e === child)) {
      return parent.appendChild(child);
    }
  },
  remove(parent: HTMLElement, child: HTMLElement) {
    if (Array.from(parent.children).find((e) => e === child)) {
      return parent.removeChild(child);
    }
  },
};

/**
 * https://tobiasahlin.com/spinkit
 * https://connoratherton.com/loaders
 * https://projects.lukehaas.me/css-loaders
 * https://matejkustec.github.io/SpinThatShit
 */
function useLoading() {
  const className = `loaders-css__square-spin`;
  const styleContent = `
@keyframes square-spin {
  25% { transform: perspective(100px) rotateX(180deg) rotateY(0); }
  50% { transform: perspective(100px) rotateX(180deg) rotateY(180deg); }
  75% { transform: perspective(100px) rotateX(0) rotateY(180deg); }
  100% { transform: perspective(100px) rotateX(0) rotateY(0); }
}
.${className} > div {
  animation-fill-mode: both;
  width: 50px;
  height: 50px;
  background: #fff;
  animation: square-spin 3s 0s cubic-bezier(0.09, 0.57, 0.49, 0.9) infinite;
}
.app-loading-wrap {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #282c34;
  z-index: 9;
}
    `;
  const oStyle = document.createElement("style");
  const oDiv = document.createElement("div");

  oStyle.id = "app-loading-style";
  oStyle.innerHTML = styleContent;
  oDiv.className = "app-loading-wrap";
  oDiv.innerHTML = `<div class="${className}"><div></div></div>`;

  return {
    appendLoading() {
      safeDOM.append(document.head, oStyle);
      safeDOM.append(document.body, oDiv);
    },
    removeLoading() {
      safeDOM.remove(document.head, oStyle);
      safeDOM.remove(document.body, oDiv);
    },
  };
}

// ----------------------------------------------------------------------

const { appendLoading, removeLoading } = useLoading();
domReady().then(appendLoading);

window.onmessage = (ev) => {
  ev.data.payload === "removeLoading" && removeLoading();
};

setTimeout(removeLoading, 4999);

contextBridge.exposeInMainWorld("comicBooks", {
  getLibraryContent: async (libraryLocation: string) => {
    const libraryContent = await getLibraryDirectoryFileList(libraryLocation);

    return libraryContent;
  },
  parseComicPath: (comicPath: string) => {
    const { name } = path.parse(comicPath);

    const title = /^(?<title>.+)\s(#|Vol|Book)/i.exec(name);
    const issue = /(?<issue>#\d+|Vol\.\s\d+|Book\s\d+)/i.exec(name);

    return {
      issue: issue?.groups?.issue!,
      title: title?.groups?.title!,
    };
  },
});

// TODO: Extract to a central location.
// [ ] Everything will need to be extracted to what ever the location of userData is.

// TODO: Also need to handle zip files - should be much easier.

contextBridge.exposeInMainWorld("rar", {
  getBookPage: (comicBookPath: string, page: path.ParsedPath): string => {
    const { dir, ext, name } = path.parse(comicBookPath);

    const pagePath = path.join(page.dir, `${page.name}${page.ext}`);

    console.log(pagePath);

    const sourceFile = path.join(dir, `${name}${ext}`);
    const targetDirectory = path.join(dir, name.trim());

    if (!fs.existsSync(path.join(targetDirectory, pagePath))) {
      console.log("Extracting page.");

      if (!fs.existsSync(targetDirectory)) {
        console.log("Creating target directory.");

        fs.mkdirSync(targetDirectory);
      } else {
        console.log("Target directory already exists.");
      }

      const fileExtractor = unrar.createExtractorFromFile(
        sourceFile,
        targetDirectory
      );

      fileExtractor.extractFiles([pagePath]);
    } else {
      console.log("Page already extracted.");
    }

    const base64ImageRepresentation = fs
      .readFileSync(path.join(targetDirectory, pagePath))
      .toString("base64");

    return base64ImageRepresentation;
  },
  getFileList: (comicBookPath: string): path.ParsedPath[] => {
    const { dir, ext, name } = path.parse(comicBookPath);
    const sourceFile = path.join(dir, `${name}${ext}`);
    const targetDirectory = path.join(dir, name.trim());
    const fileExtractor = unrar.createExtractorFromFile(
      sourceFile,
      targetDirectory
    );

    const rawList = fileExtractor.getFileList();

    const fileList = rawList[1].fileHeaders;

    const comicBookImages = fileList
      .map((file) => {
        return path.parse(file.name);
      })
      .filter((file) => {
        return file.ext === ".jpg" || file.ext === ".png";
      })
      .sort((a, b) => a.name.localeCompare(b.name));

    return comicBookImages;
  },
  unrarThis: (comicBookPath: string) => {
    const { dir, ext, name } = path.parse(comicBookPath);

    const sourceFile = path.join(dir, `${name}${ext}`);
    const targetDirectory = path.join(dir, name.trim());

    if (!fs.existsSync(targetDirectory)) fs.mkdirSync(targetDirectory);
    const fileExtractor = unrar.createExtractorFromFile(
      sourceFile,
      targetDirectory
    );

    console.log(fileExtractor.getFileList());

    const fileList = fileExtractor.getFileList()[1].fileHeaders;
    const comicImages = fileList
      .map((file) => path.parse(file.name))
      .filter((file) => file.ext === ".jpg" || file.ext === ".png")
      .map((file) => `${file.name}${file.ext}`)
      .sort();
    console.log(comicImages);

    fileExtractor.extractFiles([comicImages[0]]);
  },
});

contextBridge.exposeInMainWorld("userData", {
  clearLibraryLocation: () => {
    ipcRenderer.invoke("clearLibraryLocation");
  },
  getLibraryLocation: async () => {
    const libraryLocation = (await ipcRenderer.invoke(
      "getLibraryLocation"
    )) as string;

    return libraryLocation;
  },
  setLibraryLocation: async () => {
    const newLibraryLocation = (await ipcRenderer.invoke(
      "setLibraryLocation"
    )) as string;

    return newLibraryLocation;
  },
});
