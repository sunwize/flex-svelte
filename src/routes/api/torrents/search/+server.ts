import type { RequestEvent, RequestHandler } from "@sveltejs/kit";
import { error, json } from "@sveltejs/kit";
import TorrentSearchApi from "torrent-search-api";

export const GET: RequestHandler = async ({ url }: RequestEvent) => {
    const query = url.searchParams.get("q");

    if (!query) throw error(400, `Invalid query => provided value: ${query}`);

    TorrentSearchApi.enablePublicProviders();
    const providers = TorrentSearchApi.getProviders();
    const torrents = await TorrentSearchApi.search(
        providers.map((provider) => provider.name),
        query,
        "Movies",
        20,
    );

    return json(torrents);
};
