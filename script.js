const GameBoard = (p1, p2) => {
  let turns = 0;
  let currentPlayer = p1;
  let gameOver = false;

  let grid = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
  ];

  const Square = (row, col) => {
    this.row = row;
    this.col = col;
    let element = document.createElement("div");
    let filled = false;

    return { row, col, element, filled };
  };

  const setUp = () => {
    updatePlayer(p1);
    const board = document.querySelector(".game-grid");
    board.innerHTML = "";
    let col = 0;
    let row = 0;
    grid = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
    ];
    gameOver = false;
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
    banner.innerHTML = '';
    banner.style.visibility = 'hidden';
    setUp();
  };

  const updatePlayer = (player) => {
    currentPlayer = player;
    const infoText = document.querySelector(".info-text");
    infoText.className = player.shape;
    infoText.classList.add("info-text");
    infoText.innerHTML =
      "Player " + player.id + ": " + player.shape.toUpperCase();
  };

  const fillSquare = (sqr) => {
    // fill square logic
    if (!sqr.filled && !gameOver) {
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
      if (turns > 4) {
        checkForWin();
      }
      if (!gameOver) {
        updatePlayer(currentPlayer === p1 ? p2 : p1);
      }
    }
  };

  const checkForWin = () => {
    if (
      (grid[0][0] == grid[0][1] && grid[0][1] == grid[0][2]) ||
      (grid[1][0] == grid[1][1] && grid[1][1] == grid[1][2]) ||
      (grid[2][0] == grid[2][1] && grid[2][1] == grid[2][2]) ||
      (grid[0][0] == grid[1][0] && grid[1][0] == grid[2][0]) ||
      (grid[0][1] == grid[1][1] && grid[1][1] == grid[2][1]) ||
      (grid[0][2] == grid[1][2] && grid[1][2] == grid[2][2]) ||
      (grid[0][0] == grid[1][1] && grid[1][1] == grid[2][2]) ||
      (grid[0][2] == grid[1][1] && grid[1][1] == grid[2][0])
    ) {
      gameOver = true;
      const text = document.createElement('h2')
      text.textContent = 'Winner: Player ' + currentPlayer.id
      banner.appendChild(text);
      banner.style.visibility = 'visible';
    } else if (turns == 9) {
      gameOver = true;
      const text = document.createElement('h2')
      text.textContent = "It's a tie!"
      banner.appendChild(text);
      banner.style.visibility = 'visible';
    }
  };

  return { setUp, resetGame, fillSquare, checkForWin };
};

const Player = (id, shape) => {
  return { id, shape };
};

const resetBtn = document.querySelector(".reset");
const banner = document.querySelector('.banner');

resetBtn.addEventListener("click", () => board.resetGame());

const player1 = Player(1, "x");
const player2 = Player(2, "o");
const board = GameBoard(player1, player2);

board.resetGame()
