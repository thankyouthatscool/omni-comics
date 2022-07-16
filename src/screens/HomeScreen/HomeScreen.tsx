import { Button, Divider, Typography } from "@mui/material";
import { nativeImage } from "electron";
import { useEffect, useMemo, useRef } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

import { BookCollection, Viewer } from "../../components";
import {
  setLibraryContent,
  setSelectedSeries,
  useAppDispatch,
  useAppSelector,
} from "../../store";
import {
  BookCollectionWrapper,
  GroupWrapper,
  LibraryWrapper,
  HomeScreenWrapper,
} from "./Styled";

export const HomeScreen = () => {
  const { isViewerOpen } = useAppSelector(({ ui }) => ui);
  const { libraryContent, libraryLocation } = useAppSelector(
    ({ userData }) => userData
  );

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const initialLoadRef = useRef<boolean>(false);

  const handleGetLibraryContent = async () => {
    const libraryContent = await window.comicBooks.getLibraryContent(
      libraryLocation!
    );

    dispatch(setLibraryContent(libraryContent.slice(67, 69)));
  };

  useEffect(() => {
    if (!initialLoadRef.current) {
      initialLoadRef.current = true;
      handleGetLibraryContent();
    }
  }, [initialLoadRef]);

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

  return (
    <HomeScreenWrapper>
      <Routes>
        <Route
          element={
            <LibraryWrapper>
              {Object.keys(alphabeticTitleMap).map((letter) => (
                <GroupWrapper key={letter}>
                  <Typography variant="h4">{letter}</Typography>
                  <div
                    style={{
                      display: "flex",

                      flexWrap: "wrap",

                      margin: "1rem 0",
                    }}
                  >
                    {alphabeticTitleMap[letter].map((seriesTitle) => (
                      <BookCollectionWrapper height={420} key={seriesTitle}>
                        <BookCollection bookSeries={seriesTitle} />
                      </BookCollectionWrapper>
                    ))}
                  </div>
                  <Divider />
                </GroupWrapper>
              ))}
            </LibraryWrapper>
          }
          path="/"
        />
        <Route
          element={
            <div>
              <div>Hello</div>
              <Button onClick={() => navigate("/")}>Back</Button>
              {isViewerOpen && <Viewer />}
            </div>
          }
          path=":bookSeries"
        />
      </Routes>
    </HomeScreenWrapper>
  );
};
