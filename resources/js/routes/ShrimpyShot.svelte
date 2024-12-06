<script>
    import { onMount } from "svelte";
  
    let canvas;
    let ctx;
  
    // Images (chemins relatifs à partir du dossier public)
    const bagImage = new Image();
    const playerImage = new Image();
    const playerShootingImage = new Image();
    const foregroundImage = new Image();
    const middlegroundImage = new Image();
    const backgroundImage = new Image();
    const bubbleImage = new Image();
    const squishedBubbleImage = new Image();
  
    bagImage.src = "/Plastic_Bag.png"; 
    playerImage.src = "/Beatrice_Standard.png";
    playerShootingImage.src = "/Beatrice_Angry.png";
    foregroundImage.src = "/Foreground.png";
    middlegroundImage.src = "/Middleground.png";
    backgroundImage.src = "/Background.png";
    bubbleImage.src = "/Bubble.png";
    squishedBubbleImage.src = "/Squished_Bubble.png";
  
    // Variables de jeu
    let keys = { space: false };
    let player, bubbles, enemies, score, gameOver, gameWon, lastShotTime, lastEnemySpawnTime;
    const shotDelay = 500;
    const enemySpawnDelay = 2500;
    let speedMultiplier = 1;
    let backgroundX = 0;
    let middlegroundX = 0;
  
    // Setup du canvas après le montage du composant
    onMount(() => {
      ctx = canvas.getContext("2d");
      resetGame();
      gameLoop();
  
      window.addEventListener("keydown", handleKeyDown);
      window.addEventListener("keyup", handleKeyUp);
  
      return () => {
        window.removeEventListener("keydown", handleKeyDown);
        window.removeEventListener("keyup", handleKeyUp);
      };
    });
  
    function resetGame() {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
  
      player = {
        x: width * 0.1,
        y: height * 0.5,
        width: width * 0.1,
        height: height * 0.1,
        dy: 0,
        gravity: 0.5,
        jumpStrength: -height * 0.015,
        image: playerImage,
      };
  
      bubbles = [];
      enemies = [];
      score = 0;
      gameOver = false;
      gameWon = false;
      lastShotTime = 0;
      lastEnemySpawnTime = Date.now();
      backgroundX = 0;
      middlegroundX = 0;
    }
  
    function handleKeyDown(e) {
      if (e.code === "Space") {
        if (gameOver || gameWon) {
          resetGame();
          gameLoop();
        } else {
          if (!keys.space) jump();
          keys.space = true;
        }
      } else if (e.code === "KeyS") {
        shootBubble();
      }
    }
  
    function handleKeyUp(e) {
      if (e.code === "Space") keys.space = false;
    }
  
    function jump() {
      player.dy = player.jumpStrength;
    }
  
    function shootBubble() {
      const currentTime = Date.now();
      if (currentTime - lastShotTime >= shotDelay) {
        const bubbleImageToUse = bubbleImage;
        bubbles.push({
          x: player.x + player.width,
          y: player.y + player.height / 2,
          radius: 32,
          dx: 8 * speedMultiplier,
          image: bubbleImageToUse,
        });
  
        lastShotTime = currentTime;
        player.image = playerShootingImage;
  
        setTimeout(() => {
          player.image = playerImage;
        }, 200);
      }
    }
  
    function spawnEnemy() {
      if (!gameWon) {
        enemies.push({
          x: canvas.clientWidth,
          y: Math.random() * (canvas.clientHeight - 64),
          width: canvas.clientWidth * 0.08,
          height: canvas.clientHeight * 0.08,
          dx: 4 * speedMultiplier,
        });
        lastEnemySpawnTime = Date.now();
      }
    }
  
    function updateSpeedMultiplier() {
      speedMultiplier = 1 + score * 0.15;
    }
  
    function gameLoop() {
      if (gameOver || gameWon) {
        // Affichage de la fin du jeu
        ctx.fillStyle = "white";
        ctx.font = `${canvas.width * 0.05}px Arial`;
        ctx.textAlign = "center";
        ctx.fillText(gameWon ? "Bravo, Vous avez Gagné!" : "Game Over", canvas.width / 2, canvas.height / 2 - 30);
        ctx.fillText(`Votre Score: ${score}`, canvas.width / 2, canvas.height / 2 + 20);
  
        // Dessin du bouton pour revenir au menu
        drawGameOverScreen();
        return;
      }
  
      // Update positions
      backgroundX -= 1 * speedMultiplier;
      middlegroundX -= 2 * speedMultiplier;
  
      if (backgroundX <= -canvas.width) backgroundX = 0;
      if (middlegroundX <= -canvas.width) middlegroundX = 0;
  
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
  
      // Draw background
      ctx.drawImage(backgroundImage, backgroundX, 0, canvas.width, canvas.height);
      ctx.drawImage(backgroundImage, backgroundX + canvas.width, 0, canvas.width, canvas.height);
  
      // Draw middleground
      ctx.drawImage(middlegroundImage, middlegroundX, 0, canvas.width, canvas.height);
      ctx.drawImage(middlegroundImage, middlegroundX + canvas.width, 0, canvas.width, canvas.height);
  
      // Draw ground
      const groundHeight = 50;
      ctx.fillStyle = "black";
      ctx.fillRect(0, canvas.height - groundHeight, canvas.width, groundHeight);
  
      // Draw foreground
      ctx.drawImage(foregroundImage, 0, 0, canvas.width, canvas.height);
  
      // Draw player
      ctx.drawImage(player.image, player.x, player.y, player.width, player.height);
  
      // Gravity logic
      player.dy += player.gravity;
      player.y += player.dy;
  
      if (player.y > canvas.height - player.height - groundHeight) {
        player.y = canvas.height - player.height - groundHeight;
        player.dy = 0;
      }
      if (player.y < 0) {
        player.y = 0;
        player.dy = 0;
      }
  
      // Draw and update bubbles
      bubbles.forEach((bubble, index) => {
        bubble.x += bubble.dx;
        bubble.image = bubble.image === bubbleImage ? squishedBubbleImage : bubbleImage;
        ctx.drawImage(bubble.image, bubble.x - bubble.radius, bubble.y - bubble.radius, bubble.radius * 2, bubble.radius * 2);
  
        // Remove bubbles off-screen
        if (bubble.x > canvas.width) bubbles.splice(index, 1);
      });
  
      // Draw and update enemies
      enemies.forEach((enemy, index) => {
        enemy.x -= enemy.dx;
        ctx.drawImage(bagImage, enemy.x, enemy.y, enemy.width, enemy.height);
  
        // Collision logic with bubbles and player
        bubbles.forEach((bubble, bIndex) => {
          if (
            bubble.x < enemy.x + enemy.width &&
            bubble.x + bubble.radius > enemy.x &&
            bubble.y < enemy.y + enemy.height &&
            bubble.y + bubble.radius > enemy.y
          ) {
            enemies.splice(index, 1);
            bubbles.splice(bIndex, 1);
            score++;
            updateSpeedMultiplier();
          }
        });
  
        // Check if enemy reaches the left side
        if (enemy.x + enemy.width < 0) {
          gameOver = true;
        }
  
        // Check for collision with player
        if (
          player.x < enemy.x + enemy.width &&
          player.x + player.width > enemy.x &&
          player.y < enemy.y + enemy.height &&
          player.y + player.height > enemy.y
        ) {
          gameOver = true;
        }
  
        if (enemy.y + enemy.height > canvas.height - groundHeight) {
          enemy.y = canvas.height - enemy.height - groundHeight;
        }
      });
  
      // Display score
      ctx.fillStyle = "black";
      const scoreFontSize = canvas.width * 0.03;
      ctx.font = `${scoreFontSize}px Arial`;
      const scoreText = "Score: " + score;
      ctx.fillText(scoreText, 20, scoreFontSize);
  
      // Spawn enemies
      const currentTime = Date.now();
      if (currentTime - lastEnemySpawnTime > enemySpawnDelay) {
        spawnEnemy();
      }
  
      if (score >= 1) {
        gameWon = true;
      }
  
      requestAnimationFrame(gameLoop);
    }
  
    function drawGameOverScreen() {
      const button = document.createElement("button");
      button.textContent = "Retour au Menu";
      button.style.position = "absolute";
      button.style.top = "50%";
      button.style.left = "50%";
      button.style.transform = "translate(-50%, -50%)";
      button.style.padding = "20px";
      button.style.fontSize = "20px";
      button.style.backgroundColor = "#4CAF50";
      button.style.color = "white";
      button.style.border = "none";
      button.style.borderRadius = "5px";
      button.style.cursor = "pointer";
      button.onclick = () => {
        // Redirect to menu
        window.location.href = "/";
      };
      document.body.appendChild(button);
    }
  </script>
  
  <style>
    canvas {
      display: block;
      margin: auto;
      border-radius: 20px;
      background: #171717;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }
  </style>
  
  <canvas bind:this={canvas} width={window.innerWidth} height={window.innerHeight}></canvas>
  