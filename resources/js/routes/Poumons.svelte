<script lang=ts>
    import Prolifera from "@/lib/components/ui/prolifera/Prolifera.svelte";

    //fais un tableau de 20 sur 10
    //let tableau = Array.from({length: 20}, () => Array.from({length: 10}, () => 0));
    let matrix = [
    [1, 1, 1],
    [0, 1, 0],
    [1, 1, 1]
    ];
</script>


<div class="flex flex-row w-dvw h-dvh">
  {#each matrix as row}
  <div class='flex flex-col'>
    {#each row as cell}
      <div class="w-[dvw] h-[5dvh] bg-red-500 border border-green-500">
        {#if cell === 1}
          <Prolifera></Prolifera>
        {/if}
      </div>
    {/each}
    </div>
  {/each}
</div>