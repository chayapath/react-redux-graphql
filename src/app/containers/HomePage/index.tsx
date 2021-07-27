import { Dispatch } from "@reduxjs/toolkit";
import React, { useEffect } from "react";
import styled from "styled-components";
import { useAppDispatch } from "../../hooks";
import animeService from "../../services/animeService";
import { GetAnimePage } from "../../services/animeService/__generated__/GetAnimePage";
import { setAnimePage } from "./homePageSlice";
import { HotAnime } from "./hotAnime";

interface IHomePageProps {}

const Container = styled.div`
  width: 100%;
  height: 100;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const actionDispath = (dispath: Dispatch) => ({
  setAnimePage: (page: GetAnimePage["Page"]) => dispath(setAnimePage(page)),
});

export function HomePage(props: IHomePageProps) {
  const { setAnimePage } = actionDispath(useAppDispatch());

  const fetchAnimePage = async () => {
    const animePage = await animeService.getAnimePage(0, 20).catch((err) => {
      console.log("err: ", err);
    });
    console.log("animePage: ", animePage);
    if (animePage) setAnimePage(animePage);
  };

  useEffect(() => {
    fetchAnimePage();
  });

  return (
    <Container>
      <h1>Hot Anime</h1>
      <HotAnime />
    </Container>
  );
}
