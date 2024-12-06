/*
 * File : /resources/js/lib/brain/explosions.js
 * Project : ETFaLeak2
 * ----
 * File Created : Friday, 6th December 2024 @ 01:22:37 +01:00
 * Author : Pacôme Renimel (pacome.renimel--lamire@etu.univ-tours.fr)
 * For : Polytech Tours
 * ----
 * Last Modified : Friday, 6th December 2024 @ 01:34:47 +01:00
 * By : Pacôme Renimel (pacome.renimel--lamire@etu.univ-tours.fr)
 */

class Explosion {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = 100;
        this.frames = 0;
        this.currentFrame = 0;

        this.textures = [
            new Image(),
            new Image(),
            new Image(),
            new Image(),
            new Image(),
        ];
        this.paths = [
            '/brainSrc/explosion1.png',
            '/brainSrc/explosion2.png',
            '/brainSrc/explosion3.png',
            '/brainSrc/fire1.png',
            '/brainSrc/fire2.png',
        ];
        for (let i = 0; i < this.textures.length; i++) {
            this.textures[i].src = this.paths[i];
        }
    }
}

export class ExplosionList {
    constructor() {
        this.explosions = [];
        this.toDestroy = [];
    }

    addExplosion(x, y) {
        this.explosions.push(new Explosion(x, y));
    }

    update() {
        for (let i = 0; i < this.explosions.length; i++) {
            let explosion = this.explosions[i];
            explosion.size += 0.5;
            explosion.frames++;
            if (explosion.frames > 20) {
                this.toDestroy.push(i);
            }
        }

        // Destroy the explosions starting from the end to avoid index shifting
        for (let i = this.toDestroy.length - 1; i >= 0; i--) {
            let index = this.toDestroy[i];
            this.explosions.splice(index, 1);
        }

        this.toDestroy = [];
    }

    render(ctx, camera) {
        for (let i = 0; i < this.explosions.length; i++) {
            let explosion = this.explosions[i];
            explosion.currentFrame = Math.floor(explosion.frames / 5);
            let texture = explosion.textures[explosion.currentFrame];
            let x = explosion.x - camera.x;
            let y = explosion.y - camera.y;
            let size = explosion.size;
            ctx.drawImage(texture, x - size / 2, y - size / 2, size, size);
        }
    }
}
