import { useState } from "react";

const initialBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
];

const GameBoard = ({ onSelectSquare, activePlayerSymbol}) => {
    const [board, setBoard] = useState(initialBoard);
    function handleSelectSquare(rowIndex, colIndex) {
        setBoard((prevBoard) => {
            // copy array to update immutably
            const updatedBoard = [...prevBoard.map(innerArray => [...innerArray])];
            updatedBoard[rowIndex][colIndex] = activePlayerSymbol;
            return updatedBoard;
        });

        onSelectSquare();
    }
    return (
        <ol id="game-board">
            {board.map((row, rowIndex) => <li key={rowIndex}>
                <ol>
                    {row.map((playerSymbol, colIndex) => <li key={colIndex}>
                        <button onClick={() => handleSelectSquare(rowIndex, colIndex)}>{playerSymbol}</button>
                    </li>)}
                </ol>
            </li>)}
        </ol>

    )
}

export default GameBoard