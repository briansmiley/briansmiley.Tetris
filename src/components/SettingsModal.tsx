import { defaultHighscores } from '../lib/highscores';
import useLocalStorage from '../hooks/useLocalStorage';
import HighScoreList from './HighScores/HighScoreList';
import { useState } from 'react';
import ControlsInfo from './ControlsInfo';
import { Game } from '../Tetris';
import ScoringInfo from './ScoringInfo';
import { GAME_MODES, GAME_MODE_CONFIG, GameMode } from '../TetrisConfig';

type SubDisplay = 'highscores' | 'controls' | 'scoring' | 'none';
type SettingsModalProps = {
  resetGame: () => void;
  gameState: Game;
  gameMode: GameMode;
  setGameMode: (gameMode: GameMode) => void;
};
export default function SettingsModal({
  resetGame,
  gameState,
  gameMode,
  setGameMode,
}: SettingsModalProps) {
  const [_, setHighscores] = useLocalStorage(
    'tetris-highscores',
    defaultHighscores
  );
  const [subDisplay, setSubDisplay] = useState<SubDisplay>('none');
  const [showGameModeDropdown, setShowGameModeDropdown] = useState(false);
  const resetHighScores = () => {
    setHighscores(defaultHighscores);
    setSubDisplay('none');
  };
  const toggleSubDisplay = (newSubDisplay: SubDisplay) => () => {
    if (newSubDisplay === subDisplay) {
      setSubDisplay('none');
    } else {
      setSubDisplay(newSubDisplay);
    }
  };
  const currentlyPlaying = gameState.blocksSpawned > 0;
  return (
    <div className="flex w-full flex-col items-center gap-5 p-2">
      <div
        className="text-default border-outset relative flex w-[70%] flex-col items-center justify-center gap-3 bg-slate-900 p-3"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className={` ${subDisplay === 'none' ? 'text-2xl' : 'text-lg'} font-bold underline`}
        >
          Settings
        </div>
        <div
          className={`flex flex-col gap-3 ${subDisplay === 'none' ? 'text-lg' : 'text-md'} `}
        >
          <div className={`${currentlyPlaying ? "text-gray-400 opacity-50" : ""} flex items-center justify-between`}>
            <span>Game Mode:</span>
            <div className="relative">
              <button
                onClick={() => !currentlyPlaying && setShowGameModeDropdown(!showGameModeDropdown)}
                className={`px-2 py-1 rounded ${
                  currentlyPlaying 
                    ? "text-gray-400 cursor-not-allowed" 
                    : "hover:bg-slate-600"
                }`}
                title={
                  gameState.blocksSpawned > 0 
                    ? "Cannot change game mode mid-game" 
                    : GAME_MODE_CONFIG[gameMode].description
                }
              >
                {gameMode}
              </button>
              {showGameModeDropdown && gameState.blocksSpawned === 0 && (
                <div className="absolute left-0 top-full mt-1 bg-slate-800 border border-slate-600 rounded shadow-lg z-50 min-w-max">
                  {GAME_MODES.filter(mode => mode !== gameMode).map(mode => (
                    <button
                      key={mode}
                      onClick={() => {
                        setGameMode(mode);
                        setShowGameModeDropdown(false);
                      }}
                      className="block w-full text-left px-3 py-2 hover:bg-slate-700 whitespace-nowrap"
                      title={GAME_MODE_CONFIG[mode].description}
                    >
                      {mode}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          <button onClick={toggleSubDisplay('controls')}>
            {' '}
            {subDisplay === 'controls' ? 'Hide' : 'Show'} Controls
          </button>
          <button onClick={toggleSubDisplay('scoring')}>
            {subDisplay === 'scoring' ? 'Hide' : 'Show'} Scoring
          </button>
          {gameState.blocksSpawned > 0 && (
            <button
              onClick={() => {
                resetGame();
              }}
            >
              Reset Game
            </button>
          )}
          <button onClick={toggleSubDisplay('highscores')}>
            {subDisplay === 'highscores' ? 'Hide' : 'Show'} High Scores
          </button>
          <button onClick={resetHighScores}>Reset High Scores</button>
        </div>
      </div>
      {subDisplay === 'controls' && (
        <div className={`flex w-full origin-top items-center justify-center`}>
          <ControlsInfo />
        </div>
      )}
      {subDisplay === 'highscores' && (
        <div className={`flex w-[90%] origin-top flex-col items-center`}>
          <HighScoreList scoreCount={5} highlightScore={gameState.startTime} gameMode={gameMode} />
        </div>
      )}
      {subDisplay === 'scoring' && (
        <div
          className={`flex w-[90%] origin-top flex-col items-center ${subDisplay === 'scoring' ? '' : 'hidden'}`}
        >
          <ScoringInfo />
        </div>
      )}
    </div>
  );
}
