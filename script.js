const GameBoard = (p1, p2) => {
  let turns = 0;
  let currentPlayer;

  let grid = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];

  const Square = (row, col) => {
    this.row = row;
    this.col = col;
    let element = document.createElement("div");
    let filled = false;

    return { row, col, element, filled };
  };

  const setUp = () => {
    currentPlayer = p1;
    const board = document.querySelector(".game-grid");
    board.innerHTML = "";
    let col = 0;
    let row = 0;
    grid = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ];
    for (i = 0; i < 9; i++) {
      const square = Square(row, col);
      square.element.classList.add("grid-square");
      square.element.addEventListener("click", () => fillSquare(square));
      board.appendChild(square.element);
      col++;
      if (i === 2 || i === 5) {
        row++;
        col = 0;
      }
    }
  };

  const resetGame = () => {
    turns = 0;
    setUp();
  };

  const updatePlayer = (player) => {
    currentPlayer = player;
    // change dialog on bottom
    const infoText = document.querySelector('.info-text')
    infoText.className = player.shape;
    infoText.classList.add('info-text');
    infoText.innerHTML = 'Player ' + player.id + ': ' + player.shape
  };

  const fillSquare = (sqr) => {
    // fill square logic
    if (sqr.filled === false) {
      const mark = document.createElement("p");
      mark.textContent = currentPlayer.shape;
      mark.classList.add(currentPlayer.shape);
      mark.classList.add("shape");
      sqr.element.appendChild(mark);
      sqr.filled = true;
      // add shape to grid array which will be used to check for win
      grid[sqr.row][sqr.col] = currentPlayer.shape;
      console.log(grid);
      turns += 1;
      updatePlayer(currentPlayer === p1 ? p2 : p1);
    }

    if (turns > 4) {
      checkForWin();
    }
  };

  const checkForWin = () => {
    if (
      (grid[0][0] == grid[0][1]) == grid[0][2] ||
      (grid[1][0] == grid[1][1]) == grid[1][2] ||
      (grid[2][0] == grid[2][1]) == grid[2][2] ||
      (grid[0][0] == grid[1][0]) == grid[2][0] ||
      (grid[0][1] == grid[1][1]) == grid[2][1] ||
      (grid[0][2] == grid[1][2]) == grid[2][2] ||
      (grid[0][0] == grid[1][1]) == grid[2][2] ||
      (grid[0][2] == grid[1][1]) == grid[2][0]
    ) {
      console.log("game over");
    } else if (turns == 9) {
      console.log("it's a tie");
    }
  };

  return { setUp, resetGame, fillSquare, checkForWin };
};

const Player = (id, shape) => {
  return { id, shape };
};

const resetBtn = document.querySelector(".reset");

resetBtn.addEventListener("click", () => board.resetGame());

const player1 = Player(1, "x");
const player2 = Player(2, "o");
const board = GameBoard(player1, player2);
