import React from "react";
import { MoonLoader } from "react-spinners";
import { createSelector } from "reselect";
import styled, { css } from "styled-components";
import { useAppSelector } from "../../hooks";
import { makeSelectHomePage } from "./selectors";

const HotAnimeContainer = styled.div`
  max-width: 1280px;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
`;

const AnimeItemContainer = styled.div`
  width: 12em;
  height: 16em;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const AnimeCover = styled.div`
  width: auto;
  height: 10em;

  img {
    width: auto;
    height: 100%;
  }
`;

const AnimeTitle = styled.span`
  margin-top: 8px;
  font-size: 14px;
  color: #000;
  font-weight: 600;
`;

const AverageScore = styled.span<{ value: number }>`
  ${(props) =>
    props.value > 80 &&
    css`
      font-weight: bold;
    `};
`;

const stateSelector = createSelector(makeSelectHomePage, (animePage) => ({
  animePage,
}));

export function HotAnime() {
  const { animePage } = useAppSelector(stateSelector);

  const isEmptyAnimePage =
    !animePage || !animePage.media || animePage.media.length === 0;

  if (isEmptyAnimePage) return <MoonLoader color="#0b99ec" />;

  return (
    <HotAnimeContainer>
      {animePage?.media?.map((anime) => (
        <AnimeItemContainer key={anime?.id}>
          <AnimeCover>
            <img src={anime?.coverImage?.extraLarge || ""} alt="animeImg" />
          </AnimeCover>
          <AnimeTitle>{anime?.title?.english}</AnimeTitle>
          <AverageScore value={anime?.averageScore || 0}>
            Avg Score: {anime?.averageScore}
          </AverageScore>
        </AnimeItemContainer>
      ))}
    </HotAnimeContainer>
  );
}
