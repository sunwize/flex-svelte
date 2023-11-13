import { derived, get, writable } from "svelte/store";
import type { Movie } from "@/types/movie";

export const movies = writable<Movie[]>([]);
export const search = writable("");
export const filteredMovies = derived([movies, search], () => get(movies).filter((movie) => movie.name.toLowerCase().includes(get(search).toLowerCase())));
