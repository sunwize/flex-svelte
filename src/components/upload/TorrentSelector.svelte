<script lang="ts">
    import { Card, Spinner, Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from "flowbite-svelte";
    import { movie, torrent } from "$lib/store/upload";
    import { api } from "$lib/services/api";
    import type { Torrent } from "@/types/torrent";
    import { ArrowDownSolid, ArrowUpSolid } from "flowbite-svelte-icons";

    let loading = false;
    let torrents: Torrent[]|null = null;

    const searchTorrents = async () => {
        if (!$movie) return;

        try {
            loading = true;
            const { data } = await api.get<Torrent[]>("/api/torrents/search", {
                params: {
                    q: $movie.name,
                },
            });

            torrents = data;
        } catch (err) {
            console.error(err);
        } finally {
            loading = false;
        }
    };

    movie.subscribe(() => searchTorrents());
</script>

{#if $movie}
    <Card class={`w-full max-w-3xl mx-auto ${$$props.class}`}>
        <h1 class="text-white font-bold text-2xl mb-4">Find a torrent</h1>
        {#if loading}
            <div class="text-center">
                <Spinner
                    color="white"
                    size="10"
                />
            </div>
            <p class="text-center mt-4">Fetching torrents</p>
        {:else if torrents}
            <Table hoverable>
                <TableHead>
                    <TableHeadCell>Title</TableHeadCell>
                    <TableHeadCell>Size</TableHeadCell>
                    <TableHeadCell>Seeds</TableHeadCell>
                    <TableHeadCell>Peers</TableHeadCell>
                </TableHead>
                <TableBody>
                    {#each torrents as torrentDetails}
                        <TableBodyRow
                            on:click={() => torrent.set(torrentDetails)}
                            class={`cursor-pointer ${$torrent?.desc === torrentDetails.desc ? "!bg-primary-600" : ""}`}
                        >
                            <TableBodyCell
                                class="max-w-sm truncate"
                                title={torrentDetails.title}
                            >
                                {torrentDetails.title}
                            </TableBodyCell>
                            <TableBodyCell>{torrentDetails.size}</TableBodyCell>
                            <TableBodyCell>
                                <span class="flex items-center gap-1 text-green-400">
                                    <ArrowUpSolid size="xs" />
                                    {torrentDetails.seeds}
                                </span>
                            </TableBodyCell>
                            <TableBodyCell>
                                <span class="flex items-center gap-1 text-red-400">
                                    <ArrowDownSolid size="xs" />
                                    {torrentDetails.peers}
                                </span>
                            </TableBodyCell>
                        </TableBodyRow>
                    {/each}
                </TableBody>
            </Table>
        {:else}
            <p class="text-center">No torrent found</p>
        {/if}
    </Card>
{/if}
