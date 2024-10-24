import { useState } from "react";
import GameBoard from "./components/GameBoard"
import Player from "./components/Player"
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./assets/winning-combinations";
import GameOver from "./components/GameOver";


const PLAYERS = {
  X: "Player 1",
  O: "Player 2"
};

const INITIAL_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
];

/**
 * Function to derive the active player.
 * 
 * @param {Array} turns - Array of turns.
 * @returns {string} - The current active player.
 */
function deriveActivePlayer(turns) {
  let currPlayer = 'X';
  if (turns.length > 0 && turns[0].player === 'X') {
    currPlayer = 'O';
  }
  return currPlayer;
}

/**
 * Derives the game board based on the given game turns.
 * 
 * @param {Array} gameTurns - The array of game turns.
 * @returns {Array} - The derived game board.
 */
function deriveGameBoard(gameTurns) {
  // make a copy of initialBoard to avoid reference value when restarting the game
  let board = [...INITIAL_BOARD.map(array => [...array])];
  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;
    board[row][col] = player;
  }
  return board;
}

/**
 * Function to derive the winner of a game board in a JavaScript React application.
 *
 * @param {Array} board - The game board represented as a 2D array.
 * @param {Object} players - An object containing the players and their symbols.
 * @returns {string} - The winner of the game.
 */
function deriveWinner(board, players) {
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
      winner = players[firstSquareSymbol];
    }
  }
  return winner;
}

function App() {
  const [players, setPlayers] = useState(PLAYERS);
  const [gameTurns, setGameTurns] = useState([]);
  const activePlayer = deriveActivePlayer(gameTurns);
  const board = deriveGameBoard(gameTurns);
  const winner = deriveWinner(board, players);

  let hasDraw = gameTurns.length === 9 && !winner;
  function handleSelectSquare(rowIndex, colIndex) {
    setGameTurns((prevTurns) => {
      const currentPlayer = deriveActivePlayer(prevTurns);
      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns
      ];
      return updatedTurns;
    });
  }

  function handlePlayerNameChange(symbol, newName) {
    setPlayers(prevPlayers => {
      return {
        ...prevPlayers,
        [symbol]: newName
      }
    })
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName={PLAYERS.X}
            symbol="X"
            isActive={activePlayer === 'X'}
            onChangeName={handlePlayerNameChange}
          />
          <Player
            initialName={PLAYERS.O}
            symbol="O"
            isActive={activePlayer === 'O'}
            onChangeName={handlePlayerNameChange}
          />
        </ol>
        {(winner || hasDraw) &&
          <GameOver winner={winner} onRematch={() => setGameTurns([])} />}

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
