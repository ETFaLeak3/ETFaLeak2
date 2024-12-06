/*
 * File : /resources/js/lib/brain/bullet.js
 * Project : ETFaLeak2
 * ----
 * File Created : Thursday, 5th December 2024 @ 21:26:41 +01:00
 * Author : Pacôme Renimel (pacome.renimel--lamire@etu.univ-tours.fr)
 * For : Polytech Tours
 * ----
 * Last Modified : Friday, 6th December 2024 @ 00:38:57 +01:00
 * By : Pacôme Renimel (pacome.renimel--lamire@etu.univ-tours.fr)
 */

export class Bullet {
    constructor(ally, x, y, angle, damage, speed, size) {
        this.ally = ally;
        this.x = x;
        this.y = y;
        this.angle = angle;
        this.velx;
        this.vely;
        this.size = size;
        this.speed = speed;
        this.damage = damage;
    }
}
