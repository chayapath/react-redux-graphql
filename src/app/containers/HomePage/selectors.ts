import { createSelector } from "reselect";
import { IRootState } from "../../types";

const selectHomePage = (state: IRootState) => state.homePage;

export const makeSelectHomePage = createSelector(
  selectHomePage,
  (homePage) => homePage.animePage
);
