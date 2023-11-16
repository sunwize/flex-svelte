<script lang="ts">
    import MovieSelector from "@/components/upload/MovieSelector.svelte";
    import TorrentSelector from "@/components/upload/TorrentSelector.svelte";
    import { Button, Card, Spinner } from "flowbite-svelte";
    import { movie, torrent } from "$lib/store/upload";
    import { api } from "$lib/services/api";

    let loading = false;

    $: uploadVisible = !!$movie && !!$torrent;

    const uploadMovie = async () => {
        if (!$torrent) return;

        try {
            loading = true;
            await api.post<string>("/api/torrents/upload", {
                torrent: $torrent,
            });
        } catch (err) {
            console.error(err);
        } finally {
            loading = false;
        }
    };
</script>

<section class="dark p-1 md:p-5">
    <MovieSelector />
    <TorrentSelector class="mt-4" />
    {#if uploadVisible}
        <Card class="w-full max-w-3xl mx-auto mt-4">
            <Button
                on:click={uploadMovie}
                size="lg"
                disabled={loading}
            >
                {#if loading}
                    <Spinner
                        color="white"
                        class="w-5 h-5 mr-1"
                    />
                {/if}
                Upload movie
            </Button>
        </Card>
    {/if}
</section>
