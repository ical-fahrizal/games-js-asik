function checkWinnerBoard(tempBoard, symbol) {
  return wins.some((comb) => comb.every((i) => tempBoard[i] === symbol));
}

function minimaxFifo(depth = 6) {
  let bestScore = -Infinity;
  let bestMove = -1;

  for (let i = 0; i < 9; i++) {
    if (board[i] !== "") continue;

    let tempBoard = clone(board);
    let tempCpuMoves = clone(cpuMoves);
    let tempPlayerMoves = clone(playerMoves);

    // FIFO CPU
    if (tempCpuMoves.length >= 3) {
      let oldest = tempCpuMoves.shift();
      tempBoard[oldest] = "";
    }

    tempBoard[i] = "O";
    tempCpuMoves.push(i);

    let score = minimax(
      tempBoard,
      tempCpuMoves,
      tempPlayerMoves,
      depth - 1,
      false,
    );

    if (score > bestScore) {
      bestScore = score;
      bestMove = i;
    }
  }

  return bestMove;
}

function minimax(boardState, cpuState, playerState, depth, maximizing) {
  if (checkWinnerBoard(boardState, "O")) return 100 + depth;
  if (checkWinnerBoard(boardState, "X")) return -100 - depth;
  if (depth <= 0) return evaluateBoard(boardState);

  if (maximizing) {
    let bestScore = -Infinity;

    for (let i = 0; i < 9; i++) {
      if (boardState[i] !== "") continue;

      let tempBoard = [...boardState];
      let tempCpu = [...cpuState];
      let tempPlayer = [...playerState];

      // FIFO CPU
      if (tempCpu.length >= 3) {
        let oldest = tempCpu.shift();
        tempBoard[oldest] = "";
      }

      tempBoard[i] = "O";
      tempCpu.push(i);

      let score = minimax(tempBoard, tempCpu, tempPlayer, depth - 1, false);

      bestScore = Math.max(bestScore, score);
    }

    return bestScore;
  }

  // PLAYER
  let bestScore = Infinity;

  for (let i = 0; i < 9; i++) {
    if (boardState[i] !== "") continue;

    let tempBoard = [...boardState];
    let tempCpu = [...cpuState];
    let tempPlayer = [...playerState];

    // FIFO PLAYER
    if (tempPlayer.length >= 3) {
      let oldest = tempPlayer.shift();
      tempBoard[oldest] = "";
    }

    tempBoard[i] = "X";
    tempPlayer.push(i);

    let score = minimax(tempBoard, tempCpu, tempPlayer, depth - 1, true);

    bestScore = Math.min(bestScore, score);
  }

  return bestScore;
}

function evaluateBoard(boardState) {
  let score = 0;

  for (let line of wins) {
    let cpuCount = 0;
    let playerCount = 0;

    for (let pos of line) {
      if (boardState[pos] === "O") cpuCount++;
      if (boardState[pos] === "X") playerCount++;
    }

    if (cpuCount === 2 && playerCount === 0) score += 10;

    if (cpuCount === 1 && playerCount === 0) score += 2;

    if (playerCount === 2 && cpuCount === 0) score -= 10;

    if (playerCount === 1 && cpuCount === 0) score -= 2;
  }

  return score;
}
