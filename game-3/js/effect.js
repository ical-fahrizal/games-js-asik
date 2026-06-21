function fadeSprite(sprite) {
  return sprite.map((row) =>
    row.map((color) => {
      if (color > 0) return color - 1;

      return 0;
    }),
  );
}

async function animateRemove(index, symbol) {
  let cell = cells[index];

  let sprite = clone(symbol === "X" ? autobot : decepticon);

  for (let i = 0; i < 5; i++) {
    renderCell(cell, sprite);

    sprite = fadeSprite(sprite);

    await sleep(100);
  }

  cell.innerHTML = "";
}

// function animateRemove(cell, symbol) {
//   cell.innerHTML = "";
// }
