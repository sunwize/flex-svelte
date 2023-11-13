import { writable } from "svelte/store";
import type { Movie } from "@/types/movie";

export const visible = writable(false);
export const movie = writable<Movie|null>(null);
