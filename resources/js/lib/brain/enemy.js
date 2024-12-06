/*
 * File : /resources/js/lib/brain/enemy.js
 * Project : ETFaLeak2
 * ----
 * File Created : Thursday, 5th December 2024 @ 19:32:50 +01:00
 * Author : Pacôme Renimel (pacome.renimel--lamire@etu.univ-tours.fr)
 * For : Polytech Tours
 * ----
 * Last Modified : Thursday, 5th December 2024 @ 23:39:07 +01:00
 * By : Pacôme Renimel (pacome.renimel--lamire@etu.univ-tours.fr)
 */

// Class for an enemy in the brain game
export class Enemy {
    constructor(x, y, bulletList) {
        this.spawnX = x;
        this.spawnY = y;
        this.x = x;
        this.y = y;
        this.size = 50;
        this.health = 100;
        this.damage = 10;
        this.speed = 1;
        this.range = 1;
        this.bulletList = bulletList;
        this.redframes = 0;

        // Textures
        this.texture = new Image();
        let path = '/brainSrc/ship.png';
        this.texture.src = path;
        this.redTexture = new Image();
        this.texture.onload = () => {
            let canvas = document.createElement('canvas');
            canvas.width = this.texture.width;
            canvas.height = this.texture.height;
            let ctx = canvas.getContext('2d');
            ctx.drawImage(this.texture, 0, 0);
            ctx.globalCompositeOperation = 'source-atop';
            ctx.fillStyle = 'red';
            ctx.fillRect(0, 0, this.texture.width, this.texture.height);
            this.redTexture.src = canvas.toDataURL();
        };
    }

    update(player) {
        // Update the enemy
        // The enemy should move towards the player

        // Get the direction to the player
        let dx = player.x - this.x;
        let dy = player.y - this.y;
        let angle = Math.atan2(dy, dx);

        // Move the enemy towards the player
        this.x += Math.cos(angle) * this.speed;
        this.y += Math.sin(angle) * this.speed;

        // Keep the enemy position as a whole number
        this.x = Math.round(this.x);
        this.y = Math.round(this.y);

        // Check if the enemy is colliding with the player
        let distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < this.size / 2 + player.size / 2) {
            // The enemy is colliding with the player
            // Deal damage to the player
            player.takeDamage(this.damage);
        }
    }

    render(ctx, camera, player) {
        // Display the enemy at the correct position

        ctx.save();
        ctx.translate(this.x - camera.x, this.y - camera.y);
        // If the enemy is not in the camera view, don't render it
        if (this.x < camera.x || this.x > camera.x + camera.width) {
            ctx.restore();
            return;
        }
        // get direction to the player
        let dx = player.x - this.x;
        let dy = player.y - this.y;
        let angle = Math.atan2(dy, dx);
        ctx.rotate(angle + Math.PI / 2);
        let texture = this.texture;
        if (this.redframes > 0) {
            texture = this.redTexture;
            this.redframes--;
        }
        ctx.drawImage(
            texture,
            -this.size / 2,
            -this.size / 2,
            this.size,
            this.size,
        );
        ctx.restore();
    }

    takeDamage(damage) {
        // Deal damage to the enemy
        this.health -= damage;
        this.redframes = 5;
    }
}
