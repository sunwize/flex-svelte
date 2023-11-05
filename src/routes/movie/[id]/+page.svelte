<script lang="ts">
    import { page } from "$app/stores";
    import { onMount } from "svelte";
    import { api } from "$lib/services/api";
    import type { Movie, TmdbMovie } from "../../../types/movie";
    import { tmdbPosterHD } from "$lib/images/poster";
    import { Button, Rating } from "flowbite-svelte";
    import { PlaySolid } from "flowbite-svelte-icons";
    import { movie, visible } from "$lib/store/player";
    import { addSeconds, format } from "date-fns";

    let tmdbMovie: TmdbMovie;

    onMount(async () => {
        const { data } = await api.get<Movie>(`/api/movie/${$page.params.id}`);
        const { data: movieDetails } = await api.get<TmdbMovie>(`/api/movie/tmdb/${data.tmdbId}`);

        movie.set(data);
        tmdbMovie = movieDetails;
    });
</script>

<section class="relative w-full h-full leading-snug max-w-6xl mx-auto pt-10 px-1 pb-1">
    {#if tmdbMovie}
        <article class="hidden md:flex">
            <img
                src={tmdbPosterHD(tmdbMovie.image)}
                alt={tmdbMovie.name}
                width="500"
                class="rounded-l-md object-cover"
            />
            <div class="bg-white/10 rounded-l-md md:rounded-l-none rounded-r-md p-5">
                <h1 class="text-4xl font-bold mb-1">{tmdbMovie.name}</h1>
                <p class="opacity-70 mb-5">
                    {format(new Date(tmdbMovie.releaseDate), "yyyy")}
                    ·
                    {format(addSeconds(new Date(), tmdbMovie.duration), "h")}h{format(addSeconds(new Date(), tmdbMovie.duration), "mm")}
                </p>

                <Rating
                    total={5}
                    rating={tmdbMovie.rating}
                    class="-ml-1.5 mb-2"
                />
                <div class="mb-5">
                    <Button
                        on:click={() => visible.set(true)}
                        class="text-lg"
                    >
                        <span class="mr-3">Lire</span>
                        <PlaySolid />
                    </Button>
                </div>

                <p>
                    {tmdbMovie.description}
                </p>
            </div>
        </article>
        <article class="md:hidden h-full overflow-hidden">
            <img
                src={tmdbPosterHD(tmdbMovie.backdrop)}
                alt={tmdbMovie.name}
                class="absolute top-0 left-0 w-full h-full object-cover"
            />
            <div class="relative bg-black/80 backdrop-blur rounded-l-md md:rounded-l-none rounded-r-md p-5">
                <h1 class="text-4xl font-bold mb-5">{tmdbMovie.name}</h1>

                <div class="mb-5">
                    <Button
                        on:click={() => visible.set(true)}
                        class="text-lg"
                    >
                        <span class="mr-3">Lire</span>
                        <PlaySolid />
                    </Button>
                </div>

                <p>
                    {tmdbMovie.description}
                </p>
            </div>
        </article>
    {/if}
</section>
