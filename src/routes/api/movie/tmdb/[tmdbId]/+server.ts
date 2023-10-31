import type { RequestEvent, RequestHandler } from "@sveltejs/kit";
import { error, json } from "@sveltejs/kit";
import { TMDB } from "$lib/services/tmdb";

export const GET: RequestHandler = async ({ params }: RequestEvent) => {
    const { tmdbId } = params;

    if (!tmdbId) throw error(400, `Invalid tmdbId => provided value: ${tmdbId}`);

    const movie = await TMDB.getMovie(tmdbId);

    if (!movie) throw error(400, `Movie with tmdbId ${tmdbId} not found`);

    return json(movie);
};
