<script lang="ts">
    import { Badge, Button, Card, Rating, Search, Spinner } from "flowbite-svelte";
    import { SearchOutline } from "flowbite-svelte-icons";
    import { api } from "$lib/services/api";
    import type { TmdbMovie } from "@/types/movie";
    import { tmdbPoster } from "$lib/images/poster";
    import { format } from "date-fns";

    let search = "Across the Spider-Verse";
    let loading = false;
    let movies: TmdbMovie[]|null = null;
    let movie: TmdbMovie|null = null;

    const searchMovie = async () => {
        try {
            loading = true;
            movie = null;
            const { data } = await api.get("/api/movies/search", {
                params: {
                    q: search,
                },
            });

            movies = data;
        } catch (err) {
            console.error(err);
        } finally {
            loading = false;
        }
    };

    const searchTorrents = async () => {
        try {
            loading = true;
            const { data } = await api.get("/api/torrents/search", {
                params: {
                    q: search,
                },
            });

            console.log(data);
        } catch (err) {
            console.error(err);
        } finally {
            loading = false;
        }
    };

    const handleEnterKeyPress = (event: KeyboardEvent) => {
        if (event.key !== "Enter") return;
        return searchMovie();
    };
</script>

<section class="dark p-1 md:p-5">
    <Card class="w-full max-w-3xl mx-auto">
        <h1 class="text-white font-bold text-2xl mb-4">Find your movie</h1>
        <div class="flex items-stretch gap-1">
            <Search
                bind:value={search}
                on:keypress={handleEnterKeyPress}
                placeholder="Search a movie..."
            />
            <Button
                on:click={searchMovie}
                disabled={!search || loading}
                class="!px-3"
            >
                {#if loading}
                    <Spinner
                        color="white"
                        class="w-5 h-5"
                    />
                {:else}
                    <SearchOutline class="w-5 h-5 outline-0" />
                {/if}
            </Button>
        </div>
        {#if movie}
            <article class="flex flex-col md:flex-row items-center md:items-start gap-3 mt-4">
                <img
                    src={tmdbPoster(movie.image)}
                    alt={movie.name}
                    class="w-48 aspect-[2/3] object-cover rounded shadow-lg bg-black"
                />
                <div>
                    <p class="text-white text-2xl font-bold">{movie.name}</p>
                    {#if movie.rating}
                        <Rating
                            total={5}
                            rating={movie.rating}
                            class="-ml-1.5 mb-2"
                        />
                    {/if}
                    {#if movie.releaseDate}
                        <Badge color="dark">
                            {format(new Date(movie.releaseDate), "yyyy")}
                        </Badge>
                    {/if}
                    <p class="line-clamp-3 mt-2">{movie.description}</p>
                </div>
            </article>
        {:else if movies}
            {#if movies.length > 0}
                <div class="grid grid-cols-6 md:grid-cols-12 gap-2 mt-4">
                    {#each movies.slice(0, 8) as movieDetails}
                        <button
                            on:click={() => movie = movieDetails}
                            class="col-span-3 rounded hover:outline outline-primary-600"
                        >
                            <img
                                src={tmdbPoster(movieDetails.image)}
                                alt={movieDetails.name}
                                title={movieDetails.name}
                                class="aspect-[2/3] object-cover rounded shadow-lg bg-black"
                            />
                        </button>
                    {/each}
                </div>
            {:else}
                <div class="text-center mt-4">No movie found</div>
            {/if}
        {/if}
    </Card>
</section>
