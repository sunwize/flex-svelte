import type { RequestEvent, RequestHandler } from "@sveltejs/kit";
import { error } from "@sveltejs/kit";
import { Drive } from "$lib/services/drive";
import { AxiosHeaders } from "axios";

export const GET: RequestHandler = async ({ params, request, setHeaders }: RequestEvent) => {
    const { id } = params;

    if (!id) throw error(400, `Invalid id => provided value: ${id}`);

    const headers = new AxiosHeaders({
        "Content-Type": "video/mp4",
    });
    const range = request.headers.get("range");

    if (range) {
        headers.set({
            "Range": range,
            "Accept-Ranges": "bytes",
            "Content-Disposition": "inline",
        });
    }

    const stream = await Drive.getFileStream(id, headers);
    let status = 200;

    if (range) {
        setHeaders({
            "Content-Range": stream.headers["content-range"],
            "Content-Length": stream.headers["content-length"],
            "Content-Type": "video/mp4",
        });
        status = 206;
    } else {
        setHeaders({
            "Content-Length": stream.headers["content-length"],
            "Content-Type": "video/mp4",
        });
    }

    return new Response(stream.data, {
        status,
    });
};
