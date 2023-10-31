<script lang="ts">
    import { movie } from "$lib/store/player";
    import { tmdbPosterHD } from "$lib/images/poster";

    $: url = `/api/movie/watch/${$movie?.id}`;
</script>

{#if $movie}
    <div class={`bg-black aspect-[16/9] flex items-center ${$$props.class}`}>
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
    </div>
{/if}
