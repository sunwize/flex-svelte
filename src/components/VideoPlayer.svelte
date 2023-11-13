<script lang="ts">
    import { movie } from "$lib/store/player";
    import { tmdbPosterHD } from "$lib/images/poster";
    import CastButton from "./CastButton.svelte";

    $: url = `/api/movies/watch/${$movie?.id}`;
</script>

{#if $movie}
    <div class={`relative bg-black aspect-[16/9] flex items-center ${$$props.class}`}>
        <video
            poster={tmdbPosterHD($movie.backdrop)}
            src={url}
            controls
            class="w-full h-full"
        >
            <track
                kind="captions"
                src="/"
            />
        </video>
        <CastButton class="absolute top-3 right-3" />
    </div>
{/if}
