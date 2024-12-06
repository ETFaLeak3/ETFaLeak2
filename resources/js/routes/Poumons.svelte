<script lang="ts">
  import Prolifera from "@/lib/components/ui/prolifera/Prolifera.svelte";
  import Algue from "@/lib/components/ui/algue/Algue.svelte";
  import { onMount } from "svelte";

  let matrix = Array.from({ length: Math.floor(window.innerWidth / 50) }, (_, i) =>
    Array.from({ length: Math.floor(window.innerHeight / 50) }, (_, j) =>
      i === 0 || j === 0 || i === Math.floor(window.innerWidth / 50) - 1 || j === Math.floor(window.innerHeight / 50) - 1 ? 0 : 0
    )
  );

  let count = 0;
  let gameOver = false;
  let victory = false;

  const GAME_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds
  let progress = 0; // Progress percentage (0 to 100)

  function checkGameOver() {
    let totalCells = matrix.length * matrix[0].length;
    let count2 = matrix.flat().filter(cell => cell === 2).length;
    if (count2 / totalCells >= 0.1) {
      gameOver = true;
      return true;
    }

    for (let i = 1; i < matrix.length - 1; i++) {
      for (let j = 1; j < matrix[i].length - 1; j++) {
        if (matrix[i][j] === 1) {
          const neighbors = [
            matrix[i-1][j-1], matrix[i-1][j], matrix[i-1][j+1],
            matrix[i][j-1], matrix[i][j+1],
            matrix[i+1][j-1], matrix[i+1][j], matrix[i+1][j+1]
          ];
          if (neighbors.every(val => val === 2)) {
            gameOver = true;
            return true;
          }
        }
      }
    }
    return false;
  }

  function initializeMatrix() {
    while (count < 5 && !gameOver) {
      for (let i = 1; i < matrix.length - 1; i++) {
        for (let j = 1; j < matrix[i].length - 1; j++) {
          if (Math.random() > 0.98) {
            if (
              matrix[i - 1][j - 1] !== 1 && matrix[i - 1][j] !== 1 && matrix[i - 1][j + 1] !== 1 &&
              matrix[i][j - 1] !== 1 && matrix[i][j + 1] !== 1 &&
              matrix[i + 1][j - 1] !== 1 && matrix[i + 1][j] !== 1 && matrix[i + 1][j + 1] !== 1
            ) {
              matrix[i][j] = 1;
              count++;
              if (count >= 5) break;
            }
          }
        }
        if (count >= 5 || gameOver) break;
      }
    }
  }

  function click_Algue(event: MouseEvent, i: number, j: number) {
    event.preventDefault();
    matrix[i][j] = 0;
  }

  onMount(() => {
    initializeMatrix();

    // Update progress bar
    const progressInterval = setInterval(() => {
      if (!gameOver && !victory) {
        progress += (100 / GAME_DURATION) * 100; // Increment progress
        if (progress >= 100) {
          progress = 100;
          victory = true; // Player wins
          clearInterval(progressInterval); // Stop updating progress
        }
      }
    }, 100); // Update every 100ms (smooth effect)

    // Check for game over conditions
    const gameInterval = setInterval(() => {
      if (!gameOver && !victory) {
        checkGameOver();
      }
      if (gameOver || victory) clearInterval(gameInterval);
    }, 500);

    // Spawn random `2`s
    setInterval(() => {
      if (!gameOver) {
        let i = Math.floor(Math.random() * matrix.length);
        let j = Math.floor(Math.random() * matrix[0].length);
        if (matrix[i][j] === 0) {
          matrix[i][j] = 2;
        }
      }
    }, 800);
  });
</script>

<div class="relative w-full h-full">
  <!-- Progress bar -->
  <div class="fixed z-10 top-0 left-0 w-full h-2 bg-gray-300 rounded-xl">
    <div
      class="h-full bg-green-500 transition-all duration-[100ms] ease-linear"
      style="width: {progress}%"
    ></div>
  </div>

  <!-- Game grid -->
  <div class="grid grid-cols-[repeat(auto-fit,_minmax(50px,_1fr))] gap-1 w-full h-full">
    {#each matrix as row, x}
      {#each row as cell, y}
        <div class="w-12 h-12 flex items-center justify-center">
          {#if cell === 1}
            <Algue onClick={(event : any) => click_Algue(event, x, y)} />
          {:else if cell === 2}
            <Prolifera onClick={(event : any) => click_Algue(event, x, y)} />
          {:else}
            <Prolifera className="opacity-0" onClick={(event : any) => {}} />
          {/if}
        </div>
      {/each}
    {/each}
  </div>

  <!-- Game over message -->
  {#if gameOver}
    <div class="absolute inset-0 flex items-center justify-center bg-black/70">
      <p class="text-4xl font-bold text-red-600">Game Over!</p>
    </div>
  {/if}

  <!-- Victory message -->
  {#if victory}
    <div class="absolute inset-0 flex items-center justify-center bg-black/70">
      <p class="text-4xl font-bold text-green-600">Victory!</p>
      <button class="px-4 py-2 mt-4 bg-green-600 text-white rounded-md" on:click={() => {window.location.href="/menu"}}>Retour au menu</button>
    </div>
  {/if}
</div>