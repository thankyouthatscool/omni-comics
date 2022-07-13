import { Divider, Typography } from "@mui/material";
import { useEffect, useMemo, useRef, useState } from "react";

import { Viewer } from "../../components";
import { useAppSelector } from "../../store";
import { GroupWrapper, LibraryWrapper, HomeScreenWrapper } from "./Styled";

export const HomeScreen = () => {
  const [libraryContent, setLibraryContent] = useState<string[]>([]);

  const { isViewerOpen } = useAppSelector(({ ui }) => ui);
  const { libraryLocation } = useAppSelector(({ userData }) => userData);

  const initialLoadRef = useRef<boolean>(false);

  const handleGetLibraryContent = async () => {
    const libraryContent = await window.comicBooks.getLibraryContent(
      libraryLocation!
    );

    setLibraryContent(() => libraryContent);
  };

  useEffect(() => {
    if (!initialLoadRef.current) {
      initialLoadRef.current = true;
      handleGetLibraryContent();
    }
  }, [initialLoadRef]);

  const zoop = useMemo(() => {
    return Array.from(
      new Set(
        libraryContent
          .map((file) => window.comicBooks.parseComicPath(file))
          .map((book) => book.series)
      )
    ).reduce((acc, value) => {
      const titleWordArray = value.split(" ");

      let firstMeaningfulWord: string;

      if (["a", "an", "the"].includes(titleWordArray[0].toLocaleLowerCase())) {
        firstMeaningfulWord = titleWordArray.slice(1, 2).join("");
      } else {
        firstMeaningfulWord = titleWordArray.slice(0, 1).join("");
      }

      const firstMeaningfulLetter = firstMeaningfulWord.split("")[0];

      if (acc[firstMeaningfulLetter]) {
        return {
          ...acc,
          [firstMeaningfulLetter.toUpperCase()]: [
            ...acc[firstMeaningfulLetter.toUpperCase()],
            value,
          ],
        };
      } else {
        return { ...acc, [firstMeaningfulLetter.toUpperCase()]: [value] };
      }
    }, {} as { [key: string]: string[] });
  }, [libraryContent]);

  return (
    <HomeScreenWrapper>
      <LibraryWrapper>
        {/* TOD O: Not zoop */}
        {Object.keys(zoop).map((letter) => (
          <GroupWrapper key={letter}>
            <Typography variant="h4">{letter}</Typography>
            <div
              style={{
                border: "2px solid blue",

                display: "flex",

                margin: "1rem 0",
              }}
            >
              {zoop[letter].map((book) => (
                <div>{book}</div>
              ))}
            </div>
            <Divider />
          </GroupWrapper>
        ))}
      </LibraryWrapper>
      {isViewerOpen && <Viewer />}
    </HomeScreenWrapper>
  );
};
