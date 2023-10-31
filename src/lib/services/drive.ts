import admin from "$lib/credentials/admin.json";
import { drive_v3, google } from "googleapis";
import type { AxiosHeaders } from "axios";

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
}
