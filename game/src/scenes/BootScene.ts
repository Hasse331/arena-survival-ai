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

    graphics.fillStyle(0x4fd1c5, 1);
    graphics.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    graphics.generateTexture("pixel", GAME_WIDTH, GAME_HEIGHT);
    graphics.destroy();

    this.scene.start("menu");
  }
}
