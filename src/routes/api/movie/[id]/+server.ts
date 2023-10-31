import type { RequestEvent, RequestHandler } from "@sveltejs/kit";
import { error, json } from "@sveltejs/kit";
import { Drive } from "$lib/services/drive";
import { parseFileIntoMovie } from "$lib/parsers/movie";

export const GET: RequestHandler = async ({ params }: RequestEvent) => {
    const { id } = params;

    if (!id) throw error(400, `Invalid id => provided value: ${id}`);

    const file = await Drive.getFile(id);

    if (!file) throw error(400, `File with id ${id} not found`);

    return json(
        parseFileIntoMovie(file),
    );
};
