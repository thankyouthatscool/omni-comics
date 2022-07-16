import styled from "styled-components";

interface BookCollectionWrapperProps {
  height: number;
}

export const BookCollectionWrapper = styled.div<BookCollectionWrapperProps>`
  height: ${(props) => props.height}px;

  margin-right: 1rem;

  width: ${(props) => (props.height / 3) * 2}px;
`;

export const GroupWrapper = styled.div``;

export const HomeScreenWrapper = styled.div`
  display: flex;

  height: 100%;

  overflow: hidden auto;

  padding: 0.5rem;

  width: 100%;
`;

export const LibraryWrapper = styled.div`
  flex: 2;

  overflow: hidden auto;
`;
