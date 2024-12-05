<script lang=ts>
    import Prolifera from "@/lib/components/ui/prolifera/Prolifera.svelte";

    let matrix = Array.from({length: Math.floor(window.innerWidth / 50)}, (_, i) => 
      Array.from({length: Math.floor(window.innerHeight / 50)}, (_, j) => 
      (i === 0 || j === 0 || i === Math.floor(window.innerWidth / 50) - 1 || j === Math.floor(window.innerHeight / 50) - 1) ? 0 : 0
      )
    );

    let count = 0;
    while (count < 5) {
      for (let i = 1; i < matrix.length - 1; i++) {
      for (let j = 1; j < matrix[i].length - 1; j++) {
        if (Math.random() > 0.98) {
        if (
          matrix[i-1][j-1] !== 1 && matrix[i-1][j] !== 1 && matrix[i-1][j+1] !== 1 &&
          matrix[i][j-1] !== 1 && matrix[i][j+1] !== 1 &&
          matrix[i+1][j-1] !== 1 && matrix[i+1][j] !== 1 && matrix[i+1][j+1] !== 1
        ) {
          matrix[i][j] = 1;
          count++;
          if (count >= 5) break;
        }
        }
      }
      if (count >= 5) break;
      }
    }
    // After spawning the 5 mandatory 1s, we have a 5% chance to spawn additional 1s
    for (let i = 1; i < matrix.length - 1; i++) {
      for (let j = 1; j < matrix[i].length - 1; j++) {
        if (matrix[i][j] !== 1 && Math.random() < 0.01) {
          if (
            matrix[i-1][j-1] !== 1 && matrix[i-1][j] !== 1 && matrix[i-1][j+1] !== 1 &&
            matrix[i][j-1] !== 1 && matrix[i][j+1] !== 1 &&
            matrix[i+1][j-1] !== 1 && matrix[i+1][j] !== 1 && matrix[i+1][j+1] !== 1
          ) {
            matrix[i][j] = 1;
          }
        }
      }
    }

</script>


<div class="flex flex-row w-dvw h-dvh">
  {#each matrix as row}
  <div class='flex flex-col'>
    {#each row as cell}
      <div class="w-fit h-fit">
        {#if cell === 1}
          <Prolifera />
        {:else}
          <Prolifera className="opacity-0" />
        {/if}
      </div>
    {/each}
    </div>
  {/each}
</div>