import type { RequestHandler } from "@sveltejs/kit";
import { json } from "@sveltejs/kit";
import { Drive } from "$lib/services/drive";
import { parseFileIntoMovie } from "$lib/parsers/movie";
import { CONFIG_SERVICE_ACCOUNT } from "$env/static/private";

const config = JSON.parse(CONFIG_SERVICE_ACCOUNT);

export const GET: RequestHandler = async () => {
    const files = await Drive.listFiles(config.fileId, "5f8a78a89a206e33c0450a58");
    const movies = files.map(parseFileIntoMovie);
    return json(movies);
};
