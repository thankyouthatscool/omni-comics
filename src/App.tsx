import { useCallback, useEffect, useRef } from "react";

import { SetLibraryLocation } from "./components";
import { HomeScreen } from "./screens";
import {
  clearLibraryLocation,
  setLibraryLocation,
  setUserDataLocation,
  useAppDispatch,
  useAppSelector,
} from "./store";
import { RootWrapper } from "./Styled";

const App = () => {
  const dispatch = useAppDispatch();

  const { libraryLocation } = useAppSelector(({ userData }) => userData);

  const initialLoadRef = useRef<boolean>(false);

  const handleGetLibraryLocation = async () => {
    const storedLibraryLocation = await window.userData.getLibraryLocation();

    dispatch(setLibraryLocation(storedLibraryLocation));
  };

  const handleSetUserDataLocation = useCallback(async () => {
    const userDataLocation = await window.userData.getUserDataLocation();

    dispatch(setUserDataLocation(userDataLocation));
  }, []);

  useEffect(() => {
    if (!initialLoadRef.current) {
      initialLoadRef.current = true;
      handleGetLibraryLocation();
      handleSetUserDataLocation();
    }
  }, [initialLoadRef]);

  useEffect(() => {
    const clearLibraryLocationSubscription = window.contextMenu.clearLibrary(
      () => {
        dispatch(clearLibraryLocation());
      }
    );

    return () => {
      clearLibraryLocationSubscription();
    };
  }, []);

  return (
    <RootWrapper>
      {libraryLocation ? <HomeScreen /> : <SetLibraryLocation />}
    </RootWrapper>
  );
};

export default App;
