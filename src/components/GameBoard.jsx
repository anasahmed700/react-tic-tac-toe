
const initialBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
];

const GameBoard = ({ onSelectSquare, turns }) => {
    let board = initialBoard;
    for (const turn of turns) {
        const { square, player } = turn;
        const { row, col } = square;
        board[row][col] = player;
    }

    // const [board, setBoard] = useState(initialBoard);
    // function handleSelectSquare(rowIndex, colIndex) {
    //     setBoard((prevBoard) => {
    //         // copy array to update immutably
    //         const updatedBoard = [...prevBoard.map(innerArray => [...innerArray])];
    //         updatedBoard[rowIndex][colIndex] = activePlayerSymbol;
    //         return updatedBoard;
    //     });

    //     onSelectSquare();
    // }
    return (
        <ol id="game-board">
            {board.map((row, rowIndex) => <li key={rowIndex}>
                <ol>
                    {row.map((playerSymbol, colIndex) => <li key={colIndex}>
                        <button
                            onClick={() => onSelectSquare(rowIndex, colIndex)}
                            disabled={playerSymbol !== null}
                        >{playerSymbol}</button>
                    </li>)}
                </ol>
            </li>)}
        </ol>

    )
}

export default GameBoard