import axios from "axios";
import { create } from "zustand";

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BEARER_TOKEN = process.env.NEXT_PUBLIC_TMDB_BEARER_TOKEN;
const BASE_URL = "https://api.themoviedb.org/3";

export const tmdbApi = axios.create({
    baseURL: BASE_URL,

    headers: {
        Authorization: `Bearer ${BEARER_TOKEN}`,
      },
    params: {
      api_key: API_KEY,
      language: "pt-BR", 
    },
  });

  export interface Movie {
    id: number;
    title: string;
    original_title: string;
    overview: string;
    genre_ids: number[];
    release_date: string;
    poster_path: string;
    backdrop_path: string;
    vote_average: number;
  }


  export const getNowPlayingMovies = async (page: number = 1): Promise<{ results: Movie[]; total_pages: number }> => {
    try {
      const response = await tmdbApi.get("/movie/now_playing", {
        params: {
          page,
        },
      });
      return {
        results: response.data.results.slice(0, 10), 
        total_pages: response.data.total_pages, 
      };
    } catch (error) {
      console.error("Erro ao buscar filmes em cartaz:", error);
      throw new Error("Não foi possível carregar os filmes.");
    }
  };

  export const getMoviesPerName = async (query: string, setMovies: (movies: Movie[]) => void, setValue: (value: string) => void, setTotalPages: (totalPages: number) => void, page: number) => {
    if(query === ''|| query.trim() === '') return
    try {
      const response = await tmdbApi.get("/search/movie", {
        params: {
          page,
          query,
        },
      });
      const data = response.data.results.slice(0,10);
      setMovies(data);
      //setValue('');
      setTotalPages(response.data.total_pages);
    } catch (error) {
      console.error("Erro ao buscar filmes por nome:", error);
      throw new Error("Não foi possível carregar os filmes.");
    }
  };

  export interface Genre {
    id: number;
    name: string;
  }

  interface GenreStore {
    genres: Genre[];
    fetchGenres: () => Promise<void>;
  }
  
  export const useGenreStore = create<GenreStore>((set) => ({
    genres: [],
    fetchGenres: async () => {
      try {
        const response = await tmdbApi.get("https://api.themoviedb.org/3/genre/movie/list", {
        });
        set({ genres: response.data.genres });
      } catch (error) {
        console.error("Erro ao buscar gêneros:", error);
      }
    },
  }));