<script lang="ts">
    import { onMount } from "svelte";
    import { api } from "$lib/services/api";
    import { VideoPlaceholder } from "flowbite-svelte";
    import { filteredMovies, movies } from "$lib/store";
    import MovieTile from "@/components/MovieTile.svelte";

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
    <section class="grid grid-cols-12 xl:grid-cols-14 gap-1 md:gap-3 p-1 md:p-5">
        {#each { length: 21 } as _}
            <div class="col-span-6 sm:col-span-4 md:col-span-3 lg:col-span-2 aspect-[2/3]">
                <VideoPlaceholder class="h-full" />
            </div>
        {/each}
    </section>
{:else}
    <section class="grid grid-cols-12 xl:grid-cols-14 gap-1 md:gap-3 p-1 md:p-5">
        {#each $filteredMovies as movie}
            <MovieTile
                {movie}
                class="col-span-6 sm:col-span-4 md:col-span-3 lg:col-span-2"
            />
        {/each}
    </section>
{/if}
