<script lang="ts">
    import { Button } from "@/lib/components/ui/button";

    const { phpVersion } = $props() as {
        phpVersion: string
    };

    let count = $state(0);
</script>

<main class="w-screen h-screen flex items-center justify-center bg-zinc-100">
    <div class="bg-white size-16 shadow-md">
        <Button onclick={() => count++}>{count}</Button>
    </div>
</main>
