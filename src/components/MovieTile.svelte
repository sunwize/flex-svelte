<script lang="ts">
    import { tmdbPoster } from "$lib/images/poster.js";
    import type { Movie } from "../types/movie";

    export let movie: Movie;
</script>

<a
    href={`/movie/${movie.id}`}
    class="col-span-6 sm:col-span-4 md:col-span-3 lg:col-span-2 flex justify-center"
>
    <img
        src={tmdbPoster(movie.image)}
        alt={movie.name}
        class="aspect-[2/3] object-cover rounded-md shadow-lg bg-black"
    />
</a>
