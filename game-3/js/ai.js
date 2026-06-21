async function easyMove() {
  let kosong = [];

  for (let i = 0; i < 9; i++) {
    if (board[i] === "") kosong.push(i);
  }

  if (kosong.length === 0) return;

  let index = random(kosong);

  await cpuPlace(index);
}

function normalMove() {
  // Menang
  let move = findWinningMoveFIFO("O", cpuMoves);

  if (move !== -1) {
    cpuPlace(move);
    return;
  }

  // Blok pemain
  move = findWinningMoveFIFO("X", playerMoves);

  if (move !== -1) {
    cpuPlace(move);
    return;
  }

  easyMove();
}

function hardMove() {
  let move = findWinningMoveFIFO("O", cpuMoves);

  if (move !== -1) {
    cpuPlace(move);
    return;
  }

  move = findWinningMoveFIFO("X", playerMoves);

  if (move !== -1) {
    cpuPlace(move);
    return;
  }

  // tengah
  if (board[4] === "") {
    cpuPlace(4);
    return;
  }

  // sudut
  let corners = [0, 2, 6, 8].filter((i) => board[i] === "");

  if (corners.length > 0) {
    cpuPlace(random(corners));

    return;
  }

  easyMove();
}

function expertMove() {
  let move = minimaxFifo(3);

  if (move != -1) {
    cpuPlace(move);
    return;
  }

  hardMove();
}

function impossibleMove() {
  let move = minimaxFifo(6);

  if (move != -1) {
    cpuPlace(move);
    return;
  }

  hardMove();
}

function findWinningMoveFIFO(symbol, moveArray) {
  for (let i = 0; i < 9; i++) {
    if (board[i] !== "") continue;

    let tempBoard = clone(board);
    let tempMoves = clone(moveArray);

    // simulasi FIFO
    if (tempMoves.length >= 3) {
      let oldest = tempMoves.shift();

      tempBoard[oldest] = "";
    }

    tempBoard[i] = symbol;

    tempMoves.push(i);

    if (checkWinnerBoard(tempBoard, symbol)) {
      return i;
    }
  }

  return -1;
}

async function cpuPlace(index) {
  await placeMove(index, "O", cpuMoves);

  if (checkWinner("O")) {
    updateStatus("💀 Decepticon Menang!");
    cpuWin();
    gameOver();
  }
}
