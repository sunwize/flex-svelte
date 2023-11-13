import axios, { AxiosError } from "axios";
import { parseTmdbMovie } from "$lib/parsers/movie";
import type { TmdbMovie } from "@/types/movie";

const api = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    params: {
        api_key: "6e919d0d4f2a31ef42c905a359ff004a",
    },
});

export class TMDB {
    static async searchMovie(query: string): Promise<TmdbMovie[]> {
        try {
            const { data } = await api.get("/search/movie", {
                params: {
                    query: query,
                    language: "fr-FR",
                },
            });

            return Array.isArray(data.results)
                ? data.results.map((movie: never) => parseTmdbMovie(movie))
                : [];
        } catch (err) {
            console.error((err as AxiosError).response?.data);
            return [];
        }
    }

    static async getMovie(tmdbId: string) {
        try {
            const { data } = await api.get(`/movie/${tmdbId}`, {
                params: {
                    language: "fr-FR",
                },
            });

            return parseTmdbMovie(data);
        } catch (err) {
            console.error((err as AxiosError).response?.data);
            return null;
        }
    }
}
