<script lang="ts">
    import { page } from "@inertiajs/svelte";
    import { onMount } from "svelte";
    import { Layout } from "@/layouts/";
    import { Particles } from "@/lib/components/ui/particles";
    import { Meteors } from "@/lib/components/ui/meteors";
    import { Navbar } from "@/lib/components/ui/navbar";
    import { BlurIn } from "@/lib/components/ui/blur-in";
    import { toast } from "svelte-sonner";

    import { mode } from "mode-watcher";

    onMount(() => {
        let status = $page.props.flash.status;

        if (status == 209) {
            toast.success("Vous avez été déconnecté avec succès !");
        }
    });
</script>

<Layout>
    <main class="w-full h-full bg-white dark:bg-black">
        <div class="w-full h-full p-12">
            <div class="relative w-full h-full border bg-[#f3f3f3] dark:bg-[#0e0e0e] rounded-md">
                <div class="w-full h-full z-10">
                    <Navbar title={false} link={true} />
                    <div class="flex flex-col items-center justify-center h-full">
                        <BlurIn class="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-black to-black/50 dark:from-white dark:to-white/50" word="ETFaLeak" />
                        <p class="text-lg font-medium text-center mt-4 text-black/90 dark:text-white/90">Bienvenue sur ETFaLeak, un site pour la Nuit de l'Info 2024 !</p>
                    </div>
                </div>
                {#if $mode === "dark"}
                    <Particles className="absolute inset-0" refresh={true} color={"#ffffff"} />
                {:else}
                    <Particles className="absolute inset-0" refresh={true} color={"#000000"} />
                {/if}
            </div>
        </div>
    </main>
</Layout>