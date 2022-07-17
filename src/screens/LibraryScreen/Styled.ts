import styled from "styled-components";

interface BookCollectionWrapperProps {
  height: number;
}

export const BookCollectionWrapper = styled.div<BookCollectionWrapperProps>`
  border: 1px solid black;

  height: ${(props) => props.height}px;

  width: ${(props) => (props.height / 3) * 2}px;
`;
