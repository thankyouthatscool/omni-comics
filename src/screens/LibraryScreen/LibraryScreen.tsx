import { Card, Typography } from "@mui/material";
import { useEffect, useMemo, useRef } from "react";

import { setLibraryContent, useAppDispatch, useAppSelector } from "../../store";
import { BookCollectionWrapper } from "./Styled";

export const LibraryScreen = () => {
  const dispatch = useAppDispatch();

  const { libraryContent, libraryLocation } = useAppSelector(
    ({ userData }) => userData
  );

  const initialLoadRef = useRef<boolean>(false);

  const handleGetLibraryContent = async (libraryLocation: string) => {
    const libraryContent = await window.comicBooks.getLibraryContent(
      libraryLocation
    );

    dispatch(setLibraryContent(libraryContent));
  };

  const alphabeticTitleMap = useMemo(() => {
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

  useEffect(() => {
    if (libraryLocation) {
      if (!initialLoadRef.current) {
        initialLoadRef.current = true;
        handleGetLibraryContent(libraryLocation);
      }
    }
  }, [initialLoadRef, libraryLocation]);

  return (
    <div>
      {Object.keys(alphabeticTitleMap).map((letter) => (
        <div key={letter} style={{ margin: "0.5rem" }}>
          <Card style={{ padding: "1rem" }}>
            <Typography variant="h4">{letter}</Typography>
            <div
              style={{
                display: "flex",

                flexWrap: "wrap",
              }}
            >
              {alphabeticTitleMap[letter].map((seriesTitle) => (
                <BookCollectionWrapper height={420} key={seriesTitle}>
                  <div>{seriesTitle}</div>
                </BookCollectionWrapper>
              ))}
            </div>
          </Card>
        </div>
      ))}
    </div>
  );
};
