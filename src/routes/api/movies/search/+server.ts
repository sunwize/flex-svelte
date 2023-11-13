import type { RequestEvent, RequestHandler } from "@sveltejs/kit";
import { error, json } from "@sveltejs/kit";
import { TMDB } from "$lib/services/tmdb";

export const GET: RequestHandler = async ({ url }: RequestEvent) => {
    const query = url.searchParams.get("q");

    if (!query) throw error(400, `Invalid query => provided value: ${query}`);

    const movies = await TMDB.searchMovie(query);

    return json(movies);
};
