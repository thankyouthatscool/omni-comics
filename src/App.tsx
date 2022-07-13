import { useEffect } from "react";

import { HomeScreen } from "./screens";
import { setLibraryLocation, useAppDispatch, useAppSelector } from "./store";
import { RootWrapper } from "./Styled";

const App = () => {
  const dispatch = useAppDispatch();

  const { libraryLocation } = useAppSelector(({ userData }) => userData);

  const handleGetLibraryLocation = async () => {
    const storedLibraryLocation = await window.userData.getLibraryLocation();

    dispatch(setLibraryLocation(storedLibraryLocation));
  };

  useEffect(() => {
    handleGetLibraryLocation();
  }, []);

  return <RootWrapper>{libraryLocation && <HomeScreen />}</RootWrapper>;
};

export default App;
