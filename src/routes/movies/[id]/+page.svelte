<script lang="ts">
    import { page } from "$app/stores";
    import { onMount } from "svelte";
    import { api } from "$lib/services/api";
    import type { Movie, TmdbMovie } from "@/types/movie";
    import { tmdbPosterHD } from "$lib/images/poster";
    import { Button, Rating, Skeleton, TextPlaceholder, VideoPlaceholder } from "flowbite-svelte";
    import { PlaySolid } from "flowbite-svelte-icons";
    import { movie, visible } from "$lib/store/player";
    import { addSeconds, format } from "date-fns";

    let tmdbMovie: TmdbMovie;
    let loading = false;
    $: loaded = tmdbMovie && !loading;

    onMount(async () => {
        try {
            loading = true;
            const { data } = await api.get<Movie>(`/api/movies/${$page.params.id}`);
            const { data: movieDetails } = await api.get<TmdbMovie>(`/api/movies/tmdb/${data.tmdbId}`);

            movie.set(data);
            tmdbMovie = movieDetails;
        } finally {
            loading = false;
        }
    });
</script>

<section class="relative flex flex-col w-full flex-1 leading-snug max-w-6xl mx-auto md:py-10 md:px-1">
    <article class="hidden md:grid grid-cols-12 w-full flex-1">
        {#if loaded}
            <img
                src={tmdbPosterHD(tmdbMovie.image)}
                alt={tmdbMovie.name}
                class="col-span-5 h-full rounded-l-md object-cover"
            />
        {:else}
            <div class="col-span-5 w-full h-full">
                <VideoPlaceholder class="max-w-full h-full rounded-r-none" />
            </div>
        {/if}
        <div class="col-span-7 bg-white/10 rounded-l-md md:rounded-l-none rounded-r-md p-5">
            {#if loaded}
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
            {:else}
                <Skeleton size="xxl" />
                <TextPlaceholder
                    size="xxl"
                    class="mt-8"
                />
                <TextPlaceholder
                    size="xxl"
                    class="mt-3"
                />
            {/if}
        </div>
    </article>
    <article class="flex md:hidden flex-col flex-1">
        {#if loaded}
            <img
                src={tmdbPosterHD(tmdbMovie.backdrop)}
                alt={tmdbMovie.name}
                class="absolute top-0 left-0 w-full h-full object-cover"
            />
        {/if}
        <div class="relative flex-1 min-h-full bg-black/80 backdrop-blur p-5">
            {#if loaded}
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
            {:else}
                <Skeleton size="xxl" />
                <TextPlaceholder
                    size="xxl"
                    class="mt-8"
                />
            {/if}
        </div>
    </article>
</section>
