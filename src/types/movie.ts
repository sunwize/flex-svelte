export interface Movie {
    id: string
    tmdbId: string
    imdbId: string
    name: string
    image: string
    backdrop: string
    genreIds: string
    parentId: string
    rating: number
    releaseDate: string
    uploadDate: Date
}

export interface FileAppProperties {
    tmdbId: string
    imdbId: string
    backdrop: string
    genre_ids: string
    image: string
    parentId: string
    rating: string
    release_date: string
    upload_date: Date
}

export interface TmdbMovie {
    tmdbId: string
    imdbId: string
    name: string
    description: string
    image: string
    backdrop: string
    rating: number
    duration: number
    releaseDate: string
}
