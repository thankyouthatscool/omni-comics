import { Button } from "@mui/material";
import { useEffect, useRef } from "react";

import {
  clearLibraryLocation,
  setLibraryLocation,
  setUserDataLocation,
  useAppDispatch,
  useAppSelector,
} from "./store";
import { RootWrapper } from "./Styled";

const App = () => {
  const { libraryLocation, userDataLocation } = useAppSelector(
    ({ userData }) => userData
  );

  const dispatch = useAppDispatch();

  const initialLoadRef = useRef<boolean>(false);

  const handleClearLibraryLocation = async () => {
    await window.userData.clearLibraryLocation();

    dispatch(clearLibraryLocation());
  };

  const handleInitialLoad = async () => {
    try {
      const [libraryLocation, userDataLocation] = await Promise.all([
        window.userData.getLibraryLocation(),
        window.userData.getUserDataLocation(),
      ]);

      dispatch(setUserDataLocation(userDataLocation));

      if (libraryLocation) {
        dispatch(setLibraryLocation(libraryLocation));
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleSetLibraryLocation = async () => {
    const libraryLocation = await window.userData.setLibraryLocation();

    if (libraryLocation) {
      dispatch(setLibraryLocation(libraryLocation));
    }
  };

  useEffect(() => {
    if (!initialLoadRef.current) {
      initialLoadRef.current = true;
      handleInitialLoad();
    }
  }, [initialLoadRef]);

  return (
    <RootWrapper>
      <pre>
        {JSON.stringify({ libraryLocation, userDataLocation }, null, 2)}
      </pre>
      {libraryLocation && (
        <Button
          color="error"
          onClick={handleClearLibraryLocation}
          variant="contained"
        >
          Clear Library Location
        </Button>
      )}
      {!libraryLocation && (
        <Button
          color="warning"
          onClick={handleSetLibraryLocation}
          variant="contained"
        >
          Set Library Location
        </Button>
      )}
    </RootWrapper>
  );
};

export default App;
