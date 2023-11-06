<script lang="ts">
    import { CloseButton, Drawer } from "flowbite-svelte";
    import { sineIn } from "svelte/easing";
    import { movie, visible } from "$lib/store/player";
    import VideoPlayer from "./VideoPlayer.svelte";
</script>

<Drawer
    class="bg-black flex flex-col min-h-full gap-5"
    placement="bottom"
    width="w-full h-full"
    transitionType="fly"
    transitionParams={{
        duration: 200,
        easing: sineIn,
    }}
    hidden={!$visible}
>
    {#if $movie}
        <div class="flex items-center gap-3">
            <h3 class="text-3xl font-bold truncate">{$movie.name}</h3>
            <CloseButton
                on:click={() => visible.set(false)}
                color="dark"
            />
        </div>
        <div class="bg-red-500 h-full relative overflow-hidden">
            <VideoPlayer class="absolute left-0 top-0 w-full h-full" />
        </div>
    {/if}
</Drawer>
