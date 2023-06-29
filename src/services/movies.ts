import { QueryFunction } from "@tanstack/react-query";
import type { MovieListResponse } from "../types/movie";
import { SingleMovieResponse } from "../types/single-movie";

export interface MovieListParams {
  page?: number;
  limit?: number;
}

export async function getLatestMovies(
  params: MovieListParams
): Promise<MovieListResponse> {
  const url = new URL("/api/v2/list_movies.json", "https://yts.mx");
  for (const key in params) {
    if (Object.prototype.hasOwnProperty.call(params, key) && !!params[key]) {
      url.searchParams.append(key, String(params[key]));
    }
  }

  console.log(url.toString());
  const res = await fetch(url);
  return res.json();
}

type SingleMovieQueryKey = ["movie", string];

export const getMovieById = (async ({
  queryKey,
  signal,
}): Promise<SingleMovieResponse> => {
  const url = new URL(
    `/api/v2/movie_details.json?movie_id=${queryKey[1]}`,
    "https://yts.mx"
  );
  console.log(url.toString());

  const res = await fetch(url, { signal });
  return res.json();
}) satisfies QueryFunction<SingleMovieResponse, SingleMovieQueryKey>;
