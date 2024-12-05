<script lang="ts">
    let { className } : { className?: string } = $props();
</script>

<img src="/sprites/Sprite1.png" alt="Sprite1" class={`w-fit h-auto hover:cursor-pointer ${className}`}>