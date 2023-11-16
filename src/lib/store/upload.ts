import { writable } from "svelte/store";
import type { TmdbMovie } from "@/types/movie";
import type { Torrent } from "@/types/torrent";

export const movie = writable<TmdbMovie|null>(null);
export const torrent = writable<Torrent|null>(null);
