import type { drive_v3 } from "googleapis";
import type { FileAppProperties, Movie } from "../../types/movie";

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
