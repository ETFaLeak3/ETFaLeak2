<script lang="ts">
    import { page } from "@inertiajs/svelte";
    import { onMount } from "svelte";
    import { Layout } from "@/layouts/";
    import { Particles } from "@/lib/components/ui/particles";
    import { Meteors } from "@/lib/components/ui/meteors";
    import { Navbar } from "@/lib/components/ui/navbar";
    import { BlurIn } from "@/lib/components/ui/blur-in";
    import { toast } from "svelte-sonner";
    import { BorderBeam } from "@/lib/components/ui/border-beam";
    import { Button } from "@/lib/components/ui/button";

    import { mode } from "mode-watcher";

    let mounted: boolean = false;

    onMount(() => {
        mounted = true;
    });

    $: {
        if (mounted) {
            let status = $page.props.flash.status;

            if (status == 209) {
                toast.success("Vous avez été déconnecté avec succès !");
            }
        }
    };
</script>

<Layout>
    <main class="w-full h-full bg-white dark:bg-black">
        <div class="w-full h-full">
            <div class="relative w-full h-full border bg-[#f3f3f3] dark:bg-[#0e0e0e]">
                <div class="w-full h-full z-10">
                    <Navbar title={true} link={true} avatar={true}/>
                    <div class="flex flex-col items-center justify-center h-full gap-60 z-10">
                        <div class="flex flex-col items-center gap-12">
                            <h1 class="text-4xl font-extrabold">Sauvez le dieu des oceans !</h1>
                            <p class="px-64 text-xl text-center z-10">Incarnez un poisson-guérisseur chargé de soigner Thalassor, le dieu des océans, dont les organes vitaux sont en danger. Explorez son corps gigantesque à travers des mini-jeux palpitants : réparez son cœur, purifiez ses poumons, et détoxifiez son foie pour restaurer son équilibre.</p>
                        </div>
                        <Button class="text-2xl p-6 z-10" onclick={() => {window.location.href='/menu'}}>Jouer</Button>
                    </div>
                </div>
            </div>
        </div>
        {#if $mode === "light"}
            <img src="/wavesLight.png" class="fixed bottom-0 right-0 w-full h-1/2 z-0 p-0" />
        {/if}
        {#if $mode === "dark"}
            <img src="/wavesDark.png" class="fixed bottom-0 right-0 w-full h-1/2 z-0 p-0" />
        {/if}
    </main>
</Layout>