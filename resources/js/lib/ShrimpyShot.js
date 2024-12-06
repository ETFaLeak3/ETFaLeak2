const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const bagImage = new Image();
bagImage.src = 'Plastic_Bag.png';

const playerImage = new Image();
playerImage.src = 'Beatrice_Standard.png';

const playerShootingImage = new Image();
playerShootingImage.src = 'Beatrice_Angry.png';

const foregroundImage = new Image();
foregroundImage.src = 'Foreground.png';

const middlegroundImage = new Image();
middlegroundImage.src = 'Middleground.png';

const backgroundImage = new Image();
backgroundImage.src = 'Background.png';

const bubbleImage = new Image();
bubbleImage.src = 'Bubble.png';

const squishedBubbleImage = new Image();
squishedBubbleImage.src = 'Squished_Bubble.png';

// Key states
const keys = { space: false };

// Canvas dimensions
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Update player and enemy positions based on new canvas dimensions
function resetGame() {
  player = { x: canvas.width * 0.1, y: canvas.height * 0.5, width: canvas.width * 0.1, height: canvas.height * 0.1, dy: 0, gravity: 0.5, jumpStrength: -canvas.height * 0.015, image: playerImage };
  bubbles = [];
  enemies = [];
  score = 0;
  gameOver = false;
  lastShotTime = 0;
  lastEnemySpawnTime = Date.now();
  backgroundX = 0;
  middlegroundX = 0;
}

// Player jump
function jump() {
  player.dy = player.jumpStrength;
}

// Game variables
let player, bubbles, enemies, score, gameOver, lastShotTime, lastEnemySpawnTime;
const shotDelay = 500; // 500ms delay between shots
const enemySpawnDelay = 2500; // 1500ms delay between forced enemy spawns
let speedMultiplier = 1; // Speed multiplier to increase difficulty
let backgroundX = 0;
let middlegroundX = 0;

// Update the speed multiplier based on score or elapsed time
function updateSpeedMultiplier() {
  speedMultiplier = 1 + score * 0.15; // Increase speed by 10% for each point scored
}

// Create an enemy
function spawnEnemy() {
  enemies.push({ x: canvas.width, y: Math.random() * (canvas.height - 64), width: canvas.width * 0.08, height: canvas.height * 0.08, dx: 4 * speedMultiplier });
  lastEnemySpawnTime = Date.now();
}

// Shoot bubble
function shootBubble() {
    const currentTime = Date.now();
    if (currentTime - lastShotTime >= shotDelay) {
      const bubbleImageToUse = bubbleImage; // Start with the first image
      bubbles.push({ x: player.x + player.width, y: player.y + player.height / 2, radius: 32, dx: 8 * speedMultiplier, image: bubbleImageToUse });
      lastShotTime = currentTime;
      player.image = playerShootingImage;
      setTimeout(() => {
        player.image = playerImage;
      }, 200); // Change back to standard image after 200ms
    }
  }

  function gameLoop() {
    if (gameOver) {
        ctx.fillStyle = "red";
        const fontSize = canvas.width * 0.05; // 5% of the canvas width
        ctx.font = `${fontSize}px Arial`;
        if (score >= 10) {
          ctx.fillText("You Win!", canvas.width / 2 - fontSize * 2.5, canvas.height / 2);
        } else {
          ctx.fillText("You Lose!", canvas.width / 2 - fontSize * 2.5, canvas.height / 2);
        }
        ctx.fillText("Score: " + score, canvas.width / 2 - fontSize * 2.5, canvas.height / 2 + fontSize);
        return;
      }
  
    // Update parallax background positions
    backgroundX -= 1 * speedMultiplier;
    middlegroundX -= 2 * speedMultiplier;
  
    if (backgroundX <= -canvas.width) backgroundX = 0;
    if (middlegroundX <= -canvas.width) middlegroundX = 0;
  
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
  
    // Draw foreground (static)
    ctx.drawImage(foregroundImage, 0, 0, canvas.width, canvas.height);
  
    // Draw player
    ctx.drawImage(player.image, player.x, player.y, player.width, player.height);
  
    // Gravity
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
      // Alternate the bubble image
      bubble.image = bubble.image === bubbleImage ? squishedBubbleImage : bubbleImage;
      ctx.drawImage(bubble.image, bubble.x - bubble.radius, bubble.y - bubble.radius, bubble.radius * 2, bubble.radius * 2);
  
      // Remove bubbles off-screen
      if (bubble.x > canvas.width) bubbles.splice(index, 1);
    });
  
    // Draw and update enemies
    enemies.forEach((enemy, index) => {
      enemy.x -= enemy.dx;
      ctx.drawImage(bagImage, enemy.x, enemy.y, enemy.width, enemy.height);
  
      // Check for collision with bubbles
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
          updateSpeedMultiplier(); // Update speed multiplier when score increases
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
  
      // Prevent enemies from intersecting with the ground
      if (enemy.y + enemy.height > canvas.height - groundHeight) {
        enemy.y = canvas.height - enemy.height - groundHeight;
      }
    });
  
    // Display score
    ctx.fillStyle = "black";
    const scoreFontSize = canvas.width * 0.03; // 3% of the canvas width
    ctx.font = `${scoreFontSize}px Arial`;
    const scoreText = "Score: " + score;
    const scoreTextWidth = ctx.measureText(scoreText).width;
    ctx.fillText(scoreText, (canvas.width - scoreTextWidth) / 2, 40);

  
    // Spawn enemies periodically
    const currentTime = Date.now();
    if (enemies.length === 0 || (enemies.length > 0 && enemies[0].x < canvas.width / 2)) {
      if (Math.random() < 0.02) spawnEnemy();
    }
  
    //Forcefully spawn an enemy if there was no enemy for more than 1.5 seconds
    if (currentTime - lastEnemySpawnTime >= enemySpawnDelay) {
      spawnEnemy();
    }
  
    requestAnimationFrame(gameLoop);
  }

// Handle key presses
window.addEventListener("keydown", (e) => {
  if (e.code === "Space") {
    if (gameOver) {
      resetGame();
      gameLoop();
    } else {
      if (!keys.space) jump();
      keys.space = true;
    }
  } else if (e.code === "KeyS") {
    shootBubble();
  }
});

window.addEventListener("keyup", (e) => {
  if (e.code === "Space") keys.space = false;
});

// Start the game
resetGame();
gameLoop();