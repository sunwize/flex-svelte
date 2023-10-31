<script lang="ts">
    import { onMount } from "svelte";
    import { api } from "$lib/services/api";
    import MovieTile from "../components/MovieTile.svelte";
    import { Spinner } from "flowbite-svelte";
    import { filteredMovies, movies } from "$lib/store";

    let loading = false;

    onMount(async () => {
        if ($movies.length > 0) return;

        try {
            loading = true;
            const { data } = await api.get("/api/movies");
            movies.set(data);
        } finally {
            loading = false;
        }
    });
</script>

{#if loading}
    <div class="flex justify-center py-16">
        <Spinner size="14" />
    </div>
{/if}
<section class="grid grid-cols-12 xl:grid-cols-14 gap-1 md:gap-3 p-1 md:p-5">
    {#each $filteredMovies as movie}
        <MovieTile movie={movie} />
    {/each}
</section>
