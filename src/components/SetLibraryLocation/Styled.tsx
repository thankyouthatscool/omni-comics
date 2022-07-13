import { Card } from "@mui/material";
import styled from "styled-components";

import { fullScreen } from "../../theme/helpers";

export const SetLibraryLocationWrapper = styled.div`
  ${fullScreen};

  align-items: center;

  display: flex;

  justify-content: center;
`;

export const StyledCard = styled(Card)`
  padding: 2rem;
`;
