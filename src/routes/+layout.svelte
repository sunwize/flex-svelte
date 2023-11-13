<script lang="ts">
    import "../app.postcss";
    import VideoDrawer from "@/components/VideoDrawer.svelte";
    import TopNavBar from "@/components/TopNavBar.svelte";
</script>

<TopNavBar />
<slot />
<VideoDrawer />
