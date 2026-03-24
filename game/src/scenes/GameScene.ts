import Phaser from "phaser";
import {
  ENEMY_BASE_DAMAGE,
  ENEMY_BASE_SPEED,
  ENEMY_SPEED_VARIANCE,
  GAME_HEIGHT,
  GAME_WIDTH,
  MIN_SPAWN_INTERVAL_MS,
  PLAYER_DAMAGE_COOLDOWN_MS,
  PLAYER_MAX_HEALTH,
  PLAYER_SPEED,
  SPAWN_ACCELERATION_MS,
  SPAWN_INTERVAL_MS
} from "../game/constants";

type EnemySprite = Phaser.Physics.Arcade.Image & {
  speed: number;
  damage: number;
};

export class GameScene extends Phaser.Scene {
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private wasd!: Record<"up" | "down" | "left" | "right", Phaser.Input.Keyboard.Key>;
  private player!: Phaser.Physics.Arcade.Image;
  private enemies!: Phaser.Physics.Arcade.Group;
  private health = PLAYER_MAX_HEALTH;
  private score = 0;
  private lastDamageTime = 0;
  private elapsedSeconds = 0;
  private spawnInterval = SPAWN_INTERVAL_MS;
  private spawnElapsed = 0;
  private scoreText!: Phaser.GameObjects.Text;
  private healthText!: Phaser.GameObjects.Text;
  private timeText!: Phaser.GameObjects.Text;

  constructor() {
    super("game");
  }

  create(): void {
    this.cameras.main.setBackgroundColor("#081018");
    this.drawArena();
    this.health = PLAYER_MAX_HEALTH;
    this.score = 0;
    this.lastDamageTime = 0;
    this.elapsedSeconds = 0;
    this.spawnInterval = SPAWN_INTERVAL_MS;
    this.spawnElapsed = 0;

    this.player = this.physics.add.image(GAME_WIDTH / 2, GAME_HEIGHT / 2, "player");
    this.player.setCollideWorldBounds(true);

    this.enemies = this.physics.add.group();
    this.physics.world.setBounds(24, 24, GAME_WIDTH - 48, GAME_HEIGHT - 48);

    this.cursors = this.input.keyboard!.createCursorKeys();
    this.wasd = this.input.keyboard!.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D
    }) as Record<"up" | "down" | "left" | "right", Phaser.Input.Keyboard.Key>;

    this.physics.add.overlap(
      this.player,
      this.enemies,
      (_player, enemy) => this.handleEnemyHit(enemy as EnemySprite)
    );

    this.scoreText = this.add.text(26, 18, "", {
      fontFamily: "Trebuchet MS",
      fontSize: "24px",
      color: "#f5efe0"
    });

    this.healthText = this.add.text(26, 48, "", {
      fontFamily: "Trebuchet MS",
      fontSize: "20px",
      color: "#ffb6b6"
    });

    this.timeText = this.add.text(GAME_WIDTH - 26, 18, "", {
      fontFamily: "Trebuchet MS",
      fontSize: "20px",
      color: "#b8dce5"
    }).setOrigin(1, 0);

    this.updateHud();

    this.input.keyboard?.on("keydown-ESC", () => {
      this.scene.start("menu");
    });
  }

  update(_time: number, delta: number): void {
    const movement = new Phaser.Math.Vector2(0, 0);

    if (this.cursors.left.isDown || this.wasd.left.isDown) {
      movement.x -= 1;
    }
    if (this.cursors.right.isDown || this.wasd.right.isDown) {
      movement.x += 1;
    }
    if (this.cursors.up.isDown || this.wasd.up.isDown) {
      movement.y -= 1;
    }
    if (this.cursors.down.isDown || this.wasd.down.isDown) {
      movement.y += 1;
    }

    movement.normalize();
    this.player.setVelocity(movement.x * PLAYER_SPEED, movement.y * PLAYER_SPEED);

    this.spawnElapsed += delta;
    if (this.spawnElapsed >= this.spawnInterval) {
      this.spawnElapsed = 0;
      this.spawnEnemy();
      this.spawnInterval = Math.max(
        MIN_SPAWN_INTERVAL_MS,
        this.spawnInterval - SPAWN_ACCELERATION_MS
      );
    }

    this.enemies.children.each((enemyGameObject) => {
      const enemy = enemyGameObject as EnemySprite;
      const direction = new Phaser.Math.Vector2(
        this.player.x - enemy.x,
        this.player.y - enemy.y
      ).normalize();
      enemy.setVelocity(direction.x * enemy.speed, direction.y * enemy.speed);
      return true;
    });

    this.elapsedSeconds += delta / 1000;
    this.score += delta / 100;
    this.updateHud();
  }

  private drawArena(): void {
    const graphics = this.add.graphics();
    graphics.fillGradientStyle(0x09121b, 0x09121b, 0x122636, 0x0d1e2d, 1);
    graphics.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

    graphics.lineStyle(2, 0x2f4554, 0.8);
    graphics.strokeRect(24, 24, GAME_WIDTH - 48, GAME_HEIGHT - 48);

    graphics.lineStyle(1, 0x173144, 0.35);
    for (let x = 56; x < GAME_WIDTH - 24; x += 40) {
      graphics.lineBetween(x, 24, x, GAME_HEIGHT - 24);
    }
    for (let y = 56; y < GAME_HEIGHT - 24; y += 40) {
      graphics.lineBetween(24, y, GAME_WIDTH - 24, y);
    }
  }

  private spawnEnemy(): void {
    const edge = Phaser.Math.Between(0, 3);
    let x = 0;
    let y = 0;

    if (edge === 0) {
      x = Phaser.Math.Between(40, GAME_WIDTH - 40);
      y = 34;
    } else if (edge === 1) {
      x = GAME_WIDTH - 34;
      y = Phaser.Math.Between(40, GAME_HEIGHT - 40);
    } else if (edge === 2) {
      x = Phaser.Math.Between(40, GAME_WIDTH - 40);
      y = GAME_HEIGHT - 34;
    } else {
      x = 34;
      y = Phaser.Math.Between(40, GAME_HEIGHT - 40);
    }

    const enemy = this.enemies.create(x, y, "enemy") as EnemySprite;
    enemy.speed = ENEMY_BASE_SPEED + Phaser.Math.Between(0, ENEMY_SPEED_VARIANCE);
    enemy.damage = ENEMY_BASE_DAMAGE;
    enemy.setCollideWorldBounds(true);
  }

  private handleEnemyHit(enemy: EnemySprite): void {
    const now = this.time.now;
    if (now - this.lastDamageTime < PLAYER_DAMAGE_COOLDOWN_MS) {
      return;
    }

    this.lastDamageTime = now;
    this.health = Math.max(0, this.health - enemy.damage);

    this.tweens.add({
      targets: this.player,
      alpha: 0.35,
      duration: 80,
      yoyo: true,
      repeat: 2
    });

    enemy.destroy();
    this.updateHud();

    if (this.health <= 0) {
      this.endGame();
    }
  }

  private updateHud(): void {
    this.scoreText.setText(`Score: ${Math.floor(this.score)}`);
    this.healthText.setText(`Health: ${this.health}`);
    this.timeText.setText(`Time: ${this.elapsedSeconds.toFixed(1)}s`);
  }

  private endGame(): void {
    this.physics.pause();
    this.scene.start("game-over", {
      score: Math.floor(this.score),
      survivalTime: this.elapsedSeconds
    });
  }
}
