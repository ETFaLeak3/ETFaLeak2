<script lang="ts">
    import { page } from "@inertiajs/svelte";
    import { Button } from "$lib/components/ui/button";
    import { ThemeSwitcher } from "@/lib/components/ui/theme-switcher";

    let { title, link } : { title : boolean, link : boolean } = $props();
</script>

<nav class={`w-screen h-fit px-32 py-8 flex flex-row justify-start items-center z-10 absolute`}>
    {#if title}
        <a href="/" class="text-4xl font-bold">ETFaLeak</a>
    {/if}
    <div class="w-full flex flex-row items-center justify-end">
        <div class="flex flex-row items-center gap-12 z-10">
            {#if link}
                {#if !$page.props.auth.user}
                    <div class="flex flex-row gap-4 z-10">
                        <Button href="/login" variant="link" size="sm">Se connecter</Button>
                        <Button href="/register" variant="link" size="sm">S'inscrire</Button>
                    </div>
                {:else}
                    <div class="flex flex-row gap-4 z-10">
                        <Button href="/profile" variant="link" size="sm">Profil</Button>
                        <Button href="/logout" variant="link" size="sm" method="post">Se déconnecter</Button>
                    </div>
                {/if}
            {/if}
            <ThemeSwitcher />
        </div>
    </div>
</nav>