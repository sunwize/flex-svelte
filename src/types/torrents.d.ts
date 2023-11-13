declare module "torrent-search-api" {
    interface Provider {
        name: string
        public: boolean
        categories: string[]
    }

    interface Torrent {
        desc: string
        peers: number
        provider: string
        seeds: number
        size: string
        time: string
        title: string
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
