import { useState } from "react";
import GameBoard from "./components/GameBoard"
import Player from "./components/Player"
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./assets/winning-combinations";


const initialBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
];

function deriveActivePlayer(turns) {
  let currPlayer = 'X';
  if (turns.length > 0 && turns[0].player === 'X') {
    currPlayer = 'O';
  }
  return currPlayer;
}

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  // const [activePlayer, setActivePlayer] = useState('X');
  const activePlayer = deriveActivePlayer(gameTurns);

  let board = initialBoard;
  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;
    board[row][col] = player;
  }

  let winner;
  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = board[combination[0].row][combination[0].column]
    const secondSquareSymbol = board[combination[1].row][combination[1].column]
    const thirdSquareSymbol = board[combination[2].row][combination[2].column]

    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = firstSquareSymbol;
    }
  }

  function handleSelectSquare(rowIndex, colIndex) {
    // setActivePlayer((currActivePlayer) => currActivePlayer === 'X' ? 'O' : 'X')
    setGameTurns((prevTurns) => {
      const currentPlayer = deriveActivePlayer(prevTurns);
      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns
      ];
      return updatedTurns;
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName="Player 1"
            symbol="X"
            isActive={activePlayer === 'X'}
          />
          <Player
            initialName="Player 2"
            symbol="O"
            isActive={activePlayer === 'O'}
          />
        </ol>
        {winner && <p>You win, {winner}!</p>}
        <GameBoard
          onSelectSquare={handleSelectSquare}
          board={board}
        />

      </div>
      <Log turns={gameTurns} />
    </main>
  )
}

export default App
