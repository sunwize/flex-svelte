import axios, { AxiosError } from "axios";
import type { Movie, TmdbMovie } from "../../types/movie";

const api = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    params: {
        api_key: "6e919d0d4f2a31ef42c905a359ff004a",
    },
});

export class TMDB {
    static async getMovie(tmdbId: string) {
        try {
            const { data } = await api.get(`/movie/${tmdbId}`, {
                params: {
                    language: "fr-FR",
                },
            });

            const movie: TmdbMovie = {
                tmdbId: data.id,
                imdbId: data.imdb_id,
                name: data.title,
                description: data.overview,
                image: data.poster_path,
                backdrop: data.backdrop_path,
                rating: +(data.vote_average / 2).toFixed(2),
                duration: data.runtime,
                releaseDate: data.release_date,
            };

            return movie;
        } catch (err) {
            console.error((err as AxiosError).response?.data);
            return null;
        }
    }
}
