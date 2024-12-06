/*
 * File : /resources/js/lib/brain/camera.js
 * Project : ETFaLeak2
 * ----
 * File Created : Thursday, 5th December 2024 @ 20:41:07 +01:00
 * Author : Pacôme Renimel (pacome.renimel--lamire@etu.univ-tours.fr)
 * For : Polytech Tours
 * ----
 * Last Modified : Friday, 6th December 2024 @ 00:14:59 +01:00
 * By : Pacôme Renimel (pacome.renimel--lamire@etu.univ-tours.fr)
 */

export class Camera {
    constructor(w, h, mapSize) {
        this.w = w;
        this.h = h;
        this.x = w / 2;
        this.y = h / 2;
        this.target_x = this.x;
        this.target_y = this.y;
        this.mapSize = mapSize;
        this.shakeFrames = 0;
    }
    update(player) {
        this.target_x = player.x - this.w / 2 + player.size / 2;
        this.target_y = player.y - this.h / 2 + player.size / 2;
        this.target_x = Math.max(
            0,
            Math.min(this.target_x, this.mapSize - this.w),
        );

        this.target_y = Math.max(
            0,
            Math.min(this.target_y, this.mapSize - this.h),
        );

        this.x += Math.round((this.target_x - this.x) * 0.1);
        this.y += Math.round((this.target_y - this.y) * 0.1);

        if (this.shakeFrames > 0) {
            this.shakeFrames--;
            this.x += Math.random() * 20;
            this.y += Math.random() * 20;
        }
    }

    shake(frames) {
        this.shakeFrames = frames;
    }

    render(ctx, fps, player, enemies) {
        // display fps on the bottom-left corner
        ctx.fillStyle = 'white';
        ctx.font = '20px Arial';
        ctx.fillText(`FPS: ${fps}`, 10, this.h - 10);

        // draw the minimap
        // background

        // calculate the ratio of the minimap

        let mapSize = this.mapSize;
        let ratio = 20; // The minimap is 10 times smaller than the world.

        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.fillRect(
            this.w - mapSize / ratio,
            0,
            mapSize / ratio,
            mapSize / ratio,
        );

        // Draw the player on the minimap
        ctx.fillStyle = 'red';
        ctx.fillRect(
            this.w - mapSize / ratio + player.x / ratio,
            player.y / ratio,
            player.size / ratio,
            player.size / ratio,
        );

        // Draw the enemies on the minimap
        ctx.fillStyle = 'green';
        enemies.enemies.forEach((enemy) => {
            ctx.fillRect(
                this.w - mapSize / ratio + enemy.x / ratio,
                enemy.y / ratio,
                enemy.size / ratio,
                enemy.size / ratio,
            );
        });

        // Draw the camera on the minimap
        ctx.strokeStyle = 'white';
        ctx.strokeRect(
            this.w - mapSize / ratio + this.x / ratio,
            this.y / ratio,
            this.w / ratio,
            this.h / ratio,
        );

        // Draw the player's experience bar on the bottom of the screen
        ctx.fillStyle = 'black';
        ctx.fillRect(0, this.h - 40, this.w, 40);

        ctx.fillStyle = 'yellow';
        ctx.fillRect(
            0,
            this.h - 40,
            (player.experience / player.nextLevelExperience) * this.w,
            40,
        );

        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.fillRect(0, this.h - 40, this.w / 2, 40);
        ctx.fillStyle = 'white';
        ctx.font = '30px Arial';
        ctx.fillText(
            `Level: ${player.level} - Experience: ${player.experience} / ${player.nextLevelExperience}`,
            10,
            this.h - 10,
        );
    }
}
