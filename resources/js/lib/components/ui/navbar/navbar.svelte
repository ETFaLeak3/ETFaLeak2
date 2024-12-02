<script lang="ts">
    import { page } from "@inertiajs/svelte";
    import { Button } from "$lib/components/ui/button";
    import { ThemeSwitcher } from "@/lib/components/ui/theme-switcher";
    import { UserNav } from "$lib/components/ui/user-nav";

    let { title, link, avatar } : { title : boolean, link : boolean, avatar? : boolean } = $props();
</script>

<nav class={`w-screen h-fit px-32 py-8 flex flex-row justify-start items-center z-10 absolute`}>
    {#if title}
        <a href="/" class="text-4xl font-bold">ETFaLeak</a>
    {/if}
    <div class="w-full flex flex-row items-center justify-end">
        <div class="flex flex-row items-center gap-8 z-10">
            {#if link}
                {#if !$page.props.auth.user}
                    <div class="flex flex-row gap-4 z-10">
                        <Button href="/login" variant="link" size="sm">Se connecter</Button>
                        <Button href="/register" variant="link" size="sm">S'inscrire</Button>
                    </div>
                {:else if avatar}
                    <div class="flex flex-row gap-4 z-10 items-center">
                        <UserNav />
                    </div>
                {:else}
                    <div class="flex flex-row gap-4 z-10">
                        <a href="/logout" class="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 text-primary underline-offset-4 hover:underline h-9 rounded-md px-3">Se déconnecter</a>
                    </div>
                {/if}
            {/if}
            <ThemeSwitcher />
        </div>
    </div>
</nav>