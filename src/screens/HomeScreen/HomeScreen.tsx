import { Button, CircularProgress, Typography } from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";

import { HoverContainer, StyledCard, Wrapper } from "./Styled";

export const HomeScreen = () => {
  const [libraryContent, setLibraryContent] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [base64ImageData, setBase64ImageData] = useState<string | null>(null);

  const handleGetLibraryContent = useCallback(async () => {
    const libraryLocation = await window.userData.getLibraryLocation();

    const libraryContent = await window.comicBooks.getLibraryContent(
      libraryLocation
    );

    setLibraryContent(() => libraryContent);
  }, []);

  const initialLoadRef = useRef<boolean>(false);

  useEffect(() => {
    if (!initialLoadRef.current) {
      handleGetLibraryContent();
    }
  }, [initialLoadRef]);

  return (
    <Wrapper>
      {base64ImageData && (
        <img height={1000} src={`data:image/jpg;base64,${base64ImageData}`} />
      )}
      {/* TODO: Everything needs to be central, like on YouTube. */}
      {/* [ ] And also do something about the fact that not everything is aligning to the top of the page,
              as in those gaps start appearing when there are less than a page full of covers. */}
      {libraryContent.length
        ? libraryContent.map((path) => {
            const { issue, title } = window.comicBooks.parseComicPath(path);

            const coverUrl = comicBookData.find(
              (book) => book.title === title && book.issue === issue
            )?.cover;

            return (
              <StyledCard
                elevation={9}
                key={path}
                onClick={async () => {
                  setIsLoading(() => true);

                  const comicBookFileList = await window.rar.getFileList(path);
                  const base64ImageRepresentation = window.rar.getBookPage(
                    path,
                    comicBookFileList[0]
                  );

                  setBase64ImageData(() => base64ImageRepresentation);

                  setIsLoading(() => false);
                }}
                style={{
                  height: 1024 / 4,
                  margin: "0.25rem",
                  userSelect: "none",
                  width: 663 / 4,
                }}
              >
                <div
                  style={{
                    alignItems: "center",
                    display: "flex",
                    height: "100%",

                    justifyContent: "center",
                    backgroundSize: "cover",
                    backgroundImage: `url(${coverUrl})`,
                    position: "absolute",
                    width: "100%",
                  }}
                >
                  {!coverUrl && (
                    <div>
                      <Typography>{title}</Typography>
                      <Typography>{issue}</Typography>
                    </div>
                  )}
                </div>
                {coverUrl && (
                  <HoverContainer>
                    {!isLoading ? (
                      <Typography variant="h6">
                        {title} {issue}
                      </Typography>
                    ) : (
                      <CircularProgress color="primary" />
                    )}
                  </HoverContainer>
                )}
              </StyledCard>
            );
          })
        : "Loading..."}
    </Wrapper>
  );
};

