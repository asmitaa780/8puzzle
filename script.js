let board = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 0, 8]
];

let moves = 0;

const grid = document.getElementById("grid");
const movesDisplay = document.getElementById("moves");

function render() {
  grid.innerHTML = "";

  board.forEach((row, i) => {
    row.forEach((value, j) => {
      const tile = document.createElement("div");
      tile.classList.add("tile");

      if (value === 0) {
        tile.classList.add("empty");
      } else {
        tile.textContent = value;
        tile.addEventListener("click", () => move(i, j));
      }

      grid.appendChild(tile);
    });
  });
}

function move(i, j) {
  const directions = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0]
  ];

  for (let [dx, dy] of directions) {
    let ni = i + dx;
    let nj = j + dy;

    if (ni >= 0 && ni < 3 && nj >= 0 && nj < 3) {
      if (board[ni][nj] === 0) {

        // swap
        board[ni][nj] = board[i][j];
        board[i][j] = 0;

        moves++;
        movesDisplay.textContent = "Moves: " + moves;

        render();

        if (isSolved()) {
          showPopup();
        }

        return;
      }
    }
  }
}

function isSolved() {
  let correct = 1;

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (i === 2 && j === 2) return true;
      if (board[i][j] !== correct++) return false;
    }
  }
}

function showPopup() {
  document.getElementById("popup").classList.remove("hidden");
  document.getElementById("finalMoves").textContent =
    "You solved it in " + moves + " moves!";
}

function restart() {
  moves = 0;
  movesDisplay.textContent = "Moves: 0";

  board = [
    [1,2,3],
    [4,5,6],
    [7,0,8]
  ];

  shuffle();

  document.getElementById("popup").classList.add("hidden");

  render();
}

function shuffle() {
  for (let k = 0; k < 100; k++) {
    let i = Math.floor(Math.random() * 3);
    let j = Math.floor(Math.random() * 3);
    move(i, j);
  }
}

// Initial setup
shuffle();
moves = 0;
movesDisplay.textContent = "Moves: 0";
render();