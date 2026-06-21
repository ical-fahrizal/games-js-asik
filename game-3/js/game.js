function createBoard() {
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");

    cell.className = "cell";

    cell.onclick = () => playerMove(i);

    boardDiv.appendChild(cell);

    cells.push(cell);
  }
}

async function playerMove(index) {
  if (gameLocked) return;
  if (board[index] !== "") return;

  await placeMove(index, "X", playerMoves);

  if (checkWinner("X")) {
    updateStatus("🏆 Autobot Menang!");
    playerWin();
    gameOver();
    return;
  }

  await sleep(300);
  await cpuMove();
}

async function cpuMove() {
  switch (RANKS[rank].ai) {
    case 1:
      await easyMove();
      break;

    case 2:
      await normalMove();
      break;

    case 3:
      await hardMove();
      break;

    case 4:
      await expertMove();
      break;

    case 5:
      await impossibleMove();
      break;
  }
}

async function placeMove(index, symbol, arr) {
  if (arr.length >= 3) {
    let oldest = arr.shift();

    let oldSymbol = board[oldest];

    board[oldest] = "";

    await animateRemove(oldest, oldSymbol);
  }

  board[index] = symbol;

  renderCell(cells[index], symbol === "X" ? autobot : decepticon);

  arr.push(index);
}

function checkWinner(symbol) {
  return wins.some((comb) => comb.every((i) => board[i] === symbol));
}

function resetGame() {
  board.fill("");

  playerMoves.length = 0;

  cpuMoves.length = 0;

  cells.forEach((cell, index) => {
    cell.innerHTML = "";

    cell.onclick = () => playerMove(index);
  });

  updateStatus("Giliran Autobot");
  gameLocked = false;
}

function disableBoard() {
  cells.forEach((cell) => {
    cell.onclick = null;
  });
}
