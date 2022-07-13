import { Button, Divider, Typography } from "@mui/material";

import { Viewer } from "../../components";
import { setViewerState, useAppDispatch, useAppSelector } from "../../store";
import { GroupWrapper, LibraryWrapper, HomeScreenWrapper } from "./Styled";

export const HomeScreen = () => {
  const dispatch = useAppDispatch();

  const { isViewerOpen } = useAppSelector(({ ui }) => ui);

  return (
    <HomeScreenWrapper>
      <LibraryWrapper>
        {["A", "B", "C"].map((letter) => (
          <GroupWrapper key={letter}>
            <Typography variant="h4">{letter}</Typography>
            <Button
              color="success"
              onClick={() => {
                dispatch(setViewerState(true));
              }}
              variant="contained"
            >
              Show
            </Button>
            <Divider />
          </GroupWrapper>
        ))}
      </LibraryWrapper>
      {isViewerOpen && <Viewer />}
    </HomeScreenWrapper>
  );
};
