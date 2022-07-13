import { Button } from "@mui/material";

import { setLibraryLocation, useAppDispatch } from "../../store";
import { SetLibraryLocationWrapper, StyledCard } from "./Styled";

export const SetLibraryLocation = () => {
  const dispatch = useAppDispatch();

  const handleSetLibraryLocation = async () => {
    const newLibraryLocation = await window.userData.setLibraryLocation();

    dispatch(setLibraryLocation(newLibraryLocation));
  };

  return (
    <SetLibraryLocationWrapper>
      <StyledCard elevation={9}>
        <Button
          color="warning"
          onClick={handleSetLibraryLocation}
          variant="contained"
        >
          Set Library Location
        </Button>
      </StyledCard>
    </SetLibraryLocationWrapper>
  );
};
