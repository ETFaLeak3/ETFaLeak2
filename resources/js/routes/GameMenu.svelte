<script lang="ts">
    import Navbar from "@/lib/components/ui/navbar/navbar.svelte";
</script>

<main class="w-full h-full bg-white dark:bg-black">
    <Navbar title={true} link={false} avatar={true}/>
    <div class="w-full h-full flex flex-col items-center justify-center gap-12">
        <h1 class="text-4xl font-extrabold">Menu de jeu</h1>
        <div class="flex flex-col items-center gap-12">
            <button class="text-2xl p-6 z-10" onclick={() => {window.location.href='/brain'}}>Cerveau</button>
            <button class="text-2xl p-6 z-10" onclick={() => {window.location.href='/poumons'}}>Poumons</button>
            <button class="text-2xl p-6 z-10" onclick={() => {window.location.href='/race'}}>Peau</button>
            <button class="text-2xl p-6 z-10" onclick={() => {window.location.href='/shrimpyshot'}}>Estomac</button>
        </div>

</main>