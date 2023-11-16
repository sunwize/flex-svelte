import { drive_v3, google } from "googleapis";
import type { AxiosHeaders } from "axios";
import { ADMIN_SERVICE_ACCOUNT } from "$env/static/private";
import { TMDB } from "$lib/services/tmdb";

const admin = JSON.parse(ADMIN_SERVICE_ACCOUNT);

const jwToken = new google.auth.JWT(
    admin.client_email,
    undefined,
    admin.private_key,
    ["https://www.googleapis.com/auth/drive"],
    undefined,
);

const drive = google.drive({
    version: "v3",
    auth: jwToken,
});

export class Drive {
    static async getFile(fileId: string) {
        const { data } = await drive.files.get({
            auth: jwToken,
            fileId,
            fields: "mimeType, id, name, thumbnailLink, createdTime, quotaBytesUsed, owners, appProperties",
            supportsAllDrives: true,
        });

        return data;
    }

    static async listFiles(folderId: string, parentId: string|null = null) {
        let pageToken = undefined;
        let query = `'${folderId}' in parents and trashed=false`;

        if (parentId)
            query += ` and appProperties has { key='parentId' and value='${parentId}' }`;

        const params = {
            auth: jwToken,
            pageSize: 1000,
            q: query,
            fields: "nextPageToken, files(mimeType, id, name, thumbnailLink, createdTime, quotaBytesUsed, owners, appProperties)",
            supportsAllDrives: true,
            includeItemsFromAllDrives: true,
            pageToken: pageToken,
        };

        const files: drive_v3.Schema$File[] = [];

        do {
            const { data } = await drive.files.list(params);
            pageToken = data.nextPageToken;
            if (data.files) {
                files.push(...data.files);
            }
        } while (pageToken);

        return files;
    }

    static getFileStream(fileId: string, headers: AxiosHeaders) {
        return drive.files.get({
            fileId: fileId,
            alt: "media",
        }, {
            responseType: "stream",
            headers,
        });
    }

    static async uploadFromStream(tmdbId: string, stream: NodeJS.ReadableStream) {
        const movie = await TMDB.getMovie(tmdbId);

        if (!movie) throw new Error(`Movie with tmdbId ${tmdbId} not found`);

        const metadata = {
            name: "",
            parents: [],
            appProperties: {
                parentId: "",
                image: movie.backdrop,
                backdrop: movie.backdrop,
                tmdbId,
                imdbId: movie.imdbId,
                rating: movie.rating,
                release_date: movie.releaseDate,
                upload_date: new Date().toISOString(),
            },
        };

        // TODO: Upload the stream to the Drive
    }
}
