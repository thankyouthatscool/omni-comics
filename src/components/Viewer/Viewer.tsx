import { Button } from "@mui/material";

import { setViewerState, useAppDispatch, useAppSelector } from "../../store";
import { ViewerWrapper } from "./Styled";

export const Viewer = () => {
  const dispatch = useAppDispatch();

  const { libraryLocation } = useAppSelector(({ userData }) => userData);

  return (
    <ViewerWrapper>
      <h1>Viewer</h1>
      <pre>{JSON.stringify({ libraryLocation }, null, 2)}</pre>
      <Button
        color="error"
        onClick={() => {
          dispatch(setViewerState(false));
        }}
        variant="contained"
      >
        Close
      </Button>
    </ViewerWrapper>
  );
};
