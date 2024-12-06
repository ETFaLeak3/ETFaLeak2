<script lang="ts">
    let { className, onClick } : { className?: string, onClick: any } = $props();
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<div style="position: relative;" class={`relative select-none ${className}`}>
    <img src="/sprites/Sprite1.png" alt="SpriteAlgue" class={`w-fit h-auto ${className}`}>
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div 
        style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" 
        onclick={onClick}>
    </div>
</div>