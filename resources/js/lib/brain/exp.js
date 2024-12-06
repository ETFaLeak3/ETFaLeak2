/*
 * File : /resources/js/lib/brain/exp.js
 * Project : ETFaLeak2
 * ----
 * File Created : Thursday, 5th December 2024 @ 23:05:59 +01:00
 * Author : Pacôme Renimel (pacome.renimel--lamire@etu.univ-tours.fr)
 * For : Polytech Tours
 * ----
 * Last Modified : Friday, 6th December 2024 @ 01:04:20 +01:00
 * By : Pacôme Renimel (pacome.renimel--lamire@etu.univ-tours.fr)
 */

export class Experience {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = 20;
    }
}

export class ExperienceList {
    constructor() {
        this.experiences = [];
        this.indexesToDestroy = [];
    }
    addExperience(x, y) {
        this.experiences.push(new Experience(x, y));
    }
    removeExperience(index) {
        this.experiences.splice(index, 1);
    }
    update(player) {
        for (let i = 0; i < this.experiences.length; i++) {
            // Check if the player is colliding with the experience
            let exp = this.experiences[i];
            let distance = Math.sqrt(
                (exp.x - player.x) ** 2 + (exp.y - player.y) ** 2,
            );
            if (distance < exp.size / 2 + player.size / 2) {
                this.indexesToDestroy.push(i);
                player.experience += player.experienceGain;
            } else if (distance < player.pickupRange) {
                let angle = Math.atan2(exp.y - player.y, exp.x - player.x);
                exp.x -= Math.cos(angle) * 5;
                exp.y -= Math.sin(angle) * 5;
            }
        }

        for (let i = this.indexesToDestroy.length - 1; i >= 0; i--) {
            this.removeExperience(this.indexesToDestroy[i]);
        }

        this.indexesToDestroy = [];
    }
    render(ctx, camera) {
        this.experiences.forEach((exp) => {
            ctx.save();
            ctx.fillStyle = 'yellow';
            ctx.translate(exp.x - camera.x, exp.y - camera.y);
            ctx.beginPath();
            ctx.arc(0, 0, exp.size / 2, 0, Math.PI * 2);
            ctx.fill();

            ctx.restore();
        });
    }
}
