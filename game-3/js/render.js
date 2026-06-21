function renderCell(cell, sprite) {
  cell.innerHTML = "";

  let size = cell.clientWidth * 0.8;

  let canvas = document.createElement("canvas");

  canvas.width = size;
  canvas.height = size;

  cell.appendChild(canvas);

  let ctx = canvas.getContext("2d");

  ctx.imageSmoothingEnabled = false;

  drawSprite(ctx, sprite, size);
}

function drawSprite(ctx, sprite, size) {
  let rows = sprite.length;
  let cols = sprite[0].length;

  let pixel = Math.min(size / cols, size / rows);

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      ctx.fillStyle = colors[sprite[row][col]];

      ctx.fillRect(col * pixel, row * pixel, pixel, pixel);
    }
  }
}

function redrawBoard() {
  for (let i = 0; i < 9; i++) {
    if (board[i] === "X") {
      renderCell(cells[i], autobot);
    } else if (board[i] === "O") {
      renderCell(cells[i], decepticon);
    }
  }
}

function updateStatus(message = "") {
  statusText.innerHTML = RANKS[rank].name + "<br>" + message;
}
