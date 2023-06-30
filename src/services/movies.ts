import { QueryFunction } from "@tanstack/react-query";
import type { MovieListResponse, Quality } from "../types/movie";
import { SingleMovieResponse } from "../types/single-movie";
import { MovieSuggestionsResponse } from "../types/movie-suggestion";

export interface MovieListParams {
  page?: number;
  limit?: number;
  quality?: Quality;
  minimum_rating?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
  query_term?: string;
  genre?: string;
  sort_by?:
    | "title"
    | "year"
    | "rating"
    | "peers"
    | "seeds"
    | "download_count"
    | "like_count"
    | "date_added";
  order_by?: "asc" | "desc";
  with_rt_ratings?: boolean;
}

export async function getMoviesList(
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

type SuggestedMoviesQueryKey = ["movie", "suggestion", string];

export const getSuggestedMovies = (async ({
  queryKey,
  signal,
}): Promise<MovieSuggestionsResponse> => {
  const url = new URL(
    `/api/v2/movie_suggestions.json?movie_id=${queryKey[2]}`,
    "https://yts.mx"
  );

  const res = await fetch(url, { signal });
  return res.json();
}) satisfies QueryFunction<MovieSuggestionsResponse, SuggestedMoviesQueryKey>;
