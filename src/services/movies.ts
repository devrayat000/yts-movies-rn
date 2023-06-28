import type { MovieListResponse } from "../types/movie";

export interface MovieListParams {
  page?: number;
  limit?: number;
}

export async function getLatestMovies(
  params: MovieListParams
): Promise<MovieListResponse> {
  const url = new URL("/api/v2/list_movies.json", "https://yts.mx");
  if (!!params.limit) {
    url.searchParams.append("limit", String(params.limit));
  }
  if (!!params.page) {
    url.searchParams.append("page", String(params.page));
  }

  console.log(url.toString());
  const res = await fetch(url);
  return res.json();
}
