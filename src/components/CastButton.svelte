<script lang="ts">
    import { Button } from "flowbite-svelte";
    import { onMount } from "svelte";
    import { movie } from "$lib/store/player";
    import CastIcon from "./icons/CastIcon.svelte";

    let isAvailable = false;
    let player = null;
    let remoteController = null;

    const cast = async () => {
        if (!isAvailable || !$movie) return;

        window.cast.framework.CastContext.getInstance().setOptions({
            autoJoinPolicy: window.chrome.cast.AutoJoinPolicy.CUSTOM_CONTROLLER_SCOPED,
            language: "en",
            resumeSavedSession: true,
            receiverApplicationId: window.chrome.cast.media.DEFAULT_MEDIA_RECEIVER_APP_ID,
        });

        await window.cast.framework.CastContext.getInstance().requestSession();

        const origin = window.origin.startsWith("http://localhost") ? "http://192.168.2.14:5173" : window.origin;
        const src = `${origin}/api/movies/watch/${$movie.id}`;
        const mediaInfo = new window.chrome.cast.media.MediaInfo(src, "video/mp4");
        const mediaMetaData = new window.chrome.cast.media.MovieMediaMetadata();
        mediaMetaData.images = $movie.image ? [new window.chrome.cast.Image($movie.image)] : [];
        mediaMetaData.title = $movie.name;

        mediaInfo.metadata = mediaMetaData;
        const request = new window.chrome.cast.media.LoadRequest(mediaInfo);
        const session = window.cast.framework.CastContext.getInstance().getCurrentSession();

        if (!session) return;

        await session.loadMedia(request);
    };

    onMount(() => {
        try {
            isAvailable = !!window.cast.framework.CastContext.getInstance();
            player = new window.cast.framework.RemotePlayer();
            remoteController = new window.cast.framework.RemotePlayerController(player);
        } catch {
            isAvailable = false;
        }
    });
</script>

{#if isAvailable}
    <Button
        on:click={cast}
        pill
        outline
        class={`!p-2 ${$$props.class}`}
    >
        <CastIcon />
    </Button>
{/if}
