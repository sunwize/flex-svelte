import type { RequestEvent, RequestHandler } from "@sveltejs/kit";
import { error, json } from "@sveltejs/kit";
import TorrentSearchApi from "torrent-search-api";
import WebTorrent from "webtorrent";
import type { Torrent } from "@/types/torrent";
import { Drive } from "$lib/services/drive";

interface Request {
    tmdbId?: string
    torrent?: Torrent
}

const client = new WebTorrent();

export const POST: RequestHandler = async ({ request }: RequestEvent) => {
    const { tmdbId, torrent }: Request = await request.json();

    if (!tmdbId) throw error(400, "Required parameter: tmdbId");
    if (!torrent) throw error(400, "Required parameter: torrent");

    const magnet = await TorrentSearchApi.getMagnet(torrent);

    const stream = await new Promise<NodeJS.ReadableStream>((resolve) => {
        client.add(magnet, (torrent) => {
            const file = torrent.files
                .reduce(
                    (acc, current) => acc.length > current.length ? acc : current,
                    torrent.files[0],
                );

            resolve(file.createReadStream());
        });
    });

    await Drive.uploadFromStream(tmdbId, stream);

    return json(magnet);
};
