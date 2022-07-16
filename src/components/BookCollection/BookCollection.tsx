import { ParsedPath } from "path";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { setSelectedSeries, useAppDispatch, useAppSelector } from "../../store";

export interface BookCollectionProps {
  bookSeries: string;
}

export const BookCollection = ({ bookSeries }: BookCollectionProps) => {
  const [groupCoverImages, setGroupCoverImages] = useState<
    { base64ImageRepresentation: string; coverPageInfo: ParsedPath }[]
  >([]);

  const { libraryContent, userDataLocation } = useAppSelector(
    ({ userData }) => userData
  );

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const handleGetBookCover = useCallback(async () => {
    const res = (await Promise.all(
      libraryContent
        .filter((filename) => filename.includes(bookSeries))
        .slice(0, 3)
        .map(async (file) => {
          return await window.comicBooks.getCover(file, userDataLocation!);
        })
    )) as { base64ImageRepresentation: string; coverPageInfo: ParsedPath }[];

    setGroupCoverImages(() => res);
  }, [libraryContent, userDataLocation]);

  useEffect(() => {
    if (userDataLocation) {
      handleGetBookCover();
    }
  }, [userDataLocation]);

  const gp = groupCoverImages.slice().reverse();

  return (
    <div
      onClick={() => {
        dispatch(setSelectedSeries(bookSeries));
        navigate("/zookies");
      }}
      style={{
        height: "100%",
        position: "relative",
      }}
    >
      {gp.map((cover, index) => (
        <img
          height={420}
          key={index}
          src={`data:image/${cover.coverPageInfo.ext.slice(1)};base64,${
            cover.base64ImageRepresentation
          }`}
          style={{
            position: "absolute",
            right: -(gp.length * 10 - (index + 1) * 10),
            top: -(gp.length * 10 - (index + 1) * 10),
          }}
          width={(420 / 3) * 2}
        />
      ))}
    </div>
  );
};
