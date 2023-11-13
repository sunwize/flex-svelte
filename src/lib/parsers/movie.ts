import type { drive_v3 } from "googleapis";
import type { FileAppProperties, Movie, TmdbMovie } from "@/types/movie";

export const parseFileIntoMovie = (file: drive_v3.Schema$File): Movie => {
    const appProperties = file.appProperties as unknown as FileAppProperties;
    return {
        id: file.id as string,
        tmdbId: appProperties.tmdbId,
        imdbId: appProperties.imdbId,
        name: file.name as string,
        backdrop: appProperties.backdrop,
        genreIds: appProperties.genre_ids,
        image: appProperties.image,
        parentId: appProperties.parentId,
        rating: Number(appProperties.rating),
        releaseDate: appProperties.release_date,
        uploadDate: appProperties.upload_date,
    };
};

export const parseTmdbMovie = (data: {
    id: string
    imdb_id: string
    title: string
    overview: string
    poster_path: string
    backdrop_path: string
    vote_average: number
    runtime: number
    release_date: string
}) => {
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
};
