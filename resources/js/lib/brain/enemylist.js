/*
 * File : /resources/js/lib/brain/enemylist.js
 * Project : ETFaLeak2
 * ----
 * File Created : Thursday, 5th December 2024 @ 22:51:32 +01:00
 * Author : Pacôme Renimel (pacome.renimel--lamire@etu.univ-tours.fr)
 * For : Polytech Tours
 * ----
 * Last Modified : Friday, 6th December 2024 @ 05:01:50 +01:00
 * By : Pacôme Renimel (pacome.renimel--lamire@etu.univ-tours.fr)
 */

import { Enemy } from './enemy.js';

export class EnemyList {
    constructor(explosions) {
        this.enemies = [];
        this.indexesToDestroy = [];
        this.explosions = explosions;
        console.log('EnemyList created');
    }

    update(player, ExperienceList, countdown) {
        // Update all the enemies
        for (let i = 0; i < this.enemies.length; i++) {
            let enemy = this.enemies[i];
            enemy.update(player);
        }

        // Destroy the enemies that need to be destroyed (health <= 0)

        // Find the indexes of the enemies to destroy
        for (let i = 0; i < this.enemies.length; i++) {
            let enemy = this.enemies[i];
            if (enemy.health <= 0) {
                this.indexesToDestroy.push(i);
                // Spawn an experience point at the enemy's position
                ExperienceList.addExperience(enemy.x, enemy.y);
                // Spawn an explosion at the enemy's position
                this.explosions.addExplosion(enemy.x, enemy.y);
            }
        }

        for (let i = 0; i < this.indexesToDestroy.length; i++) {
            let index = this.indexesToDestroy[i];
            this.enemies.splice(index, 1);
        }
        this.indexesToDestroy = [];

        // Spawn new enemies
        // Countdown is in seconds. The lower the countdown, the higher the spawn rate
        let maxEnemies = 300 - countdown;
        if (this.enemies.length < maxEnemies) {
            this.spawn_enemy(player, player.mapSize);
        }
    }

    render(ctx, camera, player) {
        // Render all the enemies
        for (let i = 0; i < this.enemies.length; i++) {
            let enemy = this.enemies[i];
            enemy.render(ctx, camera, player);
        }
    }

    spawn_enemy(player, mapSize) {
        let valid = false;
        while (!valid) {
            let x = Math.floor(Math.random() * mapSize);
            let y = Math.floor(Math.random() * mapSize);
            // Check if the enemy is not too close to the player
            if (Math.abs(x - player.x) > 100 && Math.abs(y - player.y) > 100) {
                valid = true;
                let enemy = new Enemy(x, y, player.bulletList);
                this.enemies.push(enemy);
            }
        }
    }
}
