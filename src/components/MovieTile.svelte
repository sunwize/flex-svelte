<script lang="ts">
    import { tmdbPoster } from "$lib/images/poster.js";

    interface MovieTile {
        id: string
        image: string
        name: string
    }

    export let movie: MovieTile;
</script>

<a
    href={`/movies/${movie.id}`}
    class={`flex justify-center ${$$props.class}`}
>
    <img
        src={tmdbPoster(movie.image)}
        alt={movie.name}
        class="aspect-[2/3] object-cover rounded-md shadow-lg bg-black"
    />
</a>
