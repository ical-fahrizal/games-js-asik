const board = Array(9).fill("");
const cells = [];
const playerMoves = [];
const cpuMoves = [];
let gameLocked = false;
let rank = 0;
let removeIntervals = Array(9).fill(null);
const wins = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const colors = [
  "#fff", //0 putih
  "#ddd", //1 abu muda
  "#999", //2 abu
  "#555", //3 abu tua
  "#000", //4 hitam
];
