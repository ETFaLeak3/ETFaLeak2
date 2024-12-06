<script lang="ts">
    import Navbar from '@/lib/components/ui/navbar/navbar.svelte';
</script>

<main class="w-full h-screen bg-white dark:bg-black">
    <Navbar title={true} link={false} avatar={true} />
    <div
        class="w-full h-full flex flex-col items-center justify-center gap-12 p-10"
    >
        <h1 class="text-4xl font-extrabold">Menu de jeu</h1>
        <div class="flex flex-col items-center gap-12 w-full h-full">
            <button
                class="text-2xl w-full rounded-xl bg-slate-500 hover:bg-slate-700 h-20 hover:h-1/2 transition-all duration-200 flex flex-col items-center justify-center text-white font-bold group gap-3 p-4"
                onclick={() => {
                    window.location.href = '/brain';
                }}
                >Cerveau

                <p class="hidden group-hover:block font-normal">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Laboriosam temporibus, error nulla illum assumenda est odio
                    cum magnam necessitatibus id numquam illo excepturi,
                    laudantium ipsa. Animi labore libero consectetur illo. Lorem
                    ipsum dolor sit amet consectetur adipisicing elit. Officiis
                    numquam consequuntur at quae, nostrum saepe? Totam
                    inventore, voluptatum aspernatur molestiae at dolores
                    perspiciatis ratione tempora? Officia perferendis commodi
                    non quidem.
                </p>
            </button>

            <button
                class="text-2xl p-6 z-10"
                onclick={() => {
                    window.location.href = '/poumons';
                }}>Poumons</button
            >
            <button
                class="text-2xl p-6 z-10"
                onclick={() => {
                    window.location.href = '/race';
                }}>Peau</button
            >
            <button
                class="text-2xl p-6 z-10"
                onclick={() => {
                    window.location.href = '/shrimpyshot';
                }}>Estomac</button
            >
        </div>
    </div>
</main>
