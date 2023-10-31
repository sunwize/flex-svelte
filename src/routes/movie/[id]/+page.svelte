<script lang="ts">
    import { page } from "$app/stores";
    import { onMount } from "svelte";
    import { api } from "$lib/services/api";
    import type { Movie, TmdbMovie } from "../../../types/movie";
    import { tmdbPosterHD } from "$lib/images/poster";
    import { Button } from "flowbite-svelte";
    import { PlaySolid } from "flowbite-svelte-icons";
    import { movie, visible } from "$lib/store/player";

    let tmdbMovie: TmdbMovie;

    onMount(async () => {
        const { data } = await api.get<Movie>(`/api/movie/${$page.params.id}`);
        const { data: movieDetails } = await api.get<TmdbMovie>(`/api/movie/tmdb/${data.tmdbId}`);

        movie.set(data);
        tmdbMovie = movieDetails;
    });
</script>

<section class="leading-snug max-w-6xl mx-auto pt-10">
    {#if tmdbMovie}
        <article class="flex">
            <img
                src={tmdbPosterHD(tmdbMovie.image)}
                alt={tmdbMovie.name}
                width="500"
                class="rounded-l-md"
            />
            <div class="bg-white/10 rounded-r-md p-5">
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

                <p>{tmdbMovie.description}</p>
            </div>
        </article>
    {/if}
</section>
