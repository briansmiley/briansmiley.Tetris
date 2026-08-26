import { z } from 'zod';
import controller from '../../server/controller';
import { PlatformSchema } from '../../src/lib/highscores';

const requestablePlatformSchema = z.union([PlatformSchema, z.literal('ALL')]);

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });

export async function GET(request: Request) {
  // Route is /api/getHighScores/[platform]; the param is the last path segment.
  const segment = new URL(request.url).pathname.split('/').filter(Boolean).pop();
  const { success, data: platform } = requestablePlatformSchema.safeParse(segment);
  if (!success) {
    return json({ error: 'Bad request; platform specified incorrectly' }, 400);
  }
  try {
    const highScores =
      platform === 'ALL'
        ? await controller.getHighScores()
        : await controller.getHighScoresByPlatform(platform);
    return json(highScores);
  } catch (error) {
    console.error(error);
    return json({ error: 'Internal Server Error' }, 500);
  }
}
