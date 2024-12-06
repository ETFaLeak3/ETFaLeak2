/*
 * File : /resources/js/lib/brain/bulletlist.js
 * Project : ETFaLeak2
 * ----
 * File Created : Thursday, 5th December 2024 @ 22:03:13 +01:00
 * Author : Pacôme Renimel (pacome.renimel--lamire@etu.univ-tours.fr)
 * For : Polytech Tours
 * ----
 * Last Modified : Friday, 6th December 2024 @ 00:40:36 +01:00
 * By : Pacôme Renimel (pacome.renimel--lamire@etu.univ-tours.fr)
 */

import { Bullet } from './bullet.js';

export class BulletList {
    constructor() {
        this.bullets = [];
        this.indexesToDestroy = [];
        console.log('BulletList created');
        this.texture = new Image();
        let path = '/brainSrc/missile.png';
        this.texture.src = path;
    }

    update(enemies, player, camera) {
        // Update the bullets
        for (let i = 0; i < this.bullets.length; i++) {
            let bul = this.bullets[i];
            bul.velx = Math.cos(bul.angle) * bul.speed;
            bul.vely = Math.sin(bul.angle) * bul.speed;
            bul.x += bul.velx;
            bul.y += bul.vely;

            // Check if the bullet is out of the camera view
            if (
                bul.x < camera.x ||
                bul.x > camera.x + camera.width ||
                bul.y < camera.y ||
                bul.y > camera.y + camera.height
            ) {
                this.indexesToDestroy.push(i);
                continue;
            }

            // Check if the bullet hits an enemy
            if (bul.ally) {
                for (let j = 0; j < enemies.enemies.length; j++) {
                    if (
                        Math.sqrt(
                            (bul.x - enemies.enemies[j].x) ** 2 +
                                (bul.y - enemies.enemies[j].y) ** 2,
                        ) <
                        bul.size / 2 + enemies.enemies[j].size / 2
                    ) {
                        enemies.enemies[j].takeDamage(bul.damage);
                        this.indexesToDestroy.push(i);
                    }
                }
            }
        }

        // Deletes the bullets that are out of the screen or hit an enemy, starting from the last one
        // to avoid index shifting
        for (let i = this.indexesToDestroy.length - 1; i >= 0; i--) {
            this.bullets.splice(this.indexesToDestroy[i], 1);
        }
        // Clear the indexesToDestroy array for the next update
        this.indexesToDestroy = [];
    }

    render(ctx, camera) {
        // Render the bullets, taking the camera position into account
        // If the bullet is out of the camera view, don't render it
        for (let i = 0; i < this.bullets.length; i++) {
            let bul = this.bullets[i];

            ctx.save();
            ctx.translate(bul.x - camera.x, bul.y - camera.y);
            // Rotate the bullet according to its angle + 90 degrees
            ctx.rotate(bul.angle + Math.PI / 2);
            ctx.drawImage(
                this.texture,
                -bul.size / 2,
                -bul.size / 2,
                bul.size,
                bul.size,
            );
            ctx.restore();
        }
    }

    addBullet(ally, x, y, angle, damage, speed, size) {
        this.bullets.push(new Bullet(ally, x, y, angle, damage, speed, size));
    }
}
