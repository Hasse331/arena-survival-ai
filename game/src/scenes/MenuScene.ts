import Phaser from "phaser";
import { GAME_HEIGHT, GAME_WIDTH } from "../game/constants";
import { getHighScore } from "../game/highscore";

export class MenuScene extends Phaser.Scene {
  constructor() {
    super("menu");
  }

  create(): void {
    this.cameras.main.setBackgroundColor("#081018");
    const highScore = getHighScore();

    const background = this.add.graphics();
    background.fillGradientStyle(0x081018, 0x081018, 0x102336, 0x102336, 1);
    background.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    background.fillStyle(0xf2a54c, 0.08);
    background.fillCircle(160, 120, 160);
    background.fillStyle(0x4fd1c5, 0.08);
    background.fillCircle(810, 390, 180);

    this.add.text(GAME_WIDTH / 2, 120, "Arena Survival", {
      fontFamily: "Georgia",
      fontSize: "48px",
      color: "#f5efe0"
    }).setOrigin(0.5);

    this.add.text(
      GAME_WIDTH / 2,
      175,
      "Survive as long as you can against endless waves.\nMove, dodge, and keep your health alive.",
      {
        align: "center",
        fontFamily: "Trebuchet MS",
        fontSize: "20px",
        color: "#bfd5df",
        lineSpacing: 10
      }
    ).setOrigin(0.5);

    this.add.text(GAME_WIDTH / 2, 225, `High Score: ${highScore}`, {
      fontFamily: "Trebuchet MS",
      fontSize: "24px",
      color: "#b9ffb9"
    }).setOrigin(0.5);

    this.createButton(GAME_WIDTH / 2, 285, "Play as Human", true, () => {
      this.scene.start("game");
    });

    this.createButton(GAME_WIDTH / 2, 375, "Play with Bot", false);

    this.add.text(GAME_WIDTH / 2, 475, "Controls: WASD or arrow keys", {
      fontFamily: "Trebuchet MS",
      fontSize: "18px",
      color: "#93a9b4"
    }).setOrigin(0.5);
  }

  private createButton(
    x: number,
    y: number,
    label: string,
    enabled: boolean,
    onClick?: () => void
  ): void {
    const width = 280;
    const height = 62;
    const container = this.add.container(x, y);

    const shadow = this.add.rectangle(0, 8, width, height, 0x000000, 0.22)
      .setOrigin(0.5);
    const button = this.add.rectangle(
      0,
      0,
      width,
      height,
      enabled ? 0xf2a54c : 0x48545f,
      enabled ? 1 : 0.55
    ).setOrigin(0.5);
    button.setStrokeStyle(2, enabled ? 0xffdfb0 : 0x7d8790, 0.8);

    const text = this.add.text(0, 0, label, {
      fontFamily: "Trebuchet MS",
      fontSize: "24px",
      color: enabled ? "#081018" : "#d9e0e4"
    }).setOrigin(0.5);

    container.add([shadow, button, text]);

    if (!enabled) {
      this.add.text(x, y + 52, "Coming later", {
        fontFamily: "Trebuchet MS",
        fontSize: "14px",
        color: "#7f95a0"
      }).setOrigin(0.5);
      return;
    }

    button.setInteractive({ useHandCursor: true });
    button.on("pointerover", () => {
      button.setScale(1.03);
      text.setScale(1.03);
    });
    button.on("pointerout", () => {
      button.setScale(1);
      text.setScale(1);
    });
    button.on("pointerdown", () => {
      button.setFillStyle(0xffbe68, 1);
    });
    button.on("pointerup", () => {
      button.setFillStyle(0xf2a54c, 1);
      onClick?.();
    });
  }
}
