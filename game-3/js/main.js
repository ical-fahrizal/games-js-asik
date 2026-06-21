const statusText = document.getElementById("status");
const boardDiv = document.getElementById("board");

window.addEventListener("resize", redrawBoard);

createBoard();
updateStatus("Giliran Autobot");
