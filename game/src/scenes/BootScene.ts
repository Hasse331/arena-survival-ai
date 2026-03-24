import Phaser from "phaser";
import { GAME_HEIGHT, GAME_WIDTH } from "../game/constants";

export class BootScene extends Phaser.Scene {
  constructor() {
    super("boot");
  }

  create(): void {
    const graphics = this.add.graphics({ x: 0, y: 0 });

    graphics.fillStyle(0xf2a54c, 1);
    graphics.fillCircle(16, 16, 16);
    graphics.generateTexture("player", 32, 32);
    graphics.clear();

    graphics.fillStyle(0xef4444, 1);
    graphics.fillCircle(14, 14, 14);
    graphics.generateTexture("enemy", 28, 28);
    graphics.clear();

    graphics.fillStyle(0x65d66e, 1);
    graphics.fillCircle(12, 12, 12);
    graphics.lineStyle(3, 0xcff7ae, 0.9);
    graphics.strokeCircle(12, 12, 10);
    graphics.generateTexture("health-pickup", 24, 24);
    graphics.clear();

    graphics.fillStyle(0x73a8ff, 1);
    graphics.fillCircle(12, 12, 12);
    graphics.lineStyle(3, 0xe0eeff, 0.95);
    graphics.strokeCircle(12, 12, 10);
    graphics.lineStyle(2, 0xffffff, 0.75);
    graphics.beginPath();
    graphics.moveTo(12, 4);
    graphics.lineTo(18, 8);
    graphics.lineTo(18, 14);
    graphics.lineTo(12, 20);
    graphics.lineTo(6, 14);
    graphics.lineTo(6, 8);
    graphics.closePath();
    graphics.strokePath();
    graphics.generateTexture("armor-pickup", 24, 24);
    graphics.clear();

    graphics.fillStyle(0x4fd1c5, 1);
    graphics.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    graphics.generateTexture("pixel", GAME_WIDTH, GAME_HEIGHT);
    graphics.destroy();

    this.scene.start("menu");
  }
}
