<script lang="ts">
    import { ModeWatcher } from "mode-watcher";
    let { children } = $props();
</script>

<div class="transition-all duration-300">
    <ModeWatcher />       
    {@render children?.()}
</div>