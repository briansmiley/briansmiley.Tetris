import controller from '../server/controller';
import { PostHighScoreReqBody, PostHighScoreRes } from '../server/interface';

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });

export async function POST(request: Request) {
  const body: PostHighScoreReqBody = await request.json();
  console.log(`Posting high score ${JSON.stringify(body.highScore)}`);
  const { highScore, platform } = body;
  try {
    const result: PostHighScoreRes = await controller.postHighScore(
      highScore,
      platform
    );
    console.log(`High score db post response: ${JSON.stringify(result)}`);
    return json(result);
  } catch (error) {
    console.error(error);
    return json(
      {
        error: 'Internal Server Error',
        details: error instanceof Error ? error.message : String(error),
      },
      500
    );
  }
}
