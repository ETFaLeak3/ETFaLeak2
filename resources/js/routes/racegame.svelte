<script>
    import { onMount } from "svelte";
    
    let speed = 0;
    let offset1 = 1;
    let offset2 = 98;
    let currentFrame = 1;
    let fishInterval;
    let somme = 0;
    let fishY = 45;
    let rocks = [];
    let goal = 20000;
    let progresstot = 0;
    let win = false;
    let timer = 0;
    let timerInterval;
    let gameStarted = false;

    function increaseSpeed() {
        startTimer();
        if (speed < 25 && !win) {
            speed += 1;
        }
        /* on, regle l'offset pour le sable */



    }

    function updateTimerDisplay() {
    const timerElement = document.getElementById("timer-display");
    timerElement.textContent = `Temps : ${formatTime(timer)}`;
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, '0')}`; // Format MM:SS
}

    function startTimer() {
    if (!gameStarted) {
        gameStarted = true; // Le jeu commence
        timerInterval = setInterval(() => {
            if (win) {
                stopTimer();
                return;
            } 
            timer++;
            updateTimerDisplay();
        }, 1000); // Incrémente le timer toutes les secondes
    }

    function stopTimer() {
        clearInterval(timerInterval);


}
}

    function animate() {
        progresstot += speed;
        
        if (progresstot >= goal) {
            console.log("goal reached");
            speed = 0;
            win = true;
        }
        else{
            console.log(progresstot);
        }

        updateProgressDisplay(); // Mettre à jour la progression affichée
        checkVictory();


        offset1 -= speed * 0.1;
        offset2 -= speed * 0.1;

        /* on regarde si le poisson est en colision avec un rocher */

        for (let i = 0; i < rocks.length; i++) {
            if (rocks[i].x < 30 && rocks[i].x > 25 && rocks[i].y < fishY + 7 && rocks[i].y > fishY - 6) {
                speed = 0;
                /*on enleve le rocher de la liste */
                rocks = rocks.filter((rock, index) => index !== i);
        
            }
        }

        if (somme < 100) {
            somme += speed;
        } else {
            somme = 0;
            updateFishFrame();
            somme = 0;
        }

        if (offset1 <= -96) offset1 = 96;
        if (offset2 <= -96) offset2 = 96;

        requestAnimationFrame(animate);
    }

    function handleKeyDown(event) {
        if (event.key === "ArrowDown") {
            fishY = Math.min(fishY + 10, 90);
        }
        if (event.key === "ArrowUp") {
            fishY = Math.max(fishY - 10, 5);
        }
        if (event.key === "a") {
            speed= 0;
        }
    }

    function updateFishFrame() {
        clearInterval(fishInterval);
        currentFrame = currentFrame === 1 ? 2 : 1;
    }

    function addRock() {
        const rockY = Math.floor(Math.random() * 90);
        const rockX = 100;
        
        rocks = [...rocks, { x: rockX, y: rockY }];
    }

    function addMultipleRocks() {
        for (let i = 0; i < 5; i++) {
            if (Math.random() < 0.7) {
                addRock();
            }
        }
    }

    function animateRocks() {
        rocks = rocks.map((rock) => {
            return { ...rock, x: rock.x - speed * 0.1 };
        }).filter((rock) => rock.x > -10);
        requestAnimationFrame(animateRocks);
    }

    function updateProgressDisplay() {
    const progressElement = document.getElementById("progress-percentage");
    const percentage = Math.min(Math.round((progresstot / goal) * 100), 100);
    progressElement.textContent = percentage; // Met à jour l'affichage
}
function checkVictory() {
    if (progresstot >= goal) {
        const victoryMessage = document.getElementById("victory-message");
        const pointsDisplay = document.getElementById("points");

        // Met à jour les points affichés
        pointsDisplay.textContent = 1000-(timer-15)*50;

        // Affiche le message de victoire
        victoryMessage.style.display = "block";
        //arret du timer
        stopTimer();
        // Arrête l'animation
        speed = 0;
    }
}

    onMount(() => {
        animate();
        animateRocks();
        window.addEventListener("keydown", handleKeyDown);
        setInterval(() => {
            if (speed != 0) {
                addMultipleRocks();
                rocks = [...rocks]; // Force la mise à jour de l'interface utilisateur
            }
        }, 1000);
        setInterval(() => {
            if (speed != 0) {
                if (Math.random() < 0.5) {
                addMultipleRocks();
                rocks = [...rocks]; // Force la mise à jour de l'interface utilisateur
                }
            }
        }, Math.random() * 2000 + 1000);

        return () => {
            clearInterval(fishInterval);
            window.removeEventListener("keydown", handleKeyDown);
        };
    });
</script>

<style>
    .game-container {
        position: relative;
        width: 100vw;
        height: 100vh;
        overflow: hidden;
        background-color: #875721;
    }

    .sand {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-image: url("../../../public/racegame/sandtextur5.png");
        background-size: cover;
        background-repeat: no-repeat;
        transform: translateX(var(--offset, 0%));
        will-change: transform;
    }

    .fish {
        z-index: 10;
        position: absolute;
        left: 30%;
        width: 10%;
        height: auto;
        transform: translateX(-50%);
        transition: top 0.2s ease;
    }

    .rock {
        z-index: 5;
        position: absolute;
        width: 14rem;
        height: auto;
    }
    .progress-popup {
    position: absolute;
    top: 5%;
    left: 5%;
    transform: translateX(-50%);
    padding: 1rem 2rem;
    background-color: rgba(255, 255, 255, 0.9);
    border: 2px solid #000;
    border-radius: 10px;
    font-family: Arial, sans-serif;
    font-size: 1.5rem;
    font-weight: bold;
    z-index: 1000;
    text-align: center;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}
.victory-message {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 2rem 3rem;
    background-color: rgba(255, 255, 255, 0.95);
    border: 3px solid #4CAF50; /* Couleur verte pour célébration */
    border-radius: 15px;
    font-family: Arial, sans-serif;
    font-size: 2rem;
    text-align: center;
    z-index: 1000;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
    animation: pop-in 0.5s ease-out;
}

@keyframes pop-in {
    from {
        transform: translate(-50%, -50%) scale(0.8);
        opacity: 0;
    }
    to {
        transform: translate(-50%, -50%) scale(1);
        opacity: 1;
    }
}

</style>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="game-container" onclick={() => {increaseSpeed()}}>
    <img
        class="fish"
        src={`/racegame/poisson${currentFrame}.png`}
        alt="Animated fish"
        style="top: {fishY}%"
    />
    <div class="sand" style="--offset: {offset1}%"></div>
    <div class="sand" style="--offset: {offset2}%"></div>
    <div>
        {#each rocks as rock}
        <div 
            class="rock" 
            style="top: {rock.y}%; left: {rock.x}%;"
        >
            <img src="/racegame/rochet.png" alt="Rock" />
        </div>
        {/each}
    </div>
    <div class="progress-popup">
      <span id="progress-percentage">0</span>%
    </div>
    <div class="victory-message" style="display: none;" id="victory-message">
        🎉 Félicitations ! Vous avez gagnez avec <span id="points"></span> points ! 🎉
    </div>

    <div id="timer-display" style="
    position: absolute;
    top: 5%;
    right: 10%;
    padding: 1rem;
    background-color: rgba(0, 0, 0, 0.7);
    color: white;
    font-family: Arial, sans-serif;
    font-size: 1.5rem;
    border-radius: 8px;">
    Temps : 0:00
</div>
</div>