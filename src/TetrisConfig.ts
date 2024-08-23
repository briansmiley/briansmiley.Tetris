export type Config = {
  BLOCK_SHAPES: Record<TetrisShape, Coordinate[]>;
  SPAWN_POINT: Coordinate;
  SHAPE_COLORS: Record<TetrisShape, Color>;
  WALL_COLOR: Color;
  BOARD_WIDTH: number;
  BOARD_HEIGHT: number;
  CLOCK_TICK_RATE: number;
  STARTING_G_TICK_INTERVAL: number;
  MIN_G_TICK_INTERVAL: number;
  SPEED_SCALING: number;
  GRAVITY_LEVELS: Record<number, number>;
  LEVEL_LINES: number;
  POLL_RATES: Record<InputCategory | 'base', number>;
  SHIFT_DEBOUNCE: number;
  WALLS: boolean;
  BASE_SETTLE_TIME: number; //how long an unmoved block takes to settle
  MIN_SETTLE_TIME: number; //the shortest the settle time can get as levels progress
  BASE_MAX_GROUND_TIME: number; //how long a block can sit on the ground before it settles even if moved/rotated
  MIN_MAX_GROUND_TIME: number; //the shortest the max ground time can get as levels progress
};
export type Color = [number, number, number];

export type Coordinate = [number, number];
export type InputCategory = 'rotate' | 'shift' | 'drop' | 'hold';
export const SHAPE_NAMES = ['I', 'T', 'O', 'S', 'Z', 'L', 'J'] as const;
export type TetrisShape = (typeof SHAPE_NAMES)[number];
export const CONFIG: Config = {
  BLOCK_SHAPES: {
    I: [
      [0, -2],
      [0, -1],
      [0, 0],
      [0, 1],
    ],
    T: [
      [0, 0],
      [0, 1],
      [0, -1],
      [-1, 0],
    ],
    O: [
      [0, 0],
      [-1, 0],
      [0, -1],
      [-1, -1],
    ],
    S: [
      [0, 0],
      [-1, 0],
      [0, -1],
      [-1, 1],
    ],
    Z: [
      [0, 0],
      [-1, 0],
      [-1, -1],
      [0, 1],
    ],
    L: [
      [0, 0],
      [0, -1],
      [0, 1],
      [-1, 1],
    ],
    J: [
      [0, 0],
      [0, 1],
      [0, -1],
      [-1, -1],
    ],
  },
  SPAWN_POINT: [0, 5] as Coordinate,
  SHAPE_COLORS: {
    I: [0, 255, 255],
    T: [128, 0, 128],
    O: [255, 255, 0],
    S: [255, 0, 0],
    Z: [0, 255, 0],
    L: [255, 127, 0],
    J: [0, 0, 255],
  },
  WALL_COLOR: [113, 113, 113],
  BOARD_WIDTH: 10,
  BOARD_HEIGHT: 20,
  CLOCK_TICK_RATE: 10,
  STARTING_G_TICK_INTERVAL: 900,
  MIN_G_TICK_INTERVAL: 10, //minimum tick interval
  GRAVITY_LEVELS: {
    0: 1000,
    1: 900,
    2: 810,
    3: 730,
    4: 660,
    5: 600,
    6: 550,
    7: 510,
    8: 480,
    9: 450,
    10: 420,
    11: 390,
    12: 340,
    13: 290,
    14: 255,
    15: 225,
    16: 197,
    17: 171,
    18: 155,
    19: 140,
    20: 128,
    21: 110,
    22: 95,
    23: 83,
    24: 70,
    25: 55,
    26: 33,
    27: 25,
    28: 18,
    29: 13,
    30: 8,
    31: 5,
  },
  SPEED_SCALING: 50, //how many milliseconds to take off the tick time for each level

  LEVEL_LINES: 10, //how many lines between speed scaling
  POLL_RATES: {
    base: 10,
    drop: 250,
    rotate: 150,
    shift: 70,
    hold: 1000000, //hold allowance is handled by the hold/spawn block functions
  },
  SHIFT_DEBOUNCE: 120,
  WALLS: false,
  BASE_SETTLE_TIME: 700,
  MIN_SETTLE_TIME: 350,
  BASE_MAX_GROUND_TIME: 1500,
  MIN_MAX_GROUND_TIME: 700,
};
