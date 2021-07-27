import { apolloClient } from "../../graphql";
import { GET_ANIME_PAGE } from "./queries";
import { GetAnimePage } from "./__generated__/GetAnimePage";

class AnimeService {
  async getAnimePage(page: number, perPage = 5): Promise<GetAnimePage["Page"]> {
    const res = await apolloClient
      .query({
        query: GET_ANIME_PAGE,
        variables: { page, perPage },
      })
      .catch((err) => {
        throw err;
      });

    if (!res || !res.data) {
      throw new Error("Cannot get anime list!");
    }
    return res.data.Page;
  }
}

export default new AnimeService();