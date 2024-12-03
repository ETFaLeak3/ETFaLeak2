<script lang="ts">
    import { Theme, Toast } from "@/layouts/";
    import 'animate.css';
    
    let { children } = $props();

</script>

<Theme>
    <Toast>
        <main class="w-dvw h-dvh animate__animated animate__fadeIn animate__faster">
            {@render children?.()}
        </main>
    </Toast>
</Theme>