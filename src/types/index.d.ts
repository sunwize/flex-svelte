declare module "torrent-search-api" {
    import type { Torrent } from "@/types/torrent";

    export interface Provider {
        name: string
        public: boolean
        categories: string[]
    }

    interface TorrentSearchApi {
        getProviders: () => Provider[]
        getActiveProviders: () => Provider[]
        enablePublicProviders: () => void
        disableAllProviders: () => void
        enableProvider: (provider: string) => void
        disableProvider: (provider: string) => void
        isProviderActive: (provider: string) => boolean
        search: (providers: string[], query?: string, category?: string, limit?: number) => Promise<Torrent[]>
    }

    const api: TorrentSearchApi;

    export default api;
}
