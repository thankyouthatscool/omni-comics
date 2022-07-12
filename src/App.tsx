import { Button, Typography } from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";

import { HomeScreen } from "./screens";
import { RootWrapper, StyledCard } from "./Styled";

const App = () => {
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);
  const [isLibraryLocationAvailable, setIsLibraryLocationAvailable] =
    useState<boolean>(true);

  const initialLoadRef = useRef<boolean>(false);

  const handleSetLibraryLocation = useCallback(async () => {
    setIsButtonDisabled(() => true);

    try {
      await window.userData.setLibraryLocation();

      setIsLibraryLocationAvailable(() => true);
    } catch (err) {
      console.log(err);
    }

    setIsButtonDisabled(() => false);
  }, []);

  const handleInitialLoad = useCallback(async () => {
    const libraryLocation = await window.userData.getLibraryLocation();

    if (!libraryLocation) setIsLibraryLocationAvailable(() => false);
  }, []);

  useEffect(() => {
    if (!initialLoadRef.current) {
      initialLoadRef.current = true;
      handleInitialLoad();
    }
  }, [initialLoadRef]);

  return (
    <RootWrapper>
      {isLibraryLocationAvailable ? (
        <HomeScreen />
      ) : (
        <StyledCard>
          <Typography variant="body2">
            Please set library location...
          </Typography>
          <Button
            color="warning"
            disabled={isButtonDisabled}
            onClick={handleSetLibraryLocation}
            variant="contained"
          >
            Set Library Location
          </Button>
        </StyledCard>
      )}
    </RootWrapper>
  );
};

export default App;
