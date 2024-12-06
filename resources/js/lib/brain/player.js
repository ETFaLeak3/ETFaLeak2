/*
 * File : /resources/js/lib/brain/player.js
 * Project : ETFaLeak2
 * ----
 * File Created : Thursday, 5th December 2024 @ 19:57:57 +01:00
 * Author : Pacôme Renimel (pacome.renimel--lamire@etu.univ-tours.fr)
 * For : Polytech Tours
 * ----
 * Last Modified : Friday, 6th December 2024 @ 01:40:13 +01:00
 * By : Pacôme Renimel (pacome.renimel--lamire@etu.univ-tours.fr)
 */

// Upgrades
// 0 : Increase player's speed
// 1 : Increase player's damage
// 2 : Increase player's health
// 3 : Increase player's fire rate
// 4 : Increase player's experience gain
// 5 : Increase player's pick up range
// 6 : Increase player's bullet size
// 7 : Increase player's bullet speed

// Function to generate a random integer between min and max
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export class Player {
    constructor(mapSize, bulletList, camera) {
        this.x = 1000;
        this.y = 1000;
        this.size = 50;
        this.velx = 0;
        this.vely = 0;
        this.drag = 0.9;
        this.speed = 1;
        this.maxVel = 10;
        this.health = 100;
        this.pickupRange = 100;
        this.mapSize = mapSize;
        this.camera = camera;
        this.fireRate = 50;
        this.defaultCooldown = 30;
        this.shootCooldown = 10;
        this.iFrame = 0;
        this.experience = 0;
        this.experienceGain = 10;
        this.level = 1;
        this.nextLevelExperience = 100;
        this.nextLevelMultiplier = 1.3;
        this.damage = 30;
        this.bulletSpeed = 5;
        this.bulletSize = 30;
        this.upgradeCoef = 1.5;

        this.isUpgrading = false;
        // define random upgrades
        this.upgrades = [randomInt(0, 7), randomInt(0, 7), randomInt(0, 7)];
        this.selectedUpgrade = 0;

        this.bulletList = bulletList;

        // Textures
        this.texture = new Image();
        this.whiteTexture = new Image();
        // The texture
        let path = '/brainSrc/ship.png';
        this.texture.src = path;
        // Add a white overlay to the player's whiteTexture
        this.texture.onload = () => {
            let canvas = document.createElement('canvas');
            canvas.width = this.texture.width;
            canvas.height = this.texture.height;
            let ctx = canvas.getContext('2d');
            ctx.drawImage(this.texture, 0, 0);
            ctx.globalCompositeOperation = 'source-atop';
            ctx.fillStyle = 'white';
            ctx.fillRect(0, 0, this.texture.width, this.texture.height);
            this.whiteTexture.src = canvas.toDataURL();
        };

        // Cooldown reduction every 10ms
        this.cooldownInterval = setInterval(() => {
            if (this.shootCooldown > 0) this.shootCooldown--;
        }, 10);

        console.log('Player created');
    }

    update(enemies, bullets) {
        // Reduce the invincibility frame
        if (this.iFrame > 0) this.iFrame--;
        // Apply drag to the player's velocity
        this.velx *= this.drag;
        this.vely *= this.drag;
        // Apply velocity to the player's position
        this.x += this.velx;
        this.y += this.vely;
        // Clamp the player's velocity to the maximum velocity
        this.velx = Math.max(-this.maxVel, Math.min(this.maxVel, this.velx));
        this.vely = Math.max(-this.maxVel, Math.min(this.maxVel, this.vely));

        // clamp the velocity if close to 0
        if (Math.abs(this.velx) < 0.1) this.velx = 0;
        if (Math.abs(this.vely) < 0.1) this.vely = 0;

        // Clamp the player position to the world size
        this.x = Math.max(0, Math.min(this.x, this.mapSize - this.size));
        this.y = Math.max(0, Math.min(this.y, this.mapSize - this.size));

        // Keep player position as a whole number
        this.x = Math.round(this.x);
        this.y = Math.round(this.y);

        // Check if the enemies are close enough to shoot them
        // Loop through all the enemies and shoot towards the closest one
        let closestEnemy = null;
        let closestDistance = Infinity;
        for (let enemy of enemies.enemies) {
            let dx = enemy.x - this.x;
            let dy = enemy.y - this.y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < closestDistance) {
                closestDistance = distance;
                closestEnemy = enemy;
            }
        }

        // Check if the player can shoot
        if (this.shootCooldown <= 0 && closestEnemy) {
            // Shoot towards the closest enemy
            let dx = closestEnemy.x - this.x;
            let dy = closestEnemy.y - this.y;
            let angle = Math.atan2(dy, dx);
            // Add the bullet to the world
            this.shootCooldown = Math.max(10, 100 - this.fireRate);
            // add bullet
            this.bulletList.addBullet(
                true,
                this.x,
                this.y,
                angle,
                this.damage,
                this.bulletSpeed,
                this.bulletSize,
            );
        }

        // Check if the player has enough experience to level up
        if (this.experience >= this.nextLevelExperience) {
            // Level up the player
            this.level++;
            // Increase the next level experience
            this.nextLevelExperience *= this.nextLevelMultiplier;
            // round it up to the nearest integer
            this.nextLevelExperience = Math.ceil(this.nextLevelExperience);
            // Reset the player's experience
            this.experience = 0;
            this.isUpgrading = true;
        }
    }

    render(ctx, camera) {
        // Display the player at the correct position.
        // The rotation of the image is the same as the player's velocity.
        // The rotation should add 90 degrees to the angle of the velocity
        ctx.save();
        ctx.translate(this.x - camera.x, this.y - camera.y);
        // Draw the player's health bar
        ctx.fillStyle = 'red';
        ctx.fillRect(-this.size / 2, -this.size / 2 - 20, this.size, 5);
        ctx.fillStyle = 'green';
        ctx.fillRect(
            -this.size / 2,
            -this.size / 2 - 20,
            (this.size * this.health) / 100,
            5,
        );
        ctx.rotate(Math.atan2(this.vely, this.velx) + Math.PI / 2);
        // If the player is currently invincible, draw the player sprite with a lower opacity
        let texture;
        if (this.iFrame > 0 && this.iFrame % 10 < 5) {
            texture = this.whiteTexture;
        } else {
            texture = this.texture;
        }

        ctx.drawImage(
            texture,
            -this.size / 2,
            -this.size / 2,
            this.size,
            this.size,
        );

        ctx.restore();

        if (this.isUpgrading) {
            // Draw the player's upgrade menu
            ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
            let topLeftX = 30;
            let topLeftY = 30;
            let upgradeBoxWidth = camera.w - 60;
            let upgradeBoxHeight = camera.h - 100;
            ctx.fillRect(topLeftX, topLeftY, upgradeBoxWidth, upgradeBoxHeight);

            ctx.fillStyle = 'white';
            ctx.font = '30px Arial';
            ctx.fillText(`Level: ${this.level}`, topLeftX + 20, topLeftY + 40);
            // Draw three upgrade options
            let upgradeNames = [
                'Speed',
                'Damage',
                'Heal',
                'Fire Rate',
                'Experience Gain',
                'Pick Up Range',
                'Bullet Size',
                'Bullet Speed',
            ];
            let upgradeValues = [
                this.speed,
                this.damage,
                this.health,
                this.fireRate,
                this.experienceGain,
                this.pickupRange,
                this.bulletSize,
                this.bulletSpeed,
            ];
            // Draw a rectangle for each upgrade
            let upgradeWidth = upgradeBoxWidth / 3 - 40; // 10px margin
            let upgradeHeight = upgradeBoxHeight - 100; // 10px margin + 40px for the level

            for (let i = 0; i < 3; i++) {
                let x = topLeftX + 20 + i * (upgradeWidth + 20);
                let y = topLeftY + 60;
                if (i === this.selectedUpgrade) {
                    ctx.strokeStyle = 'white';
                    ctx.lineWidth = 5;
                    ctx.strokeRect(x, y, upgradeWidth, upgradeHeight);
                    ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
                } else {
                    ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
                }
                ctx.fillRect(x, y, upgradeWidth, upgradeHeight);
                // Draw the upgrade name
                ctx.fillStyle = 'white';
                ctx.fillText(upgradeNames[this.upgrades[i]], x + 10, y + 40);
                ctx.fillText(
                    `Current: ${upgradeValues[this.upgrades[i]]}`,
                    x + 10,
                    y + 80,
                );
                let nextUpgradeValue =
                    upgradeNames[this.upgrades[i]] === 'Heal'
                        ? upgradeValues[this.upgrades[i]] + 100
                        : upgradeValues[this.upgrades[i]] * this.upgradeCoef;
                ctx.fillText(`Upgraded: ${nextUpgradeValue}`, x + 10, y + 120);
            }
        }
    }

    takeDamage(damage) {
        // If the player is invincible, don't take damage
        if (this.iFrame > 0) return;
        // Reduce the player's health
        this.health -= damage;
        // Set the invincibility frame
        this.iFrame = 60;
        this.camera.shake(10);
    }

    upgrade() {
        // Increase the selected upgrade
        let upgrade = this.upgrades[this.selectedUpgrade];
        switch (upgrade) {
            case 0:
                this.speed *= this.upgradeCoef;
                break;
            case 1:
                this.damage *= this.upgradeCoef;
                break;
            case 2:
                this.health += 100;
                break;
            case 3:
                this.fireRate *= this.upgradeCoef;
                break;
            case 4:
                this.experienceGain *= this.upgradeCoef;
                break;
            case 5:
                this.pickupRange *= this.upgradeCoef;
                break;
            case 6:
                this.bulletSize *= this.upgradeCoef;
                break;
            case 7:
                this.bulletSpeed *= this.upgradeCoef;
                break;
        }
        // Reset the upgrades
        this.upgrades = [randomInt(0, 7), randomInt(0, 7), randomInt(0, 7)];
        this.selectedUpgrade = 0;
        this.isUpgrading = false;
    }
}
