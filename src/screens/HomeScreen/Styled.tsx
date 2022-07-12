import { Card } from "@mui/material";
import styled from "styled-components";

export const HoverContainer = styled.div`
  align-items: center;

  background-color: rgba(255, 255, 255, 0.75);

  display: none;

  height: 100%;

  justify-content: center;

  position: absolute;

  overflow: hidden;

  width: 100%;
`;

export const StyledCard = styled(Card)`
  position: relative;

  &:hover {
    ${HoverContainer} {
      display: flex;
    }
  }
`;

export const Wrapper = styled.div`
  display: grid;

  gap: 0 1rem;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));

  height: 100%;

  padding-right: 1rem;

  overflow: hidden auto;

  width: 100%;
`;
