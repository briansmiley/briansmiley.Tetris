export const HIGHSCORES_LOCALSTORAGE_KEY = 'tetris-highscores';
import { z } from 'zod';

//values to fill in when old highscores are missing details added to the schema
export const defaultValues = {
  score: 0,
  initials: '---',
  gameStartTime: 0,
  linesCleared: 0,
  gameMode: 'BASIC' as const,
};

export const HighScoreSchema = z.object({
  score: z.number().int().nonnegative(),
  gameStartTime: z.number().int(),
  initials: z.string().min(1).max(3),
  linesCleared: z.number().int().nonnegative(),
  gameMode: z.enum(['BASIC', 'ADVANCED']).default('BASIC'),
});

export type HighScore = z.infer<typeof HighScoreSchema>;
export const PlatformSchema = z.enum(['MOBILE', 'DESKTOP']);
export type Platform = z.infer<typeof PlatformSchema>;
export const GameModeSchema = z.enum(['BASIC', 'ADVANCED']);
export type GameMode = z.infer<typeof GameModeSchema>;

export const createHighScore = (
  partialHighScore: Partial<HighScore>
): HighScore => {
  return HighScoreSchema.parse({
    ...defaultValues,
    ...partialHighScore,
  });
};

export const defaultHighscores: HighScore[] = [
  { score: 3750, initials: '---', gameStartTime: 0, linesCleared: 50, gameMode: 'BASIC' },
  { score: 3375, initials: '---', gameStartTime: 0, linesCleared: 45, gameMode: 'BASIC' },
  { score: 3000, initials: '---', gameStartTime: 0, linesCleared: 40, gameMode: 'BASIC' },
  { score: 2625, initials: '---', gameStartTime: 0, linesCleared: 35, gameMode: 'BASIC' },
  { score: 2250, initials: '---', gameStartTime: 0, linesCleared: 30, gameMode: 'BASIC' },
  { score: 1875, initials: '---', gameStartTime: 0, linesCleared: 25, gameMode: 'BASIC' },
  { score: 1500, initials: '---', gameStartTime: 0, linesCleared: 20, gameMode: 'BASIC' },
  { score: 1125, initials: '---', gameStartTime: 0, linesCleared: 15, gameMode: 'BASIC' },
  { score: 750, initials: '---', gameStartTime: 0, linesCleared: 10, gameMode: 'BASIC' },
  { score: 300, initials: '---', gameStartTime: 0, linesCleared: 4, gameMode: 'BASIC' },
];

export const sortHighScores = (highscores: HighScore[]) => {
  const ret = [...highscores];
  ret.sort((a, b) =>
    a.score === b.score ? a.gameStartTime - b.gameStartTime : b.score - a.score
  );
  return ret;
};
