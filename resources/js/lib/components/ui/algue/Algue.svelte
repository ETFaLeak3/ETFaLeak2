<script lang="ts">
    let { className, onClick } : { className?: string, onClick: any } = $props();
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<img src="/sprites/Sprite1.png" alt="Sprite1" class={`w-fit h-auto hover:cursor-pointer ${className}`} onclick={onClick}>