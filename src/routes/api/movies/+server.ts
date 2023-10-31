import type { RequestHandler } from "@sveltejs/kit";
import { json } from "@sveltejs/kit";
import config from "$lib/credentials/config.json";
import { Drive } from "$lib/services/drive";
import { parseFileIntoMovie } from "$lib/parsers/movie";

export const GET: RequestHandler = async () => {
    const files = await Drive.listFiles(config.fileId, "5f8a78a89a206e33c0450a58");
    const movies = files.map(parseFileIntoMovie);
    return json(movies);
};
