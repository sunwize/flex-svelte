<script lang="ts">
    import { Button, Input, Navbar, NavBrand } from "flowbite-svelte";
    import "../app.postcss";
    import { SearchOutline } from "flowbite-svelte-icons";
    import { search } from "$lib/store";
    import VideoDrawer from "../components/VideoDrawer.svelte";

    const onSearchChange = (event: Event) => search.set((event.target as HTMLInputElement).value);
</script>

<Navbar class="dark bg-blue-950">
    <NavBrand href="/">
        <span class="text-white font-black text-3xl flex items-center">
            <span>FLE</span>
            <span class="text-primary-600">X</span>
        </span>
    </NavBrand>
    <div class="hidden md:block flex-1 max-w-3xl mx-3">
        <Input
            value={$search}
            on:input={onSearchChange}
            placeholder="Search movie..."
            class="!bg-white/10 hover:!bg-white/20 focus:!bg-white/20"
        >
            <SearchOutline
                slot="left"
                class="w-4 h-4"
            />
        </Input>
    </div>
    <Button>Upload</Button>
</Navbar>
<slot />
<VideoDrawer />
