<script lang="ts">
    import { page } from "@inertiajs/svelte";
    import { Theme, Toast } from "@/layouts/";
    import { onMount } from "svelte";
    import 'animate.css';
    
    export let children : any;

    let mounted: boolean = false;

    onMount(() => {
        mounted = true;
    });

    $: {
        if (mounted) {
            if ($page.props.flash.href) {
                window.location.href = $page.props.flash.href;
            }
        }
    };

</script>

<Theme>
    <Toast>
        <main class="w-dvw h-dvh animate__animated animate__fadeIn animate__faster">
            {@render children?.()}
        </main>
    </Toast>
</Theme>