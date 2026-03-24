const HIGH_SCORE_KEY = "arena-survival-highscore";

export function getHighScore(): number {
  if (typeof window === "undefined") {
    return 0;
  }

  const stored = window.localStorage.getItem(HIGH_SCORE_KEY);
  const value = Number(stored);
  return Number.isFinite(value) ? Math.max(0, Math.floor(value)) : 0;
}

export function saveHighScore(score: number): number {
  const nextHighScore = Math.max(getHighScore(), Math.floor(score));

  if (typeof window !== "undefined") {
    window.localStorage.setItem(HIGH_SCORE_KEY, String(nextHighScore));
  }

  return nextHighScore;
}
