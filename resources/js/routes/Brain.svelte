<script>
    import { onMount, onDestroy } from 'svelte';
    import { Player } from '@/lib/brain/player.js';
    import { Camera } from '@/lib/brain/camera.js';
    import { BulletList } from '@/lib/brain/bulletlist.js';
    import { EnemyList } from '@/lib/brain/enemylist.js';
    import { ExperienceList } from '@/lib/brain/exp.js';
    import { ExplosionList } from '@/lib/brain/explosions.js';

    let canvas;
    let width = window.innerWidth;
    let height = window.innerHeight;

    let bullets = new BulletList();
    let experiencelist = new ExperienceList();
    let explosionlist = new ExplosionList();
    let enemies = new EnemyList(explosionlist);
    let mapSize = 5000;
    let camera = new Camera(width, height, mapSize);
    let player = new Player(mapSize, bullets, camera);

    // Create a 10 minutes countdown timer
    let countdown = 600;
    let countdownInterval = setInterval(() => {
        if (!player.isUpgrading) {
            countdown--;
        }
        if (countdown <= 0) {
            clearInterval(countdownInterval);
        }
    }, 1000);

    let keys = {};

    let lastFrameTime = 0;
    let fps = 0;

    const handleKeyDown = (event) => {
        keys[event.key] = true;
        if (player.isUpgrading) {
            if (keys['ArrowLeft']) player.selectedUpgrade--;
            if (keys['ArrowRight']) player.selectedUpgrade++;
            if (player.selectedUpgrade < 0) player.selectedUpgrade = 2;
            if (player.selectedUpgrade > 2) player.selectedUpgrade = 0;
            if (keys['Enter'] || keys['SpaceBar']) player.upgrade();
        }
    };
    const handleKeyUp = (event) => {
        keys[event.key] = false;
    };

    const resizeCanvas = () => {
        width = window.innerWidth;
        height = window.innerHeight;

        canvas.width = width;
        canvas.height = height;

        camera.w = width;
        camera.h = height;
    };

    const update = () => {
        if (player.isUpgrading == false) {
            if (keys['ArrowUp']) player.vely -= player.speed;
            if (keys['ArrowDown']) player.vely += player.speed;
            if (keys['ArrowLeft']) player.velx -= player.speed;
            if (keys['ArrowRight']) player.velx += player.speed;

            player.update(enemies, bullets);
            camera.update(player);

            // Update the enemies
            enemies.update(player, experiencelist, countdown);
            // Update the bullets
            bullets.update(enemies, player, camera);
            experiencelist.update(player);
            explosionlist.update();

            // Check if the player is dead
            if (player.health <= 0) {
                alert('You died!');
                window.location.reload();
            }
        }
    };

    const render = (ctx) => {
        // Draw a blue background
        ctx.fillStyle = 'blue';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw the enemies
        experiencelist.render(ctx, camera);
        enemies.render(ctx, camera, player);

        bullets.render(ctx, camera);

        explosionlist.render(ctx, camera);

        player.render(ctx, camera);

        camera.render(ctx, fps.toFixed(1), player, enemies);

        // Draw the countdown timer in the top-center of the screen
        // The timer is drawn as the temperature :
        // 10:00 is +30°C and 0:00 is +0°C
        let temp = countdown / 20;
        ctx.fillStyle = 'white';
        ctx.font = '30px Arial';
        ctx.fillText(`Temperature: +${temp}°C`, width / 2 - 150, 30);
    };

    onMount(() => {
        window.addEventListener('resize', resizeCanvas);
        const ctx = canvas.getContext('2d');
        const gameLoop = (timestamp) => {
            if (lastFrameTime) {
                const delta = timestamp - lastFrameTime;
                fps = 1000 / delta;
            }
            lastFrameTime = timestamp;

            update();
            render(ctx);
            requestAnimationFrame(gameLoop);
        };
        gameLoop();
    });

    onDestroy(() => {
        window.removeEventListener('resize', resizeCanvas);
    });

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
</script>

<canvas bind:this={canvas} {width} {height}></canvas>
