<script lang="ts">
    import { search } from "$lib/store/index.js";
    import { Button, ButtonGroup, CloseButton, Input, Navbar, NavBrand } from "flowbite-svelte";
    import { ArrowRightSolid, SearchOutline } from "flowbite-svelte-icons";
    import { page } from "$app/stores";

    let isSearchEnabled = false;

    $: isSearchVisible = $page.url.pathname !== "/";

    const onSearchChange = (event: Event) => search.set((event.target as HTMLInputElement).value);
    const handleEnterKeyPress = (event: KeyboardEvent) => {
        if (event.key !== "Enter") return;
        isSearchEnabled = false;
    };
    const clearSearch = () => {
        search.set("");
        document.querySelector<HTMLInputElement>("#navbar-mobile-search input")?.focus();
    };
</script>

<Navbar class="dark bg-blue-950">
    {#if !isSearchEnabled}
        <div class="w-full flex items-center justify-between">
            <NavBrand href="/">
                <span class="text-white font-black text-3xl flex items-center">
                    <span>FLE</span>
                    <span class="text-primary-600">X</span>
                </span>
            </NavBrand>
            {#if !isSearchVisible}
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
            {/if}
            <div class="flex items-center gap-3">
                {#if !isSearchVisible}
                    <Button
                        on:click={() => isSearchEnabled = true}
                        outline
                        class="md:hidden border-0 !bg-transparent !p-2"
                    >
                        <SearchOutline class="outline-0 text-white" />
                    </Button>
                {/if}
                {#if $page.url.pathname !== "/movies/upload"}
                    <Button href="/movies/upload">Upload</Button>
                {/if}
            </div>
        </div>
    {:else}
        <ButtonGroup
            class="w-full"
            id="navbar-mobile-search"
        >
            <Input
                value={$search}
                on:input={onSearchChange}
                on:keypress={handleEnterKeyPress}
                placeholder="Search a movie..."
                type="search"
                autofocus
            >
                <CloseButton
                    on:click={clearSearch}
                    slot="right"
                    class={`!ring-0 ${$search.length === 0 ? "hidden" : ""}`}
                />
            </Input>
            <Button
                on:click={() => isSearchEnabled = false}
                color="primary"
            >
                <ArrowRightSolid />
            </Button>
        </ButtonGroup>
    {/if}
</Navbar>
