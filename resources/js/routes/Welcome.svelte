<script lang="ts">
    import { Layout } from "@/layouts/";
    import { Particles } from "@/lib/components/ui/particles";
    import { Navbar } from "@/lib/components/ui/navbar";
    import { Title } from "@/lib/components/ui/title";

    import { mode } from "mode-watcher";
</script>

<Layout>
    <main class="w-full h-full bg-white dark:bg-black">
        <div class="w-full h-full p-8">
            <div class="relative w-full h-full border bg-[#f3f3f3] dark:bg-[#0e0e0e] rounded-md">
                <div class="w-full h-full z-10">
                    <Navbar title={false} link={true} />
                    <div class="flex flex-col items-center justify-center h-full">
                        <Title>ETFaLeak</Title>
                        <p class="text-lg text-center mt-4">Welcome to ETFaLeak, a website for the "Nuit de l'info" 2024</p>
                    </div>
                </div>
                {#if $mode === "dark"}
                    <Particles className="absolute inset-0 z-0" refresh={true} color={"#ffffff"} />
                {:else}
                    <Particles className="absolute inset-0" refresh={true} color={"#000000"} />
                {/if}
            </div>
        </div>
    </main>
</Layout>