import Phaser from "phaser";
import { GAME_HEIGHT, GAME_WIDTH } from "../game/constants";
import type { GameOverData } from "../game/types";

export class GameOverScene extends Phaser.Scene {
  constructor() {
    super("game-over");
  }

  create(data: GameOverData): void {
    this.cameras.main.setBackgroundColor("#081018");

    const bg = this.add.graphics();
    bg.fillStyle(0x081018, 1);
    bg.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    bg.fillStyle(0xef4444, 0.08);
    bg.fillCircle(GAME_WIDTH / 2, GAME_HEIGHT / 2, 190);

    this.add.text(GAME_WIDTH / 2, 150, "Game Over", {
      fontFamily: "Georgia",
      fontSize: "52px",
      color: "#f7e6e6"
    }).setOrigin(0.5);

    this.add.text(
      GAME_WIDTH / 2,
      240,
      `Score: ${data.score}\nHigh Score: ${data.highScore}\nSurvival Time: ${data.survivalTime.toFixed(1)}s`,
      {
        align: "center",
        fontFamily: "Trebuchet MS",
        fontSize: "28px",
        color: "#d8e0e5",
        lineSpacing: 14
      }
    ).setOrigin(0.5);

    const retryButton = this.add.rectangle(GAME_WIDTH / 2, 355, 250, 58, 0xf2a54c, 1)
      .setOrigin(0.5)
      .setStrokeStyle(2, 0xffdfb0, 0.8)
      .setInteractive({ useHandCursor: true });

    const retryText = this.add.text(GAME_WIDTH / 2, 355, "Play Again", {
      fontFamily: "Trebuchet MS",
      fontSize: "24px",
      color: "#081018"
    }).setOrigin(0.5);

    retryButton.on("pointerover", () => {
      retryButton.setScale(1.03);
      retryText.setScale(1.03);
    });
    retryButton.on("pointerout", () => {
      retryButton.setScale(1);
      retryText.setScale(1);
    });
    retryButton.on("pointerup", () => {
      this.scene.start("game");
    });

    this.add.text(GAME_WIDTH / 2, 430, "Press SPACE to retry or ESC for menu", {
      fontFamily: "Trebuchet MS",
      fontSize: "18px",
      color: "#9ab0ba"
    }).setOrigin(0.5);

    this.input.keyboard?.once("keydown-SPACE", () => {
      this.scene.start("game");
    });
    this.input.keyboard?.once("keydown-ESC", () => {
      this.scene.start("menu");
    });
  }
}
