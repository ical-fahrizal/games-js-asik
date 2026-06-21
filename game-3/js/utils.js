function stringToSprite(lines) {
  return lines.map((line) => line.split("").map(Number));
}

function random(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function clone(obj) {
  return structuredClone(obj);
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function gameOver() {
  disableBoard();

  await sleep(1500);

  resetGame();
}