// TODO: Covers could be extracted directly from the books now.
const comicBookData = [
  {
    cover:
      "https://cdn.imagecomics.com/assets/i/releases/76206/birthright-vol-1-homecoming_2d1b424281.jpg",
    issue: "Vol. 01",
    title: "Birthright",
  },
  {
    cover:
      "https://cdn.imagecomics.com/assets/i/releases/12183/birthright-vol-2-tp_29b40664f7.jpg",
    issue: "Vol. 02",
    title: "Birthright",
  },
  {
    cover:
      "https://cdn.imagecomics.com/assets/i/releases/12185/birthright-vol-3-tp_5c4ba9782b.jpg",
    issue: "Vol. 03",
    title: "Birthright",
  },
  {
    cover:
      "https://cdn.imagecomics.com/assets/i/releases/12182/birthright-vol-4-family-history-tp_93a25bd60d.jpg",
    issue: "Vol. 04",
    title: "Birthright",
  },
  {
    cover:
      "https://cdn.imagecomics.com/assets/i/releases/12184/birthright-vol-5-tp_5e255510d0.jpg",
    issue: "Vol. 05",
    title: "Birthright",
  },
  {
    cover:
      "https://cdn.imagecomics.com/assets/i/releases/76199/birthright-vol-6-tp_d43dc1e185.jpg",
    issue: "Vol. 06",
    title: "Birthright",
  },
  {
    cover:
      "https://cdn.imagecomics.com/assets/i/releases/444357/birthright-vol-7-blood-brothers-tp_333c338f33.jpg",
    issue: "Vol. 07",
    title: "Birthright",
  },
  {
    cover:
      "https://cdn.imagecomics.com/assets/i/releases/461129/birthright-vol-8-live-by-the-sword-tp_80afd062c9.jpg",
    issue: "Vol. 08",
    title: "Birthright",
  },
  {
    cover:
      "https://cdn.imagecomics.com/assets/i/releases/550529/birthright-vol-9-war-of-the-worlds-tp_57a5c03987.jpg",
    issue: "Vol. 09",
    title: "Birthright",
  },
  {
    cover:
      "https://cdn.imagecomics.com/assets/i/releases/668670/birthright-vol-10-tp_14764f431b.jpg",
    issue: "Vol. 10",
    title: "Birthright",
  },
  {
    cover:
      "https://images-na.ssl-images-amazon.com/images/I/519cF7oyYNL._SX324_BO1,204,203,200_.jpg",
    issue: "Vol. 01",
    title: "The Boys",
  },
  {
    cover:
      "https://images-na.ssl-images-amazon.com/images/I/51kQUN4mE9L._SX320_BO1,204,203,200_.jpg",
    issue: "Vol. 02",
    title: "The Boys",
  },
  {
    cover:
      "https://images-na.ssl-images-amazon.com/images/I/51PdnEhdjjL._SX321_BO1,204,203,200_.jpg",
    issue: "Vol. 03",
    title: "The Boys",
  },
  {
    cover: "https://m.media-amazon.com/images/I/61TQ2CzMqdL.jpg",
    issue: "Vol. 04",
    title: "The Boys",
  },
  {
    cover: "https://m.media-amazon.com/images/I/518zjKBgybL.jpg",
    issue: "Vol. 05",
    title: "The Boys",
  },
  {
    cover:
      "https://images-na.ssl-images-amazon.com/images/I/51gr4hxBZkL._SY344_BO1,204,203,200_QL70_ML2_.jpg",
    issue: "Vol. 06",
    title: "The Boys",
  },
  {
    cover:
      "https://cdn.imagecomics.com/assets/i/releases/605662/the-department-of-truth-vol-1-the-end-of-the-world-tp_0642f998f1.jpg",
    issue: "Vol. 01",
    title: "The Department of Truth",
  },
  {
    cover:
      "https://cdn.imagecomics.com/assets/i/releases/673503/the-department-of-truth-vol-2-the-city-upon-a-hill-tp_0ead4e27aa.jpg",
    issue: "Vol. 02",
    title: "The Department of Truth",
  },
  {
    cover:
      "https://cdn.imagecomics.com/assets/i/releases/575363/the-department-of-truth-1_32d1c76d5c.jpg",
    issue: "#1",
    title: "The Department of Truth",
  },
  {
    cover:
      "https://cdn.imagecomics.com/assets/i/releases/576729/the-department-of-truth-2_7c75d79eeb.jpg",
    issue: "#2",
    title: "The Department of Truth",
  },
  {
    cover:
      "https://cdn.imagecomics.com/assets/i/releases/578918/the-department-of-truth-3_5e2fb11653.jpg",
    issue: "#3",
    title: "The Department of Truth",
  },
  {
    cover:
      "https://cdn.imagecomics.com/assets/i/releases/601577/the-department-of-truth-4_5760ab528e.jpg",
    issue: "#4",
    title: "The Department of Truth",
  },
  {
    cover:
      "https://cdn.imagecomics.com/assets/i/releases/604556/the-department-of-truth-5_0a22492141.jpg",
    issue: "#5",
    title: "The Department of Truth",
  },
  {
    cover:
      "https://cdn.imagecomics.com/assets/i/releases/605739/the-department-of-truth-6_91f6f8fd64.jpg",
    issue: "#6",
    title: "The Department of Truth",
  },
  {
    cover:
      "https://cdn.imagecomics.com/assets/i/releases/606835/the-department-of-truth-7_839656ff81.jpg",
    issue: "#7",
    title: "The Department of Truth",
  },
  {
    cover:
      "https://cdn.imagecomics.com/assets/i/releases/607530/the-department-of-truth-8_5c03632d76.jpg",
    issue: "#8",
    title: "The Department of Truth",
  },
  {
    cover:
      "https://cdn.imagecomics.com/assets/i/releases/627684/the-department-of-truth-9_d339ed549e.jpg",
    issue: "#9",
    title: "The Department of Truth",
  },
  {
    cover:
      "https://cdn.imagecomics.com/assets/i/releases/646401/the-department-of-truth-10_4a2c83a8fd.jpg",
    issue: "#10",
    title: "The Department of Truth",
  },
  {
    cover:
      "https://cdn.imagecomics.com/assets/i/releases/670067/the-department-of-truth-11_3afee78054.jpg",
    issue: "#11",
    title: "The Department of Truth",
  },
  {
    cover:
      "https://cdn.imagecomics.com/assets/i/releases/669029/the-department-of-truth-12_2f3b7c665c.jpg",
    issue: "#12",
    title: "The Department of Truth",
  },
  {
    cover:
      "https://cdn.imagecomics.com/assets/i/releases/671041/the-department-of-truth-13_ff957479fd.jpg",
    issue: "#13",
    title: "The Department of Truth",
  },
  {
    cover:
      "https://cdn.imagecomics.com/assets/i/releases/675547/the-department-of-truth-14_c47563e72e.jpg",
    issue: "#14",
    title: "The Department of Truth",
  },
  {
    cover:
      "https://cdn.imagecomics.com/assets/i/releases/680470/the-department-of-truth-15_04cb28cf92.jpg",
    issue: "#15",
    title: "The Department of Truth",
  },
  {
    cover:
      "https://cdn.imagecomics.com/assets/i/releases/698019/the-department-of-truth-16_60d086eaa5.jpg",
    issue: "#16",
    title: "The Department of Truth",
  },
  {
    cover:
      "https://cdn.imagecomics.com/assets/i/releases/604617/haha-1_44e0cf8c6e.jpg",
    issue: "#01",
    title: "Haha",
  },
  {
    cover:
      "https://cdn.imagecomics.com/assets/i/releases/627616/home-sick-pilots-vol-1-teenage-haunts-tp_74bfafdd45.jpg",
    issue: "Vol. 01",
    title: "Home Sick Pilots",
  },
  {
    cover:
      "https://cdn.imagecomics.com/assets/i/releases/675146/home-sick-pilots-vol-2-i-wanna-be-a-walking-weapon-tp_e340d2f0e3.jpg",
    issue: "Vol. 02",
    title: "Home Sick Pilots",
  },
  {
    cover:
      "https://cdn.imagecomics.com/assets/i/releases/697911/karmen-hc_2f89613af0.jpg",
    issue: "Vol. 01",
    title: "Karmen",
  },
  {
    cover:
      "https://cdn.imagecomics.com/assets/i/releases/76957/manifest-destiny-vol-1-tp_dffc6845c3.jpg",
    issue: "Vol. 01",
    title: "Manifest Destiny",
  },
  {
    cover:
      "https://cdn.imagecomics.com/assets/i/releases/17323/manifest-destiny-vol-2-tp_ba269a56e2.jpg",
    issue: "Vol. 02",
    title: "Manifest Destiny",
  },
  {
    cover:
      "https://cdn.imagecomics.com/assets/i/releases/17327/manifest-destiny-vol-3-tp_453e8714c0.jpg",
    issue: "Vol. 03",
    title: "Manifest Destiny",
  },
  {
    cover:
      "https://cdn.imagecomics.com/assets/i/releases/665850/mirka-andolfos-sweet-paprika-1_3e7d350f9d.jpg",
    issue: "#01",
    title: "Mirka Andolfo's Sweet Paprika",
  },
  {
    cover:
      "https://cdn.imagecomics.com/assets/i/releases/668919/mirka-andolfos-sweet-paprika-2-of-12_da344068dc.jpg",
    issue: "#02",
    title: "Mirka Andolfo's Sweet Paprika",
  },
  {
    cover:
      "https://cdn.imagecomics.com/assets/i/releases/670923/mirka-andolfos-sweet-paprika-3-of-12_7f081a2e6f.jpg",
    issue: "#03",
    title: "Mirka Andolfo's Sweet Paprika",
  },
  {
    cover:
      "https://cdn.imagecomics.com/assets/i/releases/673388/mirka-andolfos-sweet-paprika-4-of-12_24821c9153.jpg",
    issue: "#04",
    title: "Mirka Andolfo's Sweet Paprika",
  },
  {
    cover:
      "https://cdn.imagecomics.com/assets/i/releases/675588/mirka-andolfos-sweet-paprika-5-of-12_906ff8c910.jpg",
    issue: "#05",
    title: "Mirka Andolfo's Sweet Paprika",
  },
  {
    cover:
      "https://cdn.imagecomics.com/assets/i/releases/668919/mirka-andolfos-sweet-paprika-2-of-12_da344068dc.jpg",
    issue: "#06",
    title: "Mirka Andolfo's Sweet Paprika",
  },
  {
    cover:
      "https://cdn.imagecomics.com/assets/i/releases/668919/mirka-andolfos-sweet-paprika-2-of-12_da344068dc.jpg",
    issue: "#07",
    title: "Mirka Andolfo's Sweet Paprika",
  },
  {
    cover:
      "https://cdn.imagecomics.com/assets/i/releases/668919/mirka-andolfos-sweet-paprika-2-of-12_da344068dc.jpg",
    issue: "#08",
    title: "Mirka Andolfo's Sweet Paprika",
  },
  {
    cover:
      "https://cdn.imagecomics.com/assets/i/releases/668919/mirka-andolfos-sweet-paprika-2-of-12_da344068dc.jpg",
    issue: "#09",
    title: "Mirka Andolfo's Sweet Paprika",
  },
  {
    cover:
      "https://cdn.imagecomics.com/assets/i/releases/668919/mirka-andolfos-sweet-paprika-2-of-12_da344068dc.jpg",
    issue: "#10",
    title: "Mirka Andolfo's Sweet Paprika",
  },
  {
    cover:
      "https://cdn.imagecomics.com/assets/i/releases/764239/primordial-hc_23278cbe49.jpg",
    issue: "Vol. 01",
    title: "Primordial",
  },
  {
    cover:
      "https://www.comiccrusaders.com/wp-content/uploads/2021/05/Red-Room-1-new_1325x-1024x1574.jpg",
    issue: "#01",
    title: "Red Room",
  },
  {
    cover:
      "https://m.media-amazon.com/images/P/B0924WB72D.01._SCLZZZZZZZ_SX500_.jpg",
    issue: "#02",
    title: "Red Room",
  },
  {
    cover:
      "https://www.comiccrusaders.com/wp-content/uploads/2021/07/large-8266023-1.jpg",
    issue: "#03",
    title: "Red Room",
  },
  {
    cover:
      "https://s3.amazonaws.com/comicgeeks/comics/covers/large-9996529.jpg?1651732859",
    issue: "#04",
    title: "Red Room",
  },
  {
    cover:
      "https://www.booktopia.com.au/covers/500/9781401299323/8216/the-sandman-deluxe-edition-book-one.jpg",
    issue: "Book 01",
    title: "The Sandman",
  },
  {
    cover:
      "https://www.booktopia.com.au/covers/500/9781779508119/4217/the-sandman.jpg",
    issue: "Book 02",
    title: "The Sandman",
  },
  {
    cover: "https://cdn2.penguin.com.au/covers/original/9781779510273.jpg",
    issue: "Book 03",
    title: "The Sandman",
  },
  {
    cover:
      "https://www.dccomics.com/sites/default/files/styles/covers192x291/public/comic-covers/2021/09/DCHP_SP_Cv1_00111_DIGITAL_6155fccf307648.99319394.jpg?itok=a1oyXAY4",
    issue: "#01",
    title: "Soul Plumber",
  },
  {
    cover:
      "https://www.dccomics.com/sites/default/files/styles/covers192x291/public/comic-covers/2021/10/DCHP_SP_Cv2_00211_DIGITAL_6179b36b0f3855.83658177.jpg?itok=1NZrbQX7",
    issue: "#02",
    title: "Soul Plumber",
  },
  {
    cover:
      "https://www.dccomics.com/sites/default/files/imce/2021/11-NOV/DCHP_SP_Cv3_00311_6183ff20154155.21249798.jpg",
    issue: "#03",
    title: "Soul Plumber",
  },
  {
    cover:
      "https://www.dccomics.com/sites/default/files/styles/covers192x291/public/comic-covers/2022/01/DCHP_SP_Cv4_00411_DIGITAL_61d356573b17b2.52275481.jpg?itok=fGOFor1g",
    issue: "#04",
    title: "Soul Plumber",
  },
  {
    cover:
      "https://www.dccomics.com/sites/default/files/styles/covers192x291/public/comic-covers/2022/02/DCHP_SP_Cv5_00511_DIGITAL_61fac39e9dd2f5.17704872.jpg?itok=mVDgdpjt",
    issue: "#05",
    title: "Soul Plumber",
  },
  {
    cover:
      "https://www.dccomics.com/sites/default/files/styles/covers192x291/public/comic-covers/2022/02/DCHP_SP_Cv6_00611_DIGITAL_621968fd40ba96.21971307.jpg?itok=yXblxYbY",
    issue: "#06",
    title: "Soul Plumber",
  },
  {
    cover:
      "https://cdn.imagecomics.com/assets/i/releases/601584/that-texas-blood-vol-1-tp_3658c2314e.jpg",
    issue: "Vol. 01",
    title: "That Texas Blood",
  },
  {
    cover:
      "https://cdn.imagecomics.com/assets/i/releases/645799/that-texas-blood-7_b6effd55f8.jpg",
    issue: "#07",
    title: "That Texas Blood",
  },
  {
    cover:
      "https://cdn.imagecomics.com/assets/i/releases/666010/that-texas-blood-8_7f338222d6.jpg",
    issue: "#08",
    title: "That Texas Blood",
  },
  {
    cover:
      "https://cdn.imagecomics.com/assets/i/releases/671129/ultramega-by-james-harren-vol-1-tp_e7115cd6df.jpg",
    issue: "Vol. 01",
    title: "Ultramega",
  },
  {
    cover:
      "https://cdn.imagecomics.com/assets/i/releases/8299/wytches-1_3682ac2b98.jpg",
    issue: "#01",
    title: "Wytches",
  },
  {
    cover:
      "https://cdn.imagecomics.com/assets/i/releases/2173/wytches-2_05bb7b01f2.jpg",
    issue: "#02",
    title: "Wytches",
  },
  {
    cover:
      "https://cdn.imagecomics.com/assets/i/releases/2174/wytches-3_38e2d0a86f.jpg",
    issue: "#03",
    title: "Wytches",
  },
  {
    cover:
      "https://cdn.imagecomics.com/assets/i/releases/2175/wytches-4_e291717066.jpg",
    issue: "#04",
    title: "Wytches",
  },
  {
    cover:
      "https://cdn.imagecomics.com/assets/i/releases/2176/wytches-5_2a6e4d0675.jpg",
    issue: "#05",
    title: "Wytches",
  },
  {
    cover:
      "https://cdn.imagecomics.com/assets/i/releases/2177/wytches-6_69e08a516a.jpg  ",
    issue: "#06",
    title: "Wytches",
  },
];
