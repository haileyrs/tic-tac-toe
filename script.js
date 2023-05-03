const GameBoard = (p1, p2) => {

  let turns = 0
  let currentPlayer;

  const Square = () => {
    let element = document.createElement("div")
    let filled = false;

    return {element, filled}
  }

  const setUp = () => {
    currentPlayer = p1;
    const board = document.querySelector(".game-grid");
    board.innerHTML = ''
    for (i = 0; i < 9; i++) {
      const square = Square()
      square.element.classList.add("grid-square");
      square.element.addEventListener("click", () => fillSquare(square));
      board.appendChild(square.element);
    }
  };

  const resetGame = () => {
    turns = 0
    setUp()
  }

  const updatePlayer = (player) => {
    currentPlayer = player
    // change dialog on bottom
  }

  const fillSquare = (sqr) => {
    // fill square logic
    if (sqr.filled === false) {
      const mark = document.createElement('p')
      mark.textContent = currentPlayer.shape
      mark.classList.add(currentPlayer.shape)
      mark.classList.add('shape')
      sqr.element.appendChild(mark)
      sqr.filled = true
      turns += 1
      updatePlayer(currentPlayer === p1 ? p2 : p1)
    }
    
    if (turns > 3) {
      checkForWin()
    }  
  }

  const checkForWin = () => {

  }

  return {setUp, resetGame, fillSquare, checkForWin}
};

const Player = (id, shape) => {
  return {id, shape}
};


const resetBtn = document.querySelector(".reset");

resetBtn.addEventListener("click", () => board.resetGame());

const player1 = Player(1, 'x');
const player2 = Player(2, 'o');
const board = GameBoard(player1, player2);
