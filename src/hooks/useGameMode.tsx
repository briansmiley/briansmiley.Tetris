import { GameMode } from '../TetrisConfig';
import useLocalStorage from './useLocalStorage';

export default function useGameMode() {
  return useLocalStorage<GameMode>('tetris-game-mode', 'BASIC');
}