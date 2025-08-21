import axios from "axios";
import type { Movie } from "../types/movie";

interface TMDBResponse {
  results: Movie[];
  total_pages: number;
  total_results: number;
  page: number;
}

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
  },
});

export async function getMovies(query: string, page: number = 1): Promise<TMDBResponse> {
  try {
    const response = await api.get<TMDBResponse>("search/movie", {
      params: {
        query,
        include_adult: false,
        language: "en-US",
        page,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw new Error("Failed to fetch movies");
  }
}